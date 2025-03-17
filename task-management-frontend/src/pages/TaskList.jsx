import React, { useState, useContext } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useMediaQuery} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddTaskModal from '../components/AddTaskModal';
import { TaskContext } from '../context/TaskContext';

const TaskList = () => {
  const { tasks, addTask, removeTask } = useContext(TaskContext); 
  const [modalOpen, setModalOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleAddTask = (newTask) => {
    addTask(newTask); 
  };
  const handleDelete = (taskId) => {
    removeTask(taskId);
  };
 
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h1>Task List</h1>
        <Button variant="contained" onClick={() => setModalOpen(true)}>Add Task</Button>
      </Box>

      <AddTaskModal open={modalOpen} onClose={() => setModalOpen(false)} onAddTask={handleAddTask} />
      {isSmallScreen ? (
        <div>
          {tasks.map((row) => (
            <Paper key={row.title} sx={{ p: 2, mb: 2 }}>
              <div><strong>Title:</strong> {row.title}</div>
              <div><strong>State:</strong> {row.state}</div>
              <div><strong>Description:</strong> {row.desc}</div>
            </Paper>
          ))}
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">State</TableCell>
                  <TableCell align="right">Description</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">{row.state}</TableCell>
                    <TableCell align="right">{row.desc}</TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete"  onClick={() => handleDelete(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default TaskList;