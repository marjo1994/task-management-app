export const fetchTasks = async () => {
  try {
    const response = await fetch('https://wsaqfp8335.execute-api.us-east-2.amazonaws.com/prod/getTasks');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await fetch('https://wsaqfp8335.execute-api.us-east-2.amazonaws.com/prod/createTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating task:', error.message);
    throw error;
  }
};


export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`https://wsaqfp8335.execute-api.us-east-2.amazonaws.com/prod/deleteTask/${taskId}`, {
      method: 'DELETE',
    });
    const data = await response.json(); 
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete task');
    }
    return data;
  } catch (error) {
    console.error('Error deleting task:', error.message);
    throw error; 
  }
};
