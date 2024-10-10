//useEffect với các phần phụ thuộc
import React, { useEffect, useState } from "react";
import List from "../List/List";
import Button from "../Button/Button";
const task = ["posts", "comments", "albums"];
function EffectWithDependencies() {
  const [posts, setPosts] = useState([]);
  const [type, setType] = useState("posts");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`).then((res) =>
      res.json().then((post) => {
        setPosts(post);
      })
    );
  }, [type]);

  return (
    <div>
      {/* <List data={task}>{(tab) => <button key={tab} onClick={()=>setType(tab)}>{tab}</button>}</List> */}

      {task.map((tab) => (
        <Button key={tab} onClick={() => setType(tab)}>
          {tab}
        </Button>
      ))}

      <List data={posts}>
        {(post) => (
          <li key={post.id}>
            {post.title}
            {type === "comments" && <> {post.email}</>}
          </li>
        )}
      </List>
    </div>
  );
}

export default EffectWithDependencies;
