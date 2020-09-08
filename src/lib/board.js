import axios from 'axios';

export const boardRegister = ({ title, writer, contents }) => axios.post('/api/board/register', { title, writer, contents });