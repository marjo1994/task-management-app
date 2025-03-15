import * as React from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, useMediaQuery} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function createData(title, state, desc) {
  return { title, state, desc };
}

const rows = [
  createData('Task1', 'To do', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
  createData('Task2', 'In progress', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
  createData('Task3', 'In progress', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
  createData('Task4', 'To do', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
  createData('Task5', 'Completed', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'),
];

const TaskList = () => {
  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Detecta pantallas pequeñas

  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <h1>Task List</h1>
        <Button variant="contained">Add Task</Button>
      </Box>

      {isSmallScreen ? (
        // Mostrar como lista en pantallas pequeñas
        <div>
          {rows.map((row) => (
            <Paper key={row.title} sx={{ p: 2, mb: 2 }}>
              <div><strong>Title:</strong> {row.title}</div>
              <div><strong>State:</strong> {row.state}</div>
              <div><strong>Description:</strong> {row.desc}</div>
            </Paper>
          ))}
        </div>
      ) : (
        // Mostrar como tabla en pantallas grandes
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
                {rows.map((row) => (
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
                      <IconButton aria-label="delete">
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