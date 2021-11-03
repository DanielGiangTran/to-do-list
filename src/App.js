import React, { useState } from "react";
import data from "./data.json";
import trash from "./trash.svg";

const ListItem = ({ list, deleteTask, markComplete }) => (
  <div key={list.id} className="list-item row jc-space-between">
    <span
      className={list.complete ? "task-complete" : ""}
      onClick={() => {
        markComplete(list.id);
      }}
    >
      {list.task}
    </span>
    <img
      onClick={() => {
        deleteTask(list.id);
      }}
      className="delete-icon"
      src={trash}
      alt="delete-task"
    />
  </div>
);

function App() {
  const [task, setTask] = useState("");
  const [toDoList, setToDoList] = useState(data);

  const addNote = () => {
    setToDoList([
      ...toDoList,
      {
        id: toDoList.length === 0 ? 1 : toDoList[toDoList.length - 1].id + 1,
        task: task,
        complete: false,
      },
    ]);
    setTask("");
  };

  const deleteTask = (id) => {
    const newList = toDoList.filter((item) => {
      return item.id !== id;
    });

    setToDoList(newList);
  };

  const markComplete = (index) => {
    const list = [...toDoList];
    list[index - 1].complete = !list[index - 1].complete;
    setToDoList(list);
  };

  const inputKeyDown = (e) => {
    if (e.keyCode === 13) addNote();
  };

  return (
    <div className="app-background">
      <p className="heading-text">React To Do List 📝</p>
      <div className="task-container">
        <div>
          <input
            onKeyDown={(e) => {
              inputKeyDown(e);
            }}
            onChange={(e) => {
              setTask(e.target.value);
            }}
            value={task}
            type="text"
            className="text-input"
          ></input>
          <button
            className="add-button"
            onClick={() => {
              addNote(task);
            }}
          >
            ADD
          </button>
          <button
            className="add-button"
            onClick={() => {
              setTask("");
            }}
          >
            CLEAR
          </button>
        </div>
        {toDoList.length < 1 ? (
          <p className="no-item-text">📌 The list is empty!</p>
        ) : (
          toDoList.map((item) => (
            <ListItem
              markComplete={markComplete}
              list={item}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
      <p className="footer-text">Daniel's practical 1</p>
    </div>
  );
}

export default App;
