import { useState } from 'react';
import SocialShare from "./SocialShare";
import Image from "next/image";
import { Player } from "@/redux/leaderboardSlice";
import EditPlayerForm from './EditPlayersForm';

interface Props {
    player: Player
}

const PlayerCard: React.FC<Props> = ({ player }) => {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="border p-4 rounded shadow">
            <Image src={player.url_foto} alt={player.nama} width={64} height={64} className="w-16 h-16 rounded-full mx-auto" />
            <h2 className="text-center text-lg font-bold">{player.nama}</h2>
            <p className="text-center">Score: {player.skor}</p>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setIsEditing(true)}
                    className='bg-yellow-500 text-white px-4 py-2 rounded'>
                    Edit
                </button>
            </div>
            <SocialShare nama={player.nama} skor={player.skor} />
            {isEditing && <EditPlayerForm player={player} onClose={() => setIsEditing(false)} />}
        </div>
    )
}

export default PlayerCard