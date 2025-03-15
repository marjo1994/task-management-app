export const login = async (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === 'admin' && password === 'admin') {
          resolve('fake-token'); 
        } else {
          resolve(null);
        }
      }, 1000);
    });
};