import { useState } from "react";
import axios from "axios";

const AddTodo = ({ onAdd }) => {
    const [title, setTitle] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError("Title cannot be empty!");
            return;
        }
        try {
            const res = await axios.post("http://127.0.0.1:5000/api/todos", { title });
            onAdd(res.data);
            setTitle("");
            setError("");
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="add-todo-form">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add new todo"
                />
                <button type="submit">Add</button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default AddTodo;
