import { enqueue as enqueueToQueue } from '../utils/queue.js';

// Service function to send an email
const sendEmail = async (email, message) => {
  const data = { type: 'email', payload: { email, message } };
  enqueueToQueue(data);
};

// Service function to send an SMS
const sendSMS = async (telephone, message) => {
  const data = { type: 'sms', payload: { telephone, message } };
  enqueueToQueue(data);
};

export default {
  sendEmail,
  sendSMS,
};
