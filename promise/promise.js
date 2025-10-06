console.log("Program Started");

const promise = new Promise((resolve, reject) => {
  
  setTimeout(promise,1000);
  if (success) {
    resolve("Operation ....");
  } else {
    reject("Program complete!");
  }
});
clearTimeout(3000)


promise.then(result => console.log(result)).catch(error => console.error(error))
  .finally(() => console.log("Promise settled."));
