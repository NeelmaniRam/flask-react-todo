import axios from "axios";

const TodoItem = ({ todo, onDelete, onToggle }) => {
    const handleDelete = async () => {
        await axios.delete(`http://127.0.0.1:5000/api/todos/${todo.id}`);
        onDelete(todo.id);
    };

    const handleToggle = async () => {
        await axios.patch(`http://127.0.0.1:5000/api/todos/${todo.id}`, {
            completed: !todo.completed,
        });
        onToggle(todo.id);
    };

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={handleToggle}
            />
            <span className={todo.completed ? "completed" : ""}>{todo.title}</span>
            <button onClick={handleDelete}>❌</button>
        </div>
    );
};

export default TodoItem;
