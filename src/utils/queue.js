const queue = {
  items: [],
  isProcessing: false,
  processor: null,
};

// Initialize the queue
function initialize(processor) {
  queue.processor = processor;
  console.log("Queue initialized.");
}

// Add an item to the queue
function enqueue(item) {
  console.log(`Enqueued item: ${JSON.stringify(item)}`);
  queue.items.push(item);
  processQueue();
}

// Acknowledge (ack) a message and remove it from the queue
function ack(item) {
  const index = queue.items.indexOf(item);
  if (index > -1) {
    queue.items.splice(index, 1);
    console.log(`Acknowledged item: ${JSON.stringify(item)}`);
  }
}

// Move an item to the back of the queue
function moveToBack() {
  queue.items.push(queue.items.shift());
}

// Process the queue
async function processQueue() {
  if (queue.isProcessing) return;

  console.log("Starting queue processing...");
  queue.isProcessing = true;

  while (queue.items.length > 0) {
    const item = queue.items[0];
    try {
      console.log(`Processing item: ${JSON.stringify(item)}`);
      await queue.processor(item);
      ack(item);
    } catch (error) {
      console.error(
        `Error processing item: ${
          error.message
        }, moving to the back of the queue: ${JSON.stringify(item)}`
      );
      moveToBack();
    }
  }

  console.log("Queue processing complete.");
  queue.isProcessing = false;
}

export { initialize, enqueue };
