// Arrow Function
let add = (a, b) => a + b;
console.log("Add:", add(5, 3));

// Callback
function greet(name, callback) {
  callback("Hello " + name);
}
greet("Avinash", msg => console.log(msg));

// Promise
let p = new Promise(resolve => resolve("Promise Resolved"));
p.then(result => console.log(result));

// Async / Await
async function sayHi() {
  return "Hi from async";
}
async function run() {
  let msg = await sayHi();
  console.log(msg);
}
run();