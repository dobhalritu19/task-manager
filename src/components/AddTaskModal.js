import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from '../redux/tasksSlice';
import { v4 as uuidv4 } from 'uuid';

const AddTaskModal = ({ selectedTask, showModal, handleClose }) => {
  console.log("modal render");
  setTimeout(() => {
    console.log("modal hehehhheeheheh");
  }, 3000)

  const dispatch = useDispatch();

  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Pending',
  });

  // Optimized useEffect to prevent unnecessary updates
  useEffect(() => {
    if (selectedTask && selectedTask.id) {
      setTask({ ...selectedTask }); // Populate the form when editing
    } else {
      setTask({
        title: '',
        description: '',
        dueDate: '',
        status: 'Pending',
      });
    }
  }, [selectedTask]);

  const [errors, setErrors] = useState({});

  // Memoize handleInputChange to avoid re-creations
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  }, []);

  // Validate form inputssss
  const validateForm = useCallback(() => {
    let newErrors = {};

    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!task.dueDate) {
      newErrors.dueDate = 'Due date is required';
    } else {
      const today = new Date().setHours(0, 0, 0, 0);
      const selectedDate = new Date(task.dueDate).setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [task]);

  // Memoize handleSubmit to prevent re-creations
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (validateForm()) {
      if (selectedTask && selectedTask.id) {
        dispatch(updateTask({ ...task, id: task.id }));
      } else {
        dispatch(addTask({ ...task, id: uuidv4() })); // Add an id for the task
        setTask({ title: '', description: '', dueDate: '', status: 'Pending' });
      }

      handleClose();
    }
  }, [task, selectedTask, dispatch, validateForm, handleClose]);

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedTask?.id ? 'Update Task' : 'Add New Task'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter task title"
              name="title"
              value={task.title}
              onChange={handleInputChange}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task description"
              name="description"
              value={task.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group controlId="dueDate" className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleInputChange}
              isInvalid={!!errors.dueDate}
            />
            <Form.Control.Feedback type="invalid">
              {errors.dueDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="status" className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={task.status}
              onChange={handleInputChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </Form.Control>
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {selectedTask?.id ? 'Update Task' : 'Add Task'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default React.memo(AddTaskModal);
