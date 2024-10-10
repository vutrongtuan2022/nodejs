//Two-way binding 
import React, { useState } from 'react'
import Input from '../Input/Input'
import { Button } from '../Button/Button'

export default function TwoWayBinding() {
    const [email,setEmail]=useState('')
    const handleSubmit=()=>{
console.log(email);

    }
  return (
    <div>
        <Input
        value={email}
        onChange={e=>setEmail(e.target.value)}
        />
        <Button onClick={handleSubmit}>Change</Button>
    </div>
  )
}
