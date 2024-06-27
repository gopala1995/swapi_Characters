import React from "react";
import Characters from "./Components/Characters/Characters";

const Home = () => {
  return (
    <div className="page-wrapper _container">
      <div className="header">
        <h1>Star warS</h1>
        <h2>characters</h2>
      </div>
      <Characters />
    </div>
  );
};

export default Home;
