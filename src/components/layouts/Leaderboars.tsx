import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUser as updateUserAPI } from '@/services/apiServices';
import { AppDispatch, RootState } from '@/redux/store';
import { setUsers, updateUser } from '@/redux/leaderboardSlice';
import Image from 'next/image';

const Leaderboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.leaderboard.users);

    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'skor' | 'nama'>('skor');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [editingUser, setEditingUser] = useState<{ id: string; nama: string; skor: number; url_foto: string } | null>(null);


    useEffect(() => {
        const loadUsers = async () => {
            const data = await fetchUsers();
            dispatch(setUsers(data));
        };
        loadUsers();
    }, [dispatch]);

    const filteredUsers = users
        .filter((user) =>
            user.nama.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'skor') {
                return sortOrder === 'desc' ? b.skor - a.skor : a.skor - b.skor;
            }
            return sortOrder === 'desc'
                ? b.nama.localeCompare(a.nama)
                : a.nama.localeCompare(b.nama);
        });

    const handleShare = (nama: string, skor: number) => {
        const message = `Hey! *${nama}* just scored ${skor} on the leaderboard! Check it out!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
    };

    const handleEdit = async () => {
        if (editingUser) {
            console.log('Payload Update:', editingUser); // Log payload ke konsol
            // Optional: Update API
            await updateUserAPI(editingUser.id, {
                nama: editingUser.nama,
                skor: editingUser.skor,
                url_foto: editingUser.url_foto,
            });
            dispatch(updateUser(editingUser));
            setEditingUser(null); // Tutup modal
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-4">Leaderboards</h1>

            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="border p-2 rounded w-1/3"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex gap-2">
                    <select
                        className="border p-2 rounded"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as 'skor' | 'nama')}
                    >
                        <option value="score">Sort by Score</option>
                        <option value="name">Sort by Name</option>
                    </select>
                    <select
                        className="border p-2 rounded"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border p-2">Photo</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Score</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td className="border p-2">
                                <Image
                                    src={user.url_foto}
                                    alt={user.nama}
                                    width={50}
                                    height={50}
                                    className="rounded-full"
                                />
                            </td>
                            <td className="border p-2">{user.nama}</td>
                            <td className="border p-2">{user.skor}</td>
                            <td className="border p-2">
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() => handleShare(user.nama, user.skor)}
                                >
                                    Share
                                </button>
                                <button
                                    className="bg-green-500 text-white px-2 py-1 rounded ml-2"
                                    onClick={() => {
                                        console.log('User to Edit:', user); // Debugging: Apakah data user benar?
                                        setEditingUser(user); // Set data user ke state editingUser
                                    }}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Edit Player</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingUser.nama}
                            onChange={(e) => setEditingUser({ ...editingUser, nama: e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        <input
                            type="number"
                            placeholder="Score"
                            value={editingUser.skor}
                            onChange={(e) => setEditingUser({ ...editingUser, skor: +e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        <input
                            type="text"
                            placeholder="Photo URL"
                            value={editingUser.url_foto}
                            onChange={(e) => setEditingUser({ ...editingUser, url_foto: e.target.value })}
                            className="border p-2 w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                onClick={() => setEditingUser(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={handleEdit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Leaderboard;
