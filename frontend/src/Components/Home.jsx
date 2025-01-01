import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [tab, setTab] = useState(1);
  const [task, setTask] = useState('');

  const handleTabs = (tab) => {
    setTab(tab);
  };

  console.log(task);

  const handleAddTask = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/addtask', { task });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/alltask');
        console.log(res);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-400 w-screen h-screen flex items-center justify-center">
      <div className="bg-slate-100 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="font-bold text-3xl mb-6 text-center text-black">Todo List</h2>

        {/* Task Input */}
        <div className="flex gap-2 mb-6">
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            type="text"
            placeholder="Enter a task"
            className="flex-grow p-2 border rounded-md outline-none focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-200"
          >
            <span className="hidden sm:inline">Add Task</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

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
        <div className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">Buy Coffee</p>
              <p className="text-sm text-gray-600">10/12/12 10:30</p>
              <p className="text-sm text-gray-600">Status: Active</p>
            </div>
            <div className="flex flex-col gap-2 text-sm">
              <button className="bg-blue-600 text-white px-3 py-1 rounded-sm hover:bg-blue-700 transition-all duration-200">
                Edit
              </button>
              <button className="bg-red-600 text-white px-3 py-1 rounded-sm hover:bg-red-700 transition-all duration-200">
                Delete
              </button>
              <button className="bg-green-600 text-white px-3 py-1 rounded-sm hover:bg-green-700 transition-all duration-200">
                Completed
              </button>
            </div>
          </div>
        </div>

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

export default Home;
