from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

# In-memory storage for todos
todos = []
todo_id_counter = 1  # To generate unique IDs

@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)

@app.route('/api/todos', methods=['POST'])
def add_todo():
    global todo_id_counter
    data = request.get_json()
    
    if 'title' not in data or not data['title'].strip():
        return jsonify({"error": "Title is required"}), 400

    todo = {
        "id": todo_id_counter,
        "title": data["title"],
        "completed": False
    }
    todos.append(todo)
    todo_id_counter += 1
    return jsonify(todo), 201

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]
    return jsonify({"message": "Todo deleted"}), 200

@app.route('/api/todos/<int:todo_id>', methods=['PATCH'])
def update_todo(todo_id):
    data = request.get_json()
    for todo in todos:
        if todo["id"] == todo_id:
            if "completed" in data:
                todo["completed"] = data["completed"]
            return jsonify(todo)
    return jsonify({"error": "Todo not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
