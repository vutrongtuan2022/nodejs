import React from "react";
import styles from './Button.module.css'
export default function Button ({ href, onClick, children }) {
  let Component = "button";
  const props = {};
 
  if (href){
    Component = "a"
    props.href=href
  } 

  if (onClick){
    props.onClick=onClick
  } 
  
  return <Component {...props}>
    <div className={styles.Color}>{children}</div></Component>;
};
