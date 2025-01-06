import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUser as updateUserAPI } from '@/services/apiServices';
import { AppDispatch, RootState } from '@/redux/store';
import { setUsers, updateUser } from '@/redux/leaderboardSlice';
import Image from 'next/image';
import EditPlayerForm from './EditPlayerForm';
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

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

    // const handleShare = (platform: string, nama: string, skor: number) => {
    //     const message = `Hey! ${nama} just scored ${skor} on the leaderboard! Check it out!`;
    //     const leaderboardURL = 'https://your-website.com/leaderboard'; // Tambahkan URL valid ke leaderboard Anda
    //     const encodedURL = encodeURIComponent(leaderboardURL);

    //     let shareURL = '';

    //     switch (platform) {
    //         case 'WhatsApp':
    //             shareURL = `https://wa.me/?text=${encodeURIComponent(message)}`;
    //             break;
    //         case 'Telegram':
    //             shareURL = `https://t.me/share/url?url=${encodedURL}&text=${encodeURIComponent(message)}`;
    //             break;
    //         case 'Facebook':
    //             shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodedURL}`;
    //             break;
    //         case 'Instagram':
    //             shareURL = `https://www.instagram.com/rayhanfuadi`;
    //             break;
    //         default:
    //             console.error('Unsupported platform:', platform);
    //             return;
    //     }

    //     window.open(shareURL, '_blank');
    // };

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
                            <td className="border p-2 flex justify-between">
                                <div className="flex gap-2">
                                    <WhatsappShareButton
                                        url="https://example.com"
                                        title={`Hey! ${user.nama} just scored ${user.skor} on the leaderboard!`}
                                    >
                                        <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <TelegramShareButton
                                        url="https://example.com"
                                        title={`Hey! ${user.nama} just scored ${user.skor} on the leaderboard!`}
                                    >
                                        <TelegramIcon size={32} round />
                                    </TelegramShareButton>
                                    <FacebookShareButton
                                        url="https://example.com"
                                        hashtag={`Hey! ${user.nama} just scored ${user.skor} on the leaderboard!`}
                                    >
                                        <FacebookIcon size={32} round />
                                    </FacebookShareButton>
                                </div>
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
                <EditPlayerForm
                    editingUser={editingUser}
                    onClose={() => setEditingUser(null)}
                    onSave={handleEdit}
                />
            )}
        </div>
    );
};

export default Leaderboard;
