// AskAi.js
import React from "react";

export const AskAi = ({ userInput, onFormChange, onFormSubmit, formType }) => {
  const handleChange = (event) => {
    onFormChange(event.target.value);
  };

  const handleSubmit = (onSubmit) => {
    onFormSubmit();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          {formType}:
            <input type='text' required value={userInput} onChange={handleChange}></input>
        </label>
        <input type="submit"></input>
      </form>
    </>
  );
};
