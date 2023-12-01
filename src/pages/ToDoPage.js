import React, { useState, useEffect } from "react";
import { Card } from "../components/card/Card";
import { Form } from "../components/form/Form";
import { AskAi } from "../components/form/AskAi";
import Form1 from "../components/form/Form1";

export const ToDoPage = () => {
  const [todo, setTodo] = useState([]);
  const [addTodo, setAddTodo] = useState("");
  const [askQuestion, setQuestion] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    fetch('/api')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setTodo(data));
  }, []);

  const handleFormChange = (inputValue) => {
    setAddTodo(inputValue);
    console.log(inputValue);
  };

  const handleAskFormChange = (inputQuestion) => {
    setQuestion(inputQuestion);
    console.log(inputQuestion);
  };

  const handleFormSubmit = () => {
    fetch('api/create', {
      method: 'POST',
      body: JSON.stringify({
        content: addTodo,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((message) => {
        console.log(message);
      });
  };

  const handleAskSubmit = () => {
    fetch('api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain', // Specify content type as plain text
      },
      body: askQuestion, // Send the inputString directly
    })
      .then((response) => response.text())
      .then((data) => {
        setResponseMessage(data);
        console.log(typeof data);
        console.log(data);
      })
      .catch((error) => console.error('Error:', error));
  };

  return (
    <>
      <Form userInput={addTodo} onFormChange={handleFormChange} onFormSubmit={handleFormSubmit} formType="Add Todo" />
      {/* <Form1 /> */}
      <AskAi userInput={askQuestion} onFormChange={handleAskFormChange} onFormSubmit={handleAskSubmit} formType="Ask Questions" />
      {responseMessage && (
        <div className="response-container">
          <p>Response: {responseMessage}</p>
        </div>
      )}
      <Card listOfTodos={todo} />
    </>
  );
};
