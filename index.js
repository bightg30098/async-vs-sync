(async () => {
  const list = [];

  const fakePromise = (i) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve(i), Math.random() * 1000)
    );
  };

  Array(5).forEach((_, i) => {
    fakePromise().then(() => {
      list.push(i);
    });
  });

  /*
    If you run this code, you will see that the list is empty. This is because the forEach loop is synchronous and the promise is asynchronous. The forEach loop will finish before the promise is resolved.
  */

  console.log(list);
  // []

  /*
    In order to fix this, we can use the async/await syntax. This will allow us to wait for the promise to resolve before moving on to the next iteration of the loop.
  */

  // method 1
  // use synchronous for loop to resolve promise sequentially

  const list1 = [];
  let i = 0;
  for (const _ of Array(5)) {
    await fakePromise();
    list1.push(i++);
  }

  console.log("resolve promise sequentially");
  console.log(list1);
  // [0, 1, 2, 3, 4]

  // method 2
  // use Promise.all to resolve promise in parallel at once

  let list2 = [];
  const promises = Array.from({ length: 5 }, (_, i) => fakePromise(i));
  list2 = await Promise.all(promises);

  console.log("resolve promise in parallel");
  console.log(list2);
  // [0, 1, 2, 3, 4]
})();
