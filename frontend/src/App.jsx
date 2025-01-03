import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState('');
  const [todo, settodo] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);  // New state to track the task being edited

  const handleTabs = (tab) => {
    setTab(tab);
  };
  const handleCompleteTask = () => {};

  const handleEditTask = (id, task) => {
    setTask(task);
    setEditingTaskId(id);  // Set task ID when editing
  };
  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();
    if (editingTaskId) {
      // Update the existing task
      await axios.put(`http://localhost:8000/tasks/${editingTaskId}`, { task });
      setEditingTaskId(null);  // Reset the editing task ID after updating
    } else {
      // Add a new task
      await axios.post('http://localhost:8000/tasks', { task });
    }
    setTask('');  // Clear task input
    fetchData();
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      setTask('');
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get('http://localhost:8000/tasks');
      settodo(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [task]);

  return (
    <div className="bg-inherit w-auto h-auto flex items-center justify-center m-4">
      <div className="bg-slate-600 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="font-bold text-3xl mb-6 text-center text-black">Todo List</h2>

        {/* Task Input */}
        <form onSubmit={handleAddOrUpdateTask} className="flex gap-2 mb-6">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter a task"
            className="flex-grow p-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white mx-auto px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            <span className="hidden sm:inline">{editingTaskId ? 'Update Task' : 'Add Task'}</span>
            <span className="sm:hidden">{editingTaskId ? 'Update' : 'Add'}</span>
          </button>
        </form>

        {/* Tabs */}
        <div className="flex justify-around mb-6 text-sm font-medium">
          <button
            onClick={() => handleTabs(1)}
            className={`py-2 px-4 rounded-lg ${
              tab === 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white'
            } transition-all duration-200`}
          >
            All
          </button>
          <button
            onClick={() => handleTabs(2)}
            className={`py-2 px-4 rounded-lg ${
              tab === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white'
            } transition-all duration-200`}
          >
            Active
          </button>
          <button
            onClick={() => handleTabs(3)}
            className={`py-2 px-4 rounded-lg ${
              tab === 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-blue-600 hover:text-white'
            } transition-all duration-200`}
          >
            Completed
          </button>
        </div>

        {/* Task List */}
        {todo.map((item) => (
          <div key={item.id} className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold text-gray-800">{item.task}</p>
                <p className="text-sm text-gray-600">{new Date(item.created_at).toLocaleString()}</p>
                <p className="text-sm text-gray-600">Status: Active</p>
              </div>
              <div className="flex flex-col gap-2 text-sm">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-3 py-1 rounded-sm hover:bg-blue-700 transition-all duration-200"
                  onClick={() => handleEditTask(item.id, item.task)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white px-3 py-1 rounded-sm hover:bg-red-700 transition-all duration-200"
                  onClick={() => handleDeleteTask(item.id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-green-600 text-white px-3 py-1 rounded-sm hover:bg-green-700 transition-all duration-200"
                  onClick={handleCompleteTask}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder for other tasks */}
        <p className="text-center font-semibold text-slate-800 mt-4">
          {tab === 1 && 'Showing All Tasks'}
          {tab === 2 && 'Showing Active tasks'}
          {tab === 3 && 'Showing Completed Tasks'}
        </p>
      </div>
    </div>
  );
}

export default App;
