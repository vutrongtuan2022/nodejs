import React, { useReducer, useRef } from "react";
import Input from "../Input/Input";
import Button from "../Button/Button";
import List from "../List/List";

// Khởi tạo state ban đầu
const initState = { job: "", listJobs: [] };

// Khai báo action types
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

// Action creators
const setJob = (payload) => ({
  type: SET_JOB,
  payload,
});

const addJob = (payload) => ({
  type: ADD_JOB,
  payload,
});

const deleteJob = (payload) => ({
  type: DELETE_JOB,
  payload,
});

// Hàm reducer
const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        listJobs: [...state.listJobs, action.payload],
      };
    case DELETE_JOB:
      const newListJobs = [...state.listJobs];
      newListJobs.splice(action.payload, 1); // Xóa công việc ở index chỉ định
      return {
        ...state,
        listJobs: newListJobs,
      };
    default:
      throw new Error("Invalid Action!");
  }
};

function TodoAppReducerHook() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, listJobs } = state;
  const inputRef = useRef();

  const handleSubmit = () => {
    if (job) {
      dispatch(addJob(job));
      dispatch(setJob(""));
      inputRef.current.focus();
    }
  };

  const handleDelete = (index) => {
    dispatch(deleteJob(index)); // Xóa công việc dựa trên index
  };

  return (
    <div>
      <h3>TodoAppReducerHook</h3>
      <input
        ref={inputRef}
        placeholder="...nhập việc cần làm..."
        value={job}
        onChange={(e) => dispatch(setJob(e.target.value))}
      />
      <Button onClick={handleSubmit}>Thêm</Button>
      <List data={listJobs}>
        {(job, index) => (
          <li key={index} style={{ padding: "12px 24px" }}>
            {job}{" "}
            <span
              onClick={() => handleDelete(index)} // Truyền index để xóa công việc
              style={{
                background: "red",
                padding: "8px 12px",
                cursor: "pointer",
              }}
            >
              delete
            </span>
          </li>
        )}
      </List>
    </div>
  );
}

export default TodoAppReducerHook;
