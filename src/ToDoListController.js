import { useState, useEffect } from "react";
import { Subject } from "rxjs";

const todoListModelFactory = (todos) => {
  return {
    todos: todos
  };
};

function addTodoBehavior(title) {
  const todo = { title };
  return (prevState) => {
    let nextState = { todos: [...prevState.todos, todo] };
    return nextState;
  };
}

function handler(maps, f) {
  let r = maps
    .map((i) =>
      i.behaviors.map((bb) => {
        return { s: i.setter, st: i.st, b: bb };
      })
    )
    .reduce((p, n) => p.concat(n), [])
    .map((i) => i.b.name);
  //.filter((i) => i.b.name === f.name);
  console.log(r);
  console.log(f.name);
  maps
    .map((i) =>
      i.behaviors.map((bb) => {
        return { s: i.setter, st: i.st, b: bb };
      })
    )
    .reduce((p, n) => p.concat(n), [])
    .filter((i) => i.b.name === f.name)
    .map((i) => i.s(f(i.st)));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ConterService() {
  const state = todoListModelFactory([
    { title: "ReactJs" },
    { title: "Angular" }
  ]);

  const [todosState, setTodosState] = useState(state);
  const [inputState, setInputState] = useState("");

  const maps = [
    { setter: setTodosState, st: todosState, behaviors: [addTodoBehavior] }
  ];

  const rep = [setTodosState, setInputState];

  const subject = new Subject();
  subject.asObservable().subscribe((message) => {
    switch (message.action) {
      case "addButtonClicked":
        //handler(maps, addTodoBehavior(inputState));
        setTodosState(addTodoBehavior(inputState));
        break;
      case "inputValueChanged":
        setInputState(message.payload);
        break;
      default:
      // code block
    }
  });

  return {
    state: {
      inputValue: inputState,
      todos: todosState.todos
    },
    dispatch: (m) => subject.next(m)
  };
}
