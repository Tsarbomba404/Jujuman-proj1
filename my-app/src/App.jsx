import React from "react";
import Home from "./Home";
import About from "./About";
import Error404 from "./Error404";
import { Route, Routes } from "react-router-dom";
import Todo2 from "./Todo2";
import Todo from "./Todo";
import Library from "./Library/Library";
import Done from "./DoneWork/Done";
import Shoe from "./ShoeWorld/Shoe";
import Food from "./FoodWorld/Food";
import Netflix from "./NetflixWork/Netflix";
import Test from "./Test/Test";
import Mainpage from "./NetflixWork/Mainpage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="todo" element={<Todo />}>
        <Route path="two" element={<Todo2 />} />
      </Route>
      <Route path="library" element={<Library />} />
      <Route path="done" element={<Done />} />
      <Route path="Shoe" element={<Shoe />} />
      <Route path="food" element={<Food />} />
      <Route path="netflix" element={<Netflix />} />

      <Route path="mainpage" element={<Mainpage />} />
      <Route path="test" element={<Test />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
}

export default App;
