import React, { useEffect } from "react";
import { getAllTodos } from "../api/todoApi";

function Home() {
  useEffect();
  return (
    <div>
      Here's all your things to do, {JSON.parse(localStorage.getItem('token')).userId}
      
    </div>
  );
}

export default Home;
