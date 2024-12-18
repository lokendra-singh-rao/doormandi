import React, { useState } from "react";

function page() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({
    id: "",
    task: "",
    status: "",
  });

  const handleSubmit = (e) => {
    setTask({...task, id: new Date()});
    
    setTasks([...tasks, task]);
    setTask({ id: "", task: "", status: "" });
  };

  return <div></div>;
}

export default page;
