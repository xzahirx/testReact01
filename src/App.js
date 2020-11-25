import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Page01 from './components/pages/Page01';
import Axios from 'axios';
//import uuid from 'uuid';
//const uuid = require('uuid');
console.log('ToDo APP --------------');

class App extends Component {
  state = {
    todos: []
  };
  componentDidMount() {
    Axios.get("https://jsonplaceholder.typicode.com/todos?_limit=10").then(res => this.setState({ todos: res.data }));
  }


  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)] })
    console.log('delTodo', id);
  }

  markComplete = (id) => {
    console.log('this.props', id);
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  //Add Todo 02
  addTodo = (title) => {
    // const newTodo = {
    //   id: uuid.v4(),
    //   title,
    //   completed: false
    // }
    Axios.post("https://jsonplaceholder.typicode.com/todos", {
      title,
      completed: false
    }).then(res => this.setState({ todos: [...this.state.todos, res.data] }))
    // this.setState({ todos: [...this.state.todos, newTodo] });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className='container'>
            <Header />
            <Route path="/" exact render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
              </React.Fragment>
            )} />
            <Route path="/about" component={About} />
            <Route path="/Page01" component={Page01} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;