import { configureStore, createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username ?
JSON.parse(localStorage.getItem('user')).username : null

export const seatSlice = createSlice({
    name: 'seat',
    initialState: {
        winner: [],
        seats: [],
        waitingList: [],
        usercard1: {},
        usercard2: {},
        commoncard1: {},
        commoncard2: {},
        commoncard3: {},
        commoncard4: {},
        commoncard5: {},
        lastAction: {},
    },
    reducers: {
        setlastAction: (state, actions) => {
            state.lastAction = actions.payload
        },
        setSeats: (state, actions) => {
            state.seats.push(actions.payload)
        },
        addWaiting: (state, actions) => {
            if(!state.waitingList.includes(actions.payload))
            state.waitingList.push(actions.payload)
        },
        removeWaiting: (state, actions) => {
            var index = state.waitingList.findIndex(e => e === actions.payload)
            state.waitingList.splice(index, 1)
        },
        clearWaiting: (state) => {
            state.waitingList = []
        },
        assignSeats: (state, actions) => {
            state.seats = actions.payload
        },
        clearSeats: (state, actions) => {
            state.seats = []
        }, 
        decreaseSeats: (state, actions) => {
            var idx = state.seats.findIndex(e => e.name === user)
            state.seats[idx].coins -= actions.payload.value
        },
        setCards: (state, actions) => {
            state.usercard1 = actions.payload.card1
            state.usercard2 = actions.payload.card2
        },
        setThreeCard: (state, actions) => {
            state.commoncard1 = actions.payload.card1
            state.commoncard2 = actions.payload.card2
            state.commoncard3 = actions.payload.card3
        },
        setFourCard: (state, actions) => {
            state.commoncard4 = actions.payload
        },
        setFiveCard: (state, actions) => {
            state.commoncard5 = actions.payload
        }, 
        clearCards: (state, actions) =>{
            state.usercard1 = {}
            state.usercard2 = {}
            state.commoncard1 = {}
            state.commoncard2 = {}
            state.commoncard3 = {}
            state.commoncard4 = {}
            state.commoncard5 = {}
        },
        clearTableCard: (state, actions) => {
            state.commoncard1 = {}
            state.commoncard2 = {}
            state.commoncard3 = {}
            state.commoncard4 = {}
            state.commoncard5 = {}
        },
        setWinner: (state, actions) => {
            state.winner = actions.payload
        },
        clearWinner: (state, actions) => {
            state.winner = []
        }
    }
})

export const { setSeats, setlastAction, addWaiting,setWinner, clearWinner, removeWaiting, clearTableCard, clearWaiting, assignSeats, clearSeats, decreaseSeats, setCards, setThreeCard, setFourCard, setFiveCard, clearCards} = seatSlice.actions

const store = configureStore({reducer: seatSlice.reducer})

export default store