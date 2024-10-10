import React, { useEffect, useState } from "react";
import List from "../List/List";
const lesson = [
  { id: 1, name: "Hôm nay có gì" },
  { id: 2, name: "Không có gì" },
  { id: 3, name: "OK" },
];

function FakeChatApp() {
  const [lessonId, setLessonId] = useState(1);

useEffect(()=>{
    const handleComment=({detail})=>{
        console.log(detail);
        
    }
    window.addEventListener(`lesson-${lessonId}`,handleComment)
return ()=>{
    window.removeEventListener(`lesson-${lessonId}`,handleComment)

}
},[lessonId])
  return (
    <div>
      <List data={lesson}>
        {(listLesson) => (
          <li
            key={listLesson.id}
            style={{ color: lessonId === listLesson.id ? "red" : "#333",cursor:'pointer',listStyleType:"none",backgroundColor:lessonId===lesson?"#f0f0f0" : "white" }}
            onClick={() => setLessonId(listLesson.id)}
          >
            {listLesson.name}
          </li>
        )}
      </List>
      {/* <Menu items={lesson}/> */}
    </div>
  );
}

export default FakeChatApp;
