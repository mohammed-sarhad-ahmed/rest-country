import React from "react";

function Button({ children, className, mode, action }) {
  return (
    <button
      className={`btn ${
        mode === "dark" ? "dark-mode-el-bg" : "white-bg"
      } ${className}   
`}
      onClick={action}
    >
      {children}
    </button>
  );
}

export default Button;
