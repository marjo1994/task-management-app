import React, { useContext } from 'react';
import { Box, Paper, Typography, Card, CardContent } from '@mui/material';
import { TaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const { tasks } = useContext(TaskContext);

  const todoTasks = tasks.filter((task) => task.state === 'To do');
  const inProgressTasks = tasks.filter((task) => task.state === 'In progress');
  const completedTasks = tasks.filter((task) => task.state === 'Completed');

  return (
    <Box sx={{ padding: '20px' }}>
      <Box 
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2, // Space between columns
          justifyContent: 'center', // Centering columns
        }}
      >
        {[
          { title: 'To Do', tasks: todoTasks },
          { title: 'In Progress', tasks: inProgressTasks },
          { title: 'Completed', tasks: completedTasks }
        ].map((column, index) => (
          <Paper 
            key={index} 
            sx={{
              flex: '1 1 300px', // Responsive width
              padding: 2,
              minWidth: '280px', // Prevents it from shrinking too much
              maxWidth: '400px' // Optional max width
            }}
          >
            <Typography variant="h6" align="center">
              {column.title}
            </Typography>
            {column.tasks.map((task) => (
              <Card key={task.id} sx={{ marginBottom: 1 }}>
                <CardContent>
                  <Typography variant="h6">{task.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {task.desc}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;