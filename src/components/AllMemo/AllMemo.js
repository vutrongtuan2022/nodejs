import React, { memo } from "react";

function AllMemo({onIncrease}) {
  console.log("re-render");

  return (
    <>
      <h2>AllMemo </h2>
      <button onClick={onIncrease}>Run</button>
    </>
  );
}

export default memo(AllMemo);
