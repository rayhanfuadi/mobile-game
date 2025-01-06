"use client"

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUser as updateUserAPI } from '@/services/apiServices';
import { AppDispatch, RootState } from '@/redux/store';
import { setUsers, updateUser } from '@/redux/leaderboardSlice';
import Image from 'next/image';
import EditPlayersForm from './EditPlayersForm';
import { Button } from "@/components/ui/button"
import { FacebookIcon, FacebookShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

    // const handleShare = (nama: string, skor: number) => {
    //     const message = `Hey! *${nama}* just scored ${skor} on the leaderboard! Check it out!`;
    //     const encodedMessage = encodeURIComponent(message);
    //     const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    //     window.open(whatsappURL, '_blank');
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

    const [position, setPosition] = React.useState("bottom")

    return (
        <div className="grid gap-6">
            <h1 className="text-2xl font-semibold text-center mt-[68px]">Leaderboards</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className='text-black' variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                        <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex justify-between border p-2 rounded-full">
                <div className="flex items-center gap-2">
                    <Image className='ml-2' src="/icons/search.svg" alt="Logo" width={24} height={24} />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama?"
                        className="text-[#888] bg-transparent focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-1 bg-white rounded-full px-4 py-2">
                    <Image src="/icons/filter.svg" alt="Logo" width={18} height={18} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="text-black" variant="outline">Filter</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 mr-[16px]">
                            <DropdownMenuRadioGroup
                                value={sortOrder} // Gunakan state sortOrder yang ada
                                onValueChange={(value) => {
                                    setSortOrder(value as 'asc' | 'desc'); // Update state sortOrder
                                }}
                            >
                                <DropdownMenuRadioItem value="desc">
                                    Skor Tertinggi (0-100)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="asc">
                                    Skor Terendah (100-0)
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Players Info */}
            <div className="grid gap-4">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center w-[44px] h-[44px] bg-white rounded-full">
                                <Image className='rounded-full w-[44px] h-[44px] object-cover' src={user.url_foto} alt="Logo" width={60} height={60} />
                            </div>
                            <div className="grid gap-1">
                                <h3 className='font-semibold'>{user.nama}</h3>
                                <p className='text-[14px] text-[#ccc]'>Skor: <b>{user.skor}</b></p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex justify-center items-center bg-[#606060] hover:bg-[#404040] rounded-lg p-2">
                                <Image src="/icons/share.svg" alt="Logo" width={24} height={24} />
                            </div>
                            <div className="flex justify-center items-center bg-[#606060] hover:bg-[#404040] rounded-lg p-2">
                                <Image src="/icons/edit.svg" alt="Logo" width={24} height={24} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* ============================================= */}
            <div className="">
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
                            className="border p-2 rounded text-black"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'skor' | 'nama')}
                        >
                            <option value="score">Sort by Score</option>
                            <option value="name">Sort by Name</option>
                        </select>
                        <select
                            className="border p-2 rounded text-black"
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
                    <EditPlayersForm
                        valueNama={editingUser.nama}
                        onChangeNama={(e) => setEditingUser({ ...editingUser, nama: e.target.value })}
                        valueSkor={editingUser.skor}
                        onChangeSkor={(e) => setEditingUser({ ...editingUser, skor: +e.target.value })}
                        valueUrl_foto={editingUser.url_foto}
                        onChangeUrl_foto={(e) => setEditingUser({ ...editingUser, url_foto: e.target.value })}
                        onClick={handleEdit}
                        setEditingUser={() => setEditingUser(null)}
                    />
                )}
            </div>
        </div >
    );
};

export default Leaderboard;
