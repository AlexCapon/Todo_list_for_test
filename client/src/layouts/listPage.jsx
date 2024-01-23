// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import TaskTable from '../components/taskTable.jsx';
import ModalWindow from '../components/modalWindow.jsx';
import openModal from '../utils/openModal';
import closeModal from '../utils/closeModal';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement.js';
import { defaultData } from '../constants/defaultInputData.js';
import sendTask from '../api/sendTask.js';
import getTasks from '../api/getTasks.js';
import showError from '../utils/showError.js';
import requestDeleteTask from '../api/requestDeleteTask.js';
import requestEditTask from '../api/requestEditTask.js';

export default function ListPage() {
  const [todos, setTodos] = useState(getTasks());
  const [editingIndex, setEditingIndex] = useState(undefined);
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    if (!Array.isArray(todos)) {
      todos.then((data) => setTodos(data)).catch((error) => showError(error));
    }
  }, [todos]);

  function handleAddClick() {
    openModal('createModal');
  }
  function handleAddSubmit(newTask) {
    setTodos((prevState) => [...prevState, newTask]);
    sendTask(newTask);
    closeModal('createModal');
    setFormData(defaultData);
  }
  function handleEditClick(task) {
    const taskData = {
      title: task.title,
      description: task.description,
      status: task.status,
    };

    setFormData(taskData);
    setEditingIndex(todos.indexOf(task));
    openModal('editModal');
  }
  async function handleEditSubmit(task) {
    task.id = todos[editingIndex].id;
    task._id = todos[editingIndex]._id;
    const result = requestEditTask(task);
    result.then((data) => showElement(data, 'data')).catch((err) => console.log(err));
    const updatedTodos = todos.toSpliced(editingIndex, 1, task);

    setTodos(updatedTodos);
    setEditingIndex(undefined);
    closeModal('editModal');
    setFormData(defaultData);
  }
  async function handleDelete(id) {
    requestDeleteTask(id);
    setTodos((prevState) => prevState.filter((task) => task.id !== id));
    setFormData(defaultData);
  }
  function handleInputValueChange({ target }) {
    setFormData((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  }
  function handleModalClose(modalId) {
    closeModal(modalId);
    setFormData(defaultData);
  }

  return (
    <div id='mainContainer' className='container'>
      <div id='tableContainer' className='container'>
        <div id="headerContainer m-4" className="container d-flex justify-content-beetwen">
          <h1 className="m-3">Test Todo List</h1>
          <button
            id='addButton'
            className='btn btn-success m-2 mt-4 ms-5 p-2 ps-2 justify-content-end'
            type='button'
            onClick={handleAddClick}
          >
            Добавить
          </button>
        </div>
        
        <TaskTable
          tasks={todos}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      </div>
      <div id='modalContaner' className='container'>
        <ModalWindow
          id='createModal'
          data={formData}
          onSubmit={handleAddSubmit}
          onChange={handleInputValueChange}
          onClose={handleModalClose}
        ></ModalWindow>
        <ModalWindow
          id='editModal'
          data={formData}
          onSubmit={handleEditSubmit}
          onChange={handleInputValueChange}
          onClose={handleModalClose}
        ></ModalWindow>
      </div>
    </div>
  );
}
