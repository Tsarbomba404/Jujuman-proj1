import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div>
      <h2>Error 404</h2>
      <p>You have tried to access an invalid route</p>
      <Link to={"/"}>
        <button>Go home</button>

        
      </Link>
    </div>
  );
};

export default Error404;
