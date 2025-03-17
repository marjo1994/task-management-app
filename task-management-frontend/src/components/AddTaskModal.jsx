// components/AddTaskModal.js
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, MenuItem, Typography } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddTaskModal = ({ open, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');
  const [state, setState] = useState('To do');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, state, desc };
    try {
      await onAddTask(newTask); 
      onClose(); 
      setTitle('');
      setState('To do');
      setDesc('');
    } catch (error) {
      console.error('Error submitting task:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add New Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Title" fullWidth margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <TextField select label="State" fullWidth margin="normal" value={state} onChange={(e) => setState(e.target.value)} required >
            <MenuItem value="To do">To do</MenuItem>
            <MenuItem value="In progress">In progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </TextField>
          <TextField label="Description" fullWidth margin="normal" multiline rows={4} value={desc} onChange={(e) => setDesc(e.target.value)} required />
         
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="primary">
              Add Task
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddTaskModal;