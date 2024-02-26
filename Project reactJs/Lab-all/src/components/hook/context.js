import React, { createContext } from "react";

const myContext = React.createContext();
function MyContext() {
  const myValue = "vanh vanh";
  return (
    <div>
      <MyContext>{myValue}</MyContext>
    </div>
  );
}

export default MyContext;
