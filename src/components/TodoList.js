import { useEffect, useState } from "react";
import axios from "axios";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        axios.get("http://127.0.0.1:5000/api/todos").then((res) => setTodos(res.data));
    }, []);

    const addTodo = (newTodo) => setTodos([...todos, newTodo]);

    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const filteredTodos = todos.filter((todo) =>
        filter === "active"
            ? !todo.completed
            : filter === "completed"
            ? todo.completed
            : true
    );

    return (
        <div className="todo-container">
            <h2>Todo List</h2>
            <AddTodo onAdd={addTodo} />
            <div className="filters">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
            </div>
            <div className="todo-list">
                {filteredTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} onToggle={toggleTodo} />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
