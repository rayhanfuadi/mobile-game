import { User } from '@/redux/leaderboardSlice';
import axios from 'axios';

const API_BASE_URL = 'https://677118a42ffbd37a63ce2fcc.mockapi.io/users';

export const fetchUsers = async (): Promise<User[]> => {
    const response = await axios.get<User[]>(API_BASE_URL);
    return response.data.map((item): User => ({
        id: item.id,
        nama: item.nama,
        skor: item.skor,
        url_foto: item.url_foto,
    }));
};

export const updateUser = async (id: string, data: Partial<{ nama: string; skor: number; url_foto: string }>) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
};

export const addUser = async (data: { nama: string; skor: number; url_foto: string }) => {
    const response = await axios.post(API_BASE_URL, data);
    return response.data;
};
