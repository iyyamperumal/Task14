import { useEffect, useState } from 'react'
import './App.css'
import ToDoList from './Components/todoslist';

function App() {
  //State value to hold the data for todolist 
  const [todos, setTodos] = useState([]);
  const [formState, setFormState] = useState({});
  //Load the todo data from the mock api
  const loadData = async () => {

    const response = await fetch("https://668b76a30b61b8d23b09a72c.mockapi.io/todolist");
    const data = await response.json();
    // console.log(data);
    setTodos(data);
  };
  //Handling add
  const handleAdd = (e) => {
    e.preventDefault();
    if (formState.id) {
      updateTodo();
    }
    else {
      createTodo();
    }
    setFormState({});
  };
  //Add new Todo data
  const createTodo = () => {
    const newTodo = { ...formState };
    newTodo.id = Date.now();
    setTodos([newTodo, ...todos]);
  };
  const updateTodo = () => {
    const index = todos.findIndex((todo) => todo.id === formState.id);
    const newTodo = [...todos];
    newTodo[index] = formState;
    setTodos(newTodo);
    console.log(newTodo);
  };
  //Edit a todo
  const editTodo = (tdid) => {
    const tdData = todos.find((todo) => todo.id === tdid);

    setFormState(tdData);
  };

  // Delete a todo
  const deleteTodo = (tdId) => {
    setTodos(todos.filter(({ id }) => tdId !== id));
  };

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    loadData();
  }, []);
  // console.log(todos);
  return (
    <>

      <h2>My Todo</h2>
      <form className='input-div' onSubmit={handleAdd}>
        <input required type='text' name='name' onChange={handleChange} placeholder='Todo names' value={formState.name || ""}></input>
        <input required type='text' name='description' onChange={handleChange} placeholder='Todo Description' value={formState.description || ""}></input>
        <button type='add' className='btn'>Add Todo</button>
      </form >
      <div className='middle'>
        <span className='middle1'>My Todos</span>
        <span className='middle2'>Status Filter :
          <span className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
              All
            </button>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">Completed</a>
              <a className="dropdown-item" href="#">Not Completed</a>
            </div>
          </span>
        </span>
      </div>
      <div className='todos-box'>
        {todos.map((todo) => (
          <ToDoList
            {...todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            editTodo={editTodo} />
        ))}
      </div>
    </>
  );
}

export default App
