import './App.css';
import { Container, Button } from 'react-bootstrap';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import TaskTable from './components/TaskTable';
import AddTaskModal from './components/AddTaskModal';
import React, { useState, useCallback } from 'react';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({}); // set edited tasks

  // Function to handle modal open
  const handleShow = useCallback(() => {
    setShowModal(true);
  }, [])

  // Function to handle modal close

  const handleClose = useCallback(() => {
    setTask({})
    setShowModal(false)
  }, [])

  // Memoized function for setting the selected task
  const setSelectedTask = useCallback((e) => setTask(e), []);

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
          setSelectedTask={setSelectedTask}
          handleShow={handleShow}
        /> {/* Pass tasks data to the TaskTable */}
      </Container>

      {/* AddTaskModal component */}
      {
        showModal &&
        <AddTaskModal
          selectedTask={task}
          showModal={showModal}
          handleClose={handleClose}
        />
      }

    </ThemeProvider>
  );
}

export default App;
