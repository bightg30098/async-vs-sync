import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [list1, setList1] = useState([]);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    async function demo() {
      const _list = [];

      const fakePromise = (i) => {
        return new Promise((resolve) =>
          setTimeout(() => resolve(i), Math.random() * 1000)
        );
      };

      Array(5).forEach((_, i) => {
        fakePromise().then(() => {
          _list.push(i);
        });
      });

      /*
      If you run this code, you will see that the list is empty. This is because the forEach loop is synchronous and the promise is asynchronous. The forEach loop will finish before the promise is resolved.
    */

      console.log(_list);
      setList(_list);
      // []

      /*
      In order to fix this, we can use the async/await syntax. This will allow us to wait for the promise to resolve before moving on to the next iteration of the loop.
    */

      // method 1
      // use synchronous for loop to resolve promise sequentially

      const _list1 = [];
      let i = 0;
      for (const _ of Array(5)) {
        await fakePromise();
        _list1.push(i++);
      }

      console.log("resolve promise sequentially");
      console.log(_list1);
      setList1(_list1);
      // [0, 1, 2, 3, 4]

      // method 2
      // use Promise.all to resolve promise in parallel at once

      let _list2 = [];
      const promises = Array.from({ length: 5 }, (_, i) => fakePromise(i));
      _list2 = await Promise.all(promises);

      console.log("resolve promise in parallel");
      console.log(_list2);
      setList2(_list2);
      // [0, 1, 2, 3, 4]
    }

    demo();
  }, []);

  return (
    <div className="App">
      <p>Promise not resolved: {list.join(", ")}</p>
      <p>
        use synchronous for loop to resolve promise sequentially :{" "}
        {list1.join(", ")}
      </p>
      <p>
        use Promise.all to resolve promise in parallel at once:{" "}
        {list2.join(", ")}
      </p>
    </div>
  );
}

export default App;
