// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { fetchTodos, saveTodos } from '../fakedb/data';
import TaskTable from '../components/taskTable.jsx';
import ModalWindow from '../components/modalWindow.jsx';
import { plusIcon } from '../assets/icons.jsx';
import openModal from '../utils/openModal';
import closeModal from '../utils/closeModal';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/showElement.js';
import { defaultData } from '../constants/defaultInputData.js';
import sendTask from '../api/sendTask.js';

export default function ListPage() {
  const [todos, setTodos] = useState(fetchTodos());
  const [editingIndex, setEditingIndex] = useState(undefined);
  const [formData, setFormData] = useState(defaultData);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function handleAddClick() {
    openModal('createModal');
  }
  function handleAddSubmit(newTask) {
    setTodos((prevState) => [...prevState, newTask]);
    sendTask(newTask)
    closeModal('createModal');
    setFormData(defaultData);
  }
  function handleEditClick(task) {
    const taskData = {
      title: task.title,
      description: task.description,
      status: task.status,
    }

    setFormData(taskData)
    setEditingIndex(todos.indexOf(task));
    openModal('editModal');
  }
  function handleEditSubmit(task) {
    task.id = todos[editingIndex].id;
    const updatedTodos = todos.toSpliced(editingIndex, 1, task);
    setTodos(updatedTodos);
    setEditingIndex(undefined);
    closeModal('editModal');
    setFormData(defaultData);
  }
  function handleDelete(id) {
    setTodos((prevState) => prevState.filter((task) => task.id !== id));
    setFormData(defaultData);
  }
  function handleInputValueChange({ target }) {
    setFormData((prevState) => ({
      ...prevState,
      [target.id]: target.value,
    }));
  }
  function handleModalClose(modalId){
    closeModal(modalId);
    setFormData(defaultData);
  }

  return (
    <div id='mainContainer' className='container'>
      <div id='tableContainer' className='container'>
        <button id='addButton'
          className='btn btn-success m-3 p-2 ps-2'
          type='button'
          onClick={handleAddClick}
        >
          {plusIcon}
        </button>
        <TaskTable tasks={todos} onEdit={handleEditClick} onDelete={handleDelete}/>
      </div>
      <div id='modalContaner' className='container'>
        <ModalWindow id='createModal' data={formData} onSubmit={handleAddSubmit} onChange={handleInputValueChange} onClose={handleModalClose}>
        </ModalWindow>
        <ModalWindow id='editModal' data={formData} onSubmit={handleEditSubmit} onChange={handleInputValueChange} onClose={handleModalClose}>
        </ModalWindow>
      </div>
    </div>
  );
}
