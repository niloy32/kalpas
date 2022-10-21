let userDataFromLocalStorage, tokenFromLocalStorage;
try {
  userDataFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
  tokenFromLocalStorage = localStorage.getItem('token');
} catch (error) {}

const initialState = {};
export default initialState;
