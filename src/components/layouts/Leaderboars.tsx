"use client"

import React, { useEffect, useRef, useState } from 'react';
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
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from 'lucide-react';
import InstagramShareButton from '../elements/InstagramShareButton';


const Leaderboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.leaderboard.users);

    const [search, setSearch] = useState('');
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
        .sort((a, b) => (sortOrder === 'desc' ? b.skor - a.skor : a.skor - b.skor));

    const handleEdit = async () => {
        if (editingUser) {
            console.log('Payload Update:', editingUser);
            await updateUserAPI(editingUser.id, {
                nama: editingUser.nama,
                skor: editingUser.skor,
                url_foto: editingUser.url_foto,
            });
            dispatch(updateUser(editingUser));
            setEditingUser(null);
        }
    };

    const inputRef = useRef<HTMLInputElement>(null);

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            navigator.clipboard.writeText(inputRef.current.value)
                .then(() => {
                    alert("Link copied to clipboard!");
                })
                .catch((err) => {
                    console.error("Failed to copy text: ", err);
                });
        }
    };

    return (
        <div className="grid gap-6">
            <h1 className="text-2xl font-semibold text-center mt-[68px]">Leaderboards</h1>

            {/* search bar */}
            <div className="flex justify-between border gap-2 p-2 rounded-full">
                <div className="flex items-center w-full gap-2">
                    <Image className='ml-2' src="/icons/search.svg" alt="Logo" width={24} height={24} />
                    <input
                        type="text"
                        placeholder="Cari berdasarkan nama?"
                        className="text-[#888] bg-transparent w-full focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-1 bg-white rounded-full px-4 py-2">
                    <Image src="/icons/filter.svg" alt="Logo" width={18} height={18} />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <p className='text-black mr-3'>Filter</p>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 mr-[16px]">
                            <DropdownMenuRadioGroup
                                value={sortOrder}
                                onValueChange={(value) => {
                                    setSortOrder(value as 'asc' | 'desc');
                                }}
                            >
                                <DropdownMenuRadioItem value="desc">
                                    Skor Tertinggi (100-0)
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="asc">
                                    Skor Terendah (0-100)
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Players Info */}
            <div className="grid gap-4">
                {filteredUsers.map((user) => (
                    <div key={user.id} className="grid grid-cols-12 items-center p-3 border-b">
                        <div className="col-span-2 flex items-center gap-3">
                            <div className="flex justify-center items-center w-[44px] h-[44px] bg-white rounded-full">
                                <Image className='rounded-full w-[44px] h-[44px] object-cover' src={user.url_foto} alt="Logo" width={60} height={60} />
                            </div>
                        </div>

                        <div className="col-span-7 mr-2">
                            <div className="grid gap-1">
                                <h3 className='font-semibold'>{user.nama}</h3>
                                <p className='text-[14px] text-[#ccc]'>Skor: <b>{user.skor}</b></p>
                            </div>
                        </div>

                        <div className="col-span-3">
                            <div className="flex justify-end gap-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <div className="flex justify-center items-center bg-[#606060] hover:bg-[#404040] rounded-lg p-2">
                                            <Image src="/icons/share.svg" alt="Logo" width={24} height={24} />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="bg-radial-primary sm:max-w-md mx-auto drop-shadow-form rounded-lg">
                                        <DialogHeader>
                                            <DialogTitle className='text-white'>Share link</DialogTitle>
                                            <DialogDescription className='text-[#999]'>
                                                Siapa saja bisa memiliki link ini.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="flex items-center space-x-2">
                                            <div className="grid flex-1 gap-2">
                                                <Label htmlFor="link" className="sr-only">
                                                    Link
                                                </Label>
                                                <Input
                                                    ref={inputRef}
                                                    className='text-white'
                                                    id="link"
                                                    defaultValue="https://leaderboard-mobile.vercel.app/"
                                                    readOnly
                                                />
                                            </div>
                                            <Button type="submit" size="sm" className="px-3" onClick={handleCopy}>
                                                <span className="sr-only">Copy</span>
                                                <Copy />
                                            </Button>
                                        </div>
                                        <div className="flex items-center justify-end gap-2">
                                            <WhatsappShareButton
                                                url="https://leaderboard-mobile.vercel.app/"
                                                title={`Hey! ${user.nama} just scored ${user.skor} on the leaderboard!`}
                                            >
                                                <WhatsappIcon size={32} round />
                                            </WhatsappShareButton>
                                            <TelegramShareButton
                                                url="https://leaderboard-mobile.vercel.app/"
                                                title={`Hey! ${user.nama} just scored ${user.skor} on the leaderboard!`}
                                            >
                                                <TelegramIcon size={32} round />
                                            </TelegramShareButton>
                                            <FacebookShareButton
                                                url="https://leaderboard-mobile.vercel.app/"
                                                hashtag={`Hey! ${user.nama} just scored ${user.skor} on the leaderboard!`}
                                            >
                                                <FacebookIcon size={32} round />
                                            </FacebookShareButton>
                                            <InstagramShareButton />
                                        </div>
                                        <DialogFooter className="flex justify-end">
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                    Close
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <button className="flex justify-center items-center bg-[#606060] hover:bg-[#404040] rounded-lg p-2"
                                    onClick={() => {
                                        console.log('User to Edit:', user);
                                        setEditingUser(user);
                                    }}
                                >
                                    <Image src="/icons/edit.svg" alt="Logo" width={24} height={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

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
        </div >
    );
};

export default Leaderboard;
