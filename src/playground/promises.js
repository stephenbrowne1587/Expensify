const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Andrew's resolved data");
    // reject("error something didnt''fdahs")
  }, 3000);
});

console.log("before");

promise.then((data) => {
  console.log("1", data);

  return new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Andrew's resolved promise");
  }, 3000);
});
}).then((data) => {
  console.log("does this run", data);
}).catch((error) => {
  console.log("error: ", error)
});

console.log("after");