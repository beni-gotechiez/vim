import axios from "axios";
import { initialize as initializeQueue } from "../utils/queue.js";
import { sleep } from "../utils/index.js";
import preferences from "../config/preferences.js";

const NOTIFICATION_SERVICE_URL =
  process.env.NOTIFICATION_SERVICE_URL || "http://localhost:5001";
const MAX_ATTEMPTS = process.env.MAX_ATTEMPTS || 5;
const BASE_DELAY = process.env.BASE_DELAY || 1000;

function calculateDelay(attempt, retryAfterHeader) {
  if (retryAfterHeader) {
    return parseInt(retryAfterHeader, 10) * 1000;
  }
  return BASE_DELAY * Math.pow(2, attempt - 1);
}

let delay = 0;
async function sendNotification(url, data, attempt = 1) {
  try {
    const response = await axios.post(url, data);
    console.log("Notification sent successfully");
    await sleep(delay);
  } catch (error) {
    if (attempt >= MAX_ATTEMPTS) {
      console.error(`Max retry attempts reached for data:`, { url, data });
      throw new Error("Rate limit exceeded after max attempts");
    }

    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      delay = calculateDelay(attempt, retryAfter);
      console.warn(`Rate limit hit. Retrying in ${delay} ms`, { attempt, url });
    } else {
      console.error(`Error sending notification: ${error.message}`, {
        attempt,
        url,
        data,
      });
    }
    await sleep(delay);
    await sendNotification(url, data, attempt + 1);
  }
}

// Initialize separate processors for email and SMS queues
initializeQueue(async (data) => {
  await sendNotification(preferences[data.type].endpoint, data.payload);
});

export default {};
