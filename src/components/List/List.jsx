import React from "react";

export default function List({ data=[], children }) {
    
  return <ul>{data.map((item,index)=>children(item,index))}</ul>;
  
  
}
