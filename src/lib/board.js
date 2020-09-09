import axios from 'axios';
import storage from './storage';

export const boardRegister = ({ title, writer, contents }) => axios.post('/api/board/register', { title, writer, contents });
export const boardList = () => {
    axios.get('/api/board/boardList', { withCredentials: false }).then(response => {
        storage.set('boardList', response.data);
        //console.log(response.data)
    });
};