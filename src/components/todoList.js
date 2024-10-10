import React, { useState } from "react";
import styles from "../App.css";
import Input from "./Input/Input";
import Button from "./Button/Button";
import List from "./List/List";
export default function TodoList() {
  const storageJobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const [job, setJob] = useState("");
  const [works, setWorks] = useState(storageJobs ?? []);
  // const [isEditing, setIsEditing] = useState(false);// Trạng thái để biết đang chỉnh sửa
  // const [editIndex, setEditIndex] = useState(null);  // Chỉ số của công việc đang chỉnh sửa
  const handleChange = () => {
    setWorks((prev) => {
      const newJobs = [...prev, job];
      const jsonJob = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJob);
      return newJobs;
    });
    setJob("");
  };

  const handleDelete = (index) => {
    setWorks((prev) => {
      const updatedJobs = prev.filter((_, i) => i !== index);
      localStorage.setItem("jobs", JSON.stringify(updatedJobs)); // Cập nhật lại localStorage sau khi xóa
      return updatedJobs;
    });
  };

  return (
    <div className={styles.App}>
      <div className={styles.App_flex}>
        <Input
          type="input"
          value={job}
          onChange={(e) => setJob(e.target.value)}
        />
        <Button onClick={handleChange}>Add</Button>
      </div>

      <List data={works}>
        {(work, index) => (
          <li key={index}>
            {work}
            <Button onClick={() => handleDelete(index)}>Delete</Button>
          </li>
        )}
      </List>
    </div>
  );
}
