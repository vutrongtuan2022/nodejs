import React, { forwardRef } from "react";

const Input = forwardRef(({ label, ...inputProps }, ref) => {
  return (
    <div>
      <label>{label}</label>
      <input ref={ref} {...inputProps} />
    </div>
  );
});

export default Input;
