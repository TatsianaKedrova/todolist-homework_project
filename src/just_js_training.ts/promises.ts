//promises
//1
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
// async function trainDelay() {
//   console.log("1. Requesting local data...");
//   await delay(3000);

//   console.log("2. Data successfully loaded!");
// }

//2
export const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isSuccessful = Math.random() > 0.3;
      if (isSuccessful) {
        resolve({ id: 101, username: "JavaScriptLearner" });
      } else {
        reject("Error 500: Internal Local Server Crash!");
      }
    }, 4000);
  });
};

export async function runPromise() {
  try {
    const user = await promise2();
    console.log("Success! User found: ", user);
  } catch (error) {
    console.error("Caught expected error:", error);
  }
}

export const originalPromise = Promise.reject("Database connection error");
export const caughtPromise = originalPromise.catch((error) => {
  console.log("⚠️ Caught the error safely:", error);
  return "Fallback data";
});

export const staticPromise = () =>
  new Promise((resolve, reject) => {
    resolve("First resolve");
    reject("THis will be rejected");
    resolve("Second resolve");
  });

export const dynamicPromise = (id: number) => {
  return new Promise((resolve, reject) => {
    // Simulate a brief local processing delay
    setTimeout(() => {
      if (id > 0) {
        resolve({
          status: 200,
          message: `Data for item #${id} loaded successfully!`,
        });
      } else {
        reject(new Error(`Invalid ID: ${id}. ID must be greater than 0.`));
      }
    }, 1000);
  });
};
console.log("1. Synchronous First");

setTimeout(() => console.log("setTimeout 1"), 0);

Promise.resolve().then(() =>
  setTimeout(() => console.log(" Microtask Promise 1"), 0),
);

console.log("2. Synchronous Second");
Promise.resolve().then(() => console.log("Micretask Promise 2"));

async function runScheduleTest() {
  // This behaves exactly like your original nested code block
  await Promise.resolve();

  // Everything below this line is now running INSIDE a Microtask!
  setTimeout(() => console.log("Microtask promise 3"), 0);
}

// 1. Start the async function
runScheduleTest();

// 2. Set up the standalone macrotask timer
setTimeout(() => console.log("setTimeout 2"), 0);
async function process() {
  console.log("2. Inside async function - starting wait");
  await Promise.resolve(); // Pauses here and yields control back to main thread
  console.log("4. Inside async function - resumed!");
}

console.log("1. Script Start");
process();
console.log("3. Script End");
async function getAnswer() {
  return 42; // Looks synchronous
}
console.log(getAnswer());
