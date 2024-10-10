import React, { useReducer, useState } from "react";
//KHI SỬ DỤNG USEREDUCER (useReducer(<reducer>, <initialState>)) CẦN CÓ

//1 TẠO INIT STATE
const initState = 0;

//2 TẠO ACTION
const UP_ACTION = "up";
const DOWN_ACTION = "down";

//3 TẠO REDUCER
const reducer = (state, action) => {
  switch (action) {
    case UP_ACTION:
      return state + 1;
    case DOWN_ACTION:
      return state - 1;
  default:throw new Error()
    }
};

function ReducerHook() {
  const [redu, dispatch] = useReducer(reducer,initState);
  return (
    <div>
      <h1>{redu}</h1>
      <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
      <button onClick={() => dispatch(UP_ACTION)}>Uppd</button>
    </div>
  );
}

export default ReducerHook;