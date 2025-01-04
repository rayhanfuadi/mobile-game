import { setFilter, setPlayers, setSort } from "@/redux/leaderboardSlice"
import { appDispatch, RootState } from "@/redux/store"
import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import PlayerCard from "./PlayerCard"


const Leaderboard: React.FC = () => {
    const dispatch: appDispatch = useDispatch()
    const { players, filter, sort } = useSelector((state: RootState) => state.leaderboard)

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await axios.get('https://677118a42ffbd37a63ce2fcc.mockapi.io/users')
            dispatch(setPlayers(response.data))
        }
        fetchPlayers()
    }, [dispatch])

    const filteredPlayers = players
        .filter((player) => player.nama.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => (sort === 'desc') ? b.skor - a.skor : a.skor - b.skor)
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border p-2 rounded"
                    onChange={(e) => dispatch(setFilter(e.target.value))}
                />
                <select
                    className="border p-2 rounded"
                    onChange={(e) => dispatch(setSort(e.target.value as 'asc' | 'desc'))}
                >
                    <option value="desc">Sort by Score: High to Low</option>
                    <option value="asc">Sort by Score: Low to High</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPlayers.map((player) => (
                    <PlayerCard key={player.id} player={player} />
                ))}
            </div>
        </div>
    )
}

export default Leaderboard