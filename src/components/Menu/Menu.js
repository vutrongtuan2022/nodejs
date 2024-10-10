import React, { useState } from 'react'
import List from '../List/List'

export default function Menu({items}) {
    const [activeId,setActiveId]=useState(null)
  return (
    <div>
        <List data={items}>
            <li key={items.id} style={{color:activeId===items?"red":'#333',cursor:'pointer',padding:'10px',listStyleType:"none",backgroundColor:activeId===items?"#f0f0f0" : "white"}} onClick={()=>setActiveId(items.id)}>
                {items.name}
            </li>
        </List>
    </div>
  )
}
