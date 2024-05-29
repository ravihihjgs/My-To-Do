
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  const [editableIndex, setEditableIndex] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDesc, setEditedDesc] = useState('');

  const handleEdit = (index) => {
    setEditableIndex(index);
    setEditedTitle(tasks[index].title);
    setEditedDesc(tasks[index].desc);
  };

  const handleSave = (index) => {
    onEdit(index, editedTitle, editedDesc);
    setEditableIndex(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`${task.color} p-4 rounded-lg text-white shadow-md`}
        >
          <div className="flex flex-col justify-between h-full">
            <div>
              {editableIndex === index ? (
                // Edit mode
                <>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="text-xl font-semibold bg-transparent border-b border-white"
                  />
                  <textarea
                    value={editedDesc}
                    onChange={(e) => setEditedDesc(e.target.value)}
                    className="mt-2 text-sm bg-transparent border-b border-white"
                  />
                </>
              ) : (
                // View mode
                <>
                  <h2 className="text-xl font-semibold">{task.title}</h2>
                  <p className="mt-2 text-sm">Priority: {task.priority}</p>
                </>
              )}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm overflow-ellipsis h-16">{task.desc}</div>
              <div className="flex space-x-2">
                {editableIndex === index ? (
                  // Edit mode
                  <button
                    onClick={() => handleSave(index)}
                    className="bg-green-400 text-black font-semibold p-2 rounded"
                  >
                    <FaSave size={18} />
                  </button>
                ) : (
                  // View mode
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-rose-50 text-black font-semibold p-2 rounded"
                  >
                    <FaEdit size={18} />
                  </button>
                )}
                <button
                  onClick={() => onDelete(index)}
                  className="bg-rose-50 text-black font-semibold p-2 rounded hover:bg-red-500 hover:text-white"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
