import React from "react";
import "./Card.css";
// export const Card = ({listOfTodos}) => {
//     return (
//         <>
//             {listOfTodos && listOfTodos.map(todo => {
//                 return (
//                     <ul key={todo.id}>
//                         <li>{todo.content}</li>
//                     </ul>
//                 );
//             })}
//         </>
//     );
// };

export const Card = ({ listOfTodos }) => {
    return (
      <div className="card-container">
        {listOfTodos &&
          listOfTodos.map((todo) => (
            <ul key={todo.id}>
              <li>{todo.content}</li>
            </ul>
          ))}
      </div>
    );
  };