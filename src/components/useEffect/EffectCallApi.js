import React, { useState, useEffect } from "react";
import List from "../List/List";

export default function EffectCallApi() {
  const [data, setData] = useState([]);
  // const [title, setTitle] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Phản hồi của mạng không ổn");
        }
        return response.json();
      })

      .then((data) => {
        setData(data); //Lưu dữ liệu vào state
      })

      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []); // Chỉ chạy khi component mount

  return (
    <div>
      <List data={data}>{(post) => <li key={post.id}>{post.title}</li>}</List>
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import List from "../List/List";
// // "https://jsonplaceholder.typicode.com/posts"
// export default function EffectCallApi() {
//   const [data, setData] = useState([]);
//   const [title, setTitle] = useState("");

  // useEffect(()=>{
  //   fetch(`https://jsonplaceholder.typicode.com/posts`)
  //   .then(res=>res.json()
  //   .then(post=>{
  //     setData(post);
  //   })
  // )
  // })

//   return (
//     <div>
//       <List data={data}>{(post) => <li key={post.id}>{post.title}</li>}</List>
//     </div>
//   );
// }
