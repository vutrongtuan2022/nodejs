import React, { useEffect, useState } from "react";
import List from "../List/List";
import Button from "../Button/Button";

const tabs = ["posts", "comments", "albums"];
function EffectDom() {
  const [type, setType] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      });
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShowGoTop(true);
        console.log("set state");
      } else {
        setShowGoTop(false);
      }

      //   setShowGoTop(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  console.log("showGoTop");

  return (
    <div>
      {tabs.map((tab) => (
        <Button key={tab} onClick={() => setType(tab)}>
          {tab}
        </Button>
      ))}

      {tabs.map((tab) => (
        <button key={tab} onClick={() => setType(tab)}>
          {tab}
        </button>
      ))}

      <List data={posts}>{(post) => <li key={post.id}>{post.title}</li>}</List>

      {showGoTop && (
        <button
          style={{ position: "fixed", right: 20, bottom: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          go to top
        </button>
      )}
    </div>
  );
}

export default EffectDom;
