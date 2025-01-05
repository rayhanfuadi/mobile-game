import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: string
    nama: string
    skor: number
    url_foto: string
}

interface leaderboardState {
    users: User[],
    filter: string,
    sort: 'asc' | 'desc',
}

const initialState: leaderboardState = {
    users: [],
    filter: '',
    sort: 'desc'
}

const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload;
        },
        setFilter(state, action: PayloadAction<string>) {
            state.filter = action.payload
        },
        setSort(state, action: PayloadAction<'asc' | 'desc'>) {
            state.sort = action.payload
        },
        updateUser(state, action: PayloadAction<User>) {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
    }
})

export const { setUsers, setFilter, setSort, updateUser } = leaderboardSlice.actions
export default leaderboardSlice.reducer