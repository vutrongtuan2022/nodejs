import axios from "axios";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const fetchApi = async () => {
    const { data: ListQuery } = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );

    return ListQuery;
  };

  const {
    data: ListQuery,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchApi,
  });
  if (isLoading) {
    return <h1>...Loading...</h1>;
  }
  if (isError) {
    return <h1>...Error...</h1>;
  }

  return (
    <div>
      App
      {ListQuery?.map((post) => {
        return (
          <div key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
        );
      })}
    </div>
  );
}
