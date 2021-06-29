import React, { Fragment } from 'react';
import './App.css';

//components

import InputTodo from './components/InputTodo';
import ListTodos from './components/ListTodos';
import InputLists from './components/InputList';
import ListLists from './components/ListLists';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputLists />
        <ListLists />
        <ListTodos />
      </div> 
    </Fragment>
  );
}

export default App;
