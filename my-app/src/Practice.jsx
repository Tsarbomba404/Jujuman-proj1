import React, { useState, useEffect } from "react";

const Practice = () => {
  const [inputValue, setInputValue] = useState("");
  const animals = [
    "Lion",
    "Elephant",
    "Giraffe",
    "Penguin",
    "Kangaroo",
    "Panda",
    "Dolphin",
    "Zebra",
    "Tiger",
    "Koala",
  ];

  const [animalia, setAnimalia] = useState(animals);

  // CRUD

  // CREATE ✔
  // READ ✔
  // UPDATE
  // DELETE

  // Function TO HANDLE CREATE IN CRUD
  const addAnimal = () => {
    const newAnimal = [inputValue, ...animalia];
    setAnimalia(
      sortAnimalia(newAnimal.map((a) => a.toLowerCase())).map((m) => {
        const first = m.charAt(0).toUpperCase();
        const rest = m.slice(1);
        return first + rest;
      })
    );
    setInputValue("");
  };

  const updateAnimalsAtAnyGivenIndex = (idx, val) => {
    const newValue = prompt(val);

    const updated = animalia.map((a, i) => {
      if (i === idx) {
        return newValue;
      }
      return a;
    });
    setAnimalia(updated);
  };
  const deleteHandler = (idx) => {
    const filteredRes = animalia.filter((a, i) => i !== idx);
    setAnimalia(filteredRes);
  };
  const sortAnimalia = (animal) => {
    const sorted = animal.sort();
    return sorted;
  };

  const handleInputChange = (event) => {
    const val = event.target.value;
    setInputValue(val); // Update state with the current value of the input
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search animals..."
      />
      <button onClick={addAnimal}>Add</button>
      <br />
      <ul>
        {animalia.map((result, i) => (
          <div
            style={{ display: "flex", alignItems: "center", gap: 16 }}
            key={result + i}
          >
            <div>{i + 1}</div>
            <div onClick={() => updateAnimalsAtAnyGivenIndex(i, result)}>
              <p>{result}</p>
            </div>
            <div onClick={() => deleteHandler(i)}>
              <p
                style={{
                  color: "red",
                  cursor: "pointer",
                  height: "18px",
                  width: "15px",
                  border: "solid black",
                  textAlign: "center",
                }}
              >
                X
              </p>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Practice;



