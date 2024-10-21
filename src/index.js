import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MountedUnmounted from "./components/MountedUnmounted";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
function fakeComment(id) {
  setInterval(() => {
    window.dispatchEvent(
      new CustomEvent(`lesson-${id}`, {
        detail: `Nội dung comment của lesson${id}`,
      })
    );
  }, 2000);
}
fakeComment(1);
fakeComment(2);
fakeComment(3);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>

    {/* <MountedUnmounted /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
