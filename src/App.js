import axios from 'axios';

import React, { Component } from "react";
import logo from "./logo.svg";
import loadingGif from './loading.gif'
import "./App.css";

import ListItem from './ListItem'

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: '',
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    };
    this.apiURL = "https://5b837dd35118040014cd6ca8.mockapi.io";
  }

  handleChange = event => {
    this.setState({
      newTodo: event.target.value
    });
  };

  addTodo = async () => {
    // const newTodo = {
    //   id: this.generateTodoId(),
    //   name: this.state.newTodo
    // };

    const response = await axios.post(`${this.apiURL}/todos`, {
      name: this.state.newTodo
    });
    // console.log(response);

    const todos = this.state.todos;
    todos.push(response.data);
    this.setState({
      todos: todos,
      newTodo: ""
    });
    this.alert('Todo created successfully.')
  };

  async deleteTodo(index) {
    const todos = this.state.todos;
    const todo = todos[index];

    await axios.delete(`${this.apiURL}/todos/${todo.id}`);

    delete todos[index];
    this.setState({ todos });
    this.alert("Todo deleted successfully.");
  }

  editTodo(index) {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  }

  updateTodo = async () => {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiURL}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    // todo.name = this.state.newTodo;

    const todos = this.state.todos;

    todos[this.state.editingIndex] = response.data;

    this.setState({
      todos,
      editing: false,
      editingIndex: null,
      newTodo: '',
    });

    this.alert('Todo updated successfully.');
  }

  // generateTodoId = () => {
  //   const lastTodo = this.state.todos[this.state.todos.length - 1];
  //   if (lastTodo) {
  //     return (lastTodo.id + 1)
  //   }
  //   return 1;
  // }

  alert = (notification) => {
    this.setState({
      notification
    });

    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 2000);
  }
  
  async componentDidMount() {
    const response = await axios.get(`${this.apiURL}/todos`);
    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 1000);
  }
  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Todo List CRUD React</h1>
        </header>

        <div className="container">
          {
            this.state.notification &&
            <div className="alert m-3 alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
          }
          <input
            type="text"
            name="todo"
            className="my-4 form-control"
            placeholder="Add a new todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />

          <button
            className="btn-success mb-3 form-control"
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            disabled={this.state.newTodo.length < 1}
          >
            {this.state.editing ? " Update todo" : " Add new todo"}
          </button>
          {
            this.state.loading &&
            <img src={loadingGif} alt=''/>
          }
          {
            (!this.state.editing || this.state.loading) && (
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <ListItem
                    key={item.id}
                    item={item}
                    editTodo={() => { this.editTodo(index) }}
                    deleteTodo={() => { this.deleteTodo(index) }}
                  />;
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
