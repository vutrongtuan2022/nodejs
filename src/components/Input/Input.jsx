import React from 'react'

export default function Input({label,...inputProps}) {
  return (
    <div>
        <label>{label}</label>
        <input {...inputProps}/>
    </div>
  )
}
