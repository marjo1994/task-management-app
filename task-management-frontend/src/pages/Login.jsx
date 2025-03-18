import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth';
import { useMediaQuery, Box, Paper, TextField, Typography, Button } from '@mui/material';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleLogin = async () => {
    const token = await login(username, password);
    if (token) {
      localStorage.setItem('token', token); 
      navigate('/tasks');
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh', 
      padding: isSmallScreen ? 2 : 0,
    }}
  >
    <Paper
      elevation={3} 
      sx={{
        padding: isSmallScreen ? 3 : 4, 
        width: isSmallScreen ? '90%' : 400,
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" sx={{ mb: 2 }}>
        Task Management App
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Log In
      </Typography>

      <TextField fullWidth label="User" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2 }}/>

      <TextField fullWidth label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2 }} />

      <Button fullWidth variant="contained" onClick={handleLogin} sx={{ mt: 2 }} >
        Log In
      </Button>
    </Paper>
  </Box>
  );
};

export default Login;