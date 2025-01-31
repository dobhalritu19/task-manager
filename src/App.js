import './App.css';
import { Container, Button } from 'react-bootstrap';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import TaskTable from './components/TaskTable';
import AddTaskModal from './components/AddTaskModal';
import React, { useState } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({}); // set edited tasks

  // Function to handle modal open
  const handleShow = () => setShowModal(true);

  // Function to handle modal close
  const handleClose = () => {
    setTask({})
    setShowModal(false)
  };


  return (
    <ThemeProvider>
      <Header />
      <Container className="mt-4">
        <h1>Welcome to Task Management App</h1>
        {/* Add Task Button */}
        <Button variant="primary" onClick={handleShow} className="mb-3 custom-add-task-btn">
          Add Task
        </Button>
        <TaskTable
          setSelectedTask={(e) => setTask(e)}
          handleShow={handleShow}
        /> {/* Pass tasks data to the TaskTable */}
      </Container>

      {/* AddTaskModal component */}
      <AddTaskModal
        selectedTask={task}
        showModal={showModal}
        handleClose={handleClose}
      />
    </ThemeProvider>
  );
}

export default App;
