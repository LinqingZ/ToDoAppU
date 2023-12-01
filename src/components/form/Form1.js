import React, { useState } from "react";
import axios from 'axios';

const Form1 = () => {
    const [task, setTask] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [dueTime, setDueTime] = useState("");

    const handleTaskChange = (event) => {
        setTask(event.target.value);
    };

    const handleDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleTimeChange = (event) => {
        setDueTime(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('api/todos', {
                task,
                dueDate,
                dueTime,
            });
            console.log("Task added:", response.data);
            setTask("");
            setDueDate("");
            setDueTime("");
        } catch(error) {
            console.error('Error adding task:', error);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Add a todo"
                value={task}
                onChange={handleTaskChange}
            />
            <input
                type="date"
                value={dueDate}
                onChange={handleDateChange}
            />
            <input
                type="time"
                value={dueTime}
                onChange={handleTimeChange}
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default Form1;
