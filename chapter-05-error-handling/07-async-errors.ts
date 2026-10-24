// Chapter 5.7 - Errors in asynchronous code
// Run: npx tsx chapter-05-error-handling/07-async-errors.ts
//
// Real-world picture: ordering food online. The order may arrive later, or the
// restaurant may cancel it later. You need a plan for both outcomes.

function fetchOrderStatus(orderId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (orderId === 404) reject(new Error(`Order ${orderId} not found`));
      else resolve(`Order ${orderId}: out for delivery`);
    }, 50);
  });
}

// Style 1: async/await with try/catch (reads top to bottom)
async function checkOrder(orderId: number): Promise<void> {
  try {
    const status = await fetchOrderStatus(orderId);
    console.log("await:", status);
  } catch (error) {
    console.log("await caught:", (error as Error).message);
  }
}

// Style 2: .then / .catch chains
function checkOrderWithThen(orderId: number): Promise<void> {
  return fetchOrderStatus(orderId)
    .then((status) => console.log("then:", status))
    .catch((error: Error) => console.log("catch():", error.message));
}

// Several requests: allSettled reports each success and failure separately.
async function checkMany(ids: number[]): Promise<void> {
  const results = await Promise.allSettled(ids.map(fetchOrderStatus));
  results.forEach((r, i) => {
    if (r.status === "fulfilled") console.log(`  #${ids[i]} ok -> ${r.value}`);
    else console.log(`  #${ids[i]} failed -> ${(r.reason as Error).message}`);
  });
}

await checkOrder(7);
await checkOrder(404);
await checkOrderWithThen(404);
console.log("allSettled:");
await checkMany([1, 404, 3]);
