import { Player, updatePlayers } from "@/redux/leaderboardSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
    player: Player,
    onClose: () => void,
}

const EditPlayerForm: React.FC<Props> = ({ player, onClose }) => {
    const dispatch = useDispatch()
    const [nama, setNama] = useState(player.nama)
    const [skor, setSkor] = useState(player.skor)
    const [foto, setFoto] = useState(player.url_foto)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const updatedPlayer = { ...player, nama, skor, foto }
        try {
            //update api
            await axios.put(`https://677118a42ffbd37a63ce2fcc.mockapi.io/users/${player.id}`, { updatedPlayer })

            // update redux state
            dispatch(updatePlayers(updatedPlayer))

            console.dir(`Update Player: ${updatedPlayer} ✅`);
            onClose()
        } catch (error) {
            console.error(`Update Player: ${error} ❌`);
        }
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Edit Player</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <input
                            type="text"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Skor</label>
                        <input
                            type="number"
                            value={skor}
                            onChange={(e) => setSkor(Number(e.target.value))}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Avatar URL</label>
                        <input
                            type="text"
                            value={foto}
                            onChange={(e) => setFoto(e.target.value)}
                            className="border p-2 w-full rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditPlayerForm