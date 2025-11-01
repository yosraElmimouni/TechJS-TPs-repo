console.log("Programme started ...");

const promise = new Promise((resolve,reject) => {
    setTimeout(()=>{resolve("step 1 complete.");},3000)
    
});
promise = new Promise((resolve,reject) => {
    setTimeout(()=>{resolve("step 2 complete.");},3000)
});
promise.then(result => console.log(result)).catch(error => console.error(error));