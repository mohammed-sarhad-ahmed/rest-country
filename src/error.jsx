import React from "react";

function Error({ error, mode }) {
  return (
    <div className={`error ${mode === "dark" ? ".white" : "light-text"}`}>
      {error}
    </div>
  );
}

export default Error;
