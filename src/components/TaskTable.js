import React, { useCallback, useMemo } from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, updateTask } from '../redux/tasksSlice';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';  // Import React Icons

const TaskTable = ({ setSelectedTask, handleShow }) => {
  console.log("table render");

  const dispatch = useDispatch();
  const tasksFromStore = useSelector((state) => state.tasks.tasks); // Access tasks from Redux store

  // Memoizing tasks array to avoid unnecessary recalculations
  const tasks = useMemo(() => tasksFromStore, [tasksFromStore]);

  // Memoize delete, complete, and edit handlers
  const handleDelete = useCallback((id) => {
    dispatch(deleteTask(id));
  }, [dispatch]);

  const handleComplete = useCallback((task) => {
    dispatch(updateTask({ ...task, status: task.status === 'Completed' ? 'Pending' : 'Completed' }));
  }, [dispatch]);

  const handleEdit = useCallback((task) => {
    setSelectedTask(task);
    handleShow();
  }, [setSelectedTask, handleShow]);

  const getRowClass = (task) => {
    const currentDate = new Date();

    if (task.status === 'In Progress') {
      return 'table-info';
    }
    if (task.status === 'Completed') {
      return 'table-success';
    }

    if (new Date(task.dueDate) < currentDate) {
      return 'table-danger';
    }

    return 'table-warning'; // for Pending
  };

  return (
    <Card className="shadow-sm rounded-lg">
      <Card.Body>
        <Table responsive className="task-table">
          <thead>
            {['Title', 'Description', 'Due Date', 'Status', 'Actions'].map((header) => (
              <th key={header}>{header}</th>
            ))}
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No records found
                </td>
              </tr>
            ) : (
              tasks.map(task => (
                <tr key={task.id} className={`task-row ${getRowClass(task)}`}>
                  <td>{task.title}</td>
                  <td className="abbreviation">
                    <p>{task.description}</p>
                  </td>
                  <td>{task.dueDate}</td>
                  <td>
                    <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>
                    <Button variant="outline-primary" onClick={() => handleEdit(task)} className="action-btn">
                      <FaEdit size={20} title="Edit" />
                    </Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(task.id)} className="action-btn ml-2">
                      <FaTrashAlt size={20} title="Delete" />
                    </Button>
                    <Button
                      variant="outline-success"
                      onClick={() => handleComplete(task)}
                      className="ml-2"
                      disabled={task.status === 'Completed'}
                    >
                      {task.status === "complete" ? 'Mark Completed' : 'Mark Complete'}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default React.memo(TaskTable);
