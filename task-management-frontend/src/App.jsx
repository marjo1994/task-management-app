import * as React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240; 
const miniDrawerWidth = 64; 

const mobileDrawerWidth = 100; 
const mobileMiniDrawerWidth = 20; 

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const App = () => {
  const [open, setOpen] = React.useState(true); 
  const location = useLocation(); 
  const isMobile = useMediaQuery('(max-width:600px)');
 
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const currentDrawerWidth = isMobile ? (open ? mobileDrawerWidth : mobileMiniDrawerWidth) : (open ? drawerWidth : miniDrawerWidth);

  const isLoginPage = location.pathname === '/login';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {!isLoginPage && (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerToggle} edge="start" sx={{ mr: 2 }} >
              {open ? <ChevronLeftIcon /> : <MenuIcon />}  
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Task Management
            </Typography>
          </Toolbar>
        </AppBar>
      )}

      {!isLoginPage && <Sidebar open={open} handleDrawerClose={handleDrawerToggle}  drawerWidth={currentDrawerWidth} />}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginLeft: !isLoginPage ? `${currentDrawerWidth}px` : 0,
          transition: (theme) =>
            theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        
        {!isLoginPage && <DrawerHeader />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default App;