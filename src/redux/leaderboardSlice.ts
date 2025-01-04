import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Player {
    id: number,
    nama: string,
    skor: number,
    url_foto: string,
}

interface leaderboardState {
    players: Player[],
    filter: string,
    sort: 'asc' | 'desc',
}

const initialState: leaderboardState = {
    players: [],
    filter: '',
    sort: 'desc'
}

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setPlayers(state, action: PayloadAction<Player[]>) {
            state.players = action.payload
        },
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload
        },
        setSort(state, action: PayloadAction<'asc' | 'desc'>) {
            state.sort = action.payload
        },
        updatePlayers(state, action: PayloadAction<Player>) {
            const index = state.players.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) {
                state.players[index] = action.payload
            }
        }
    }
})

export const { setPlayers, setFilter, setSort, updatePlayers } = leaderboardSlice.actions
export default leaderboardSlice.reducer