import Seat from '../seat/Seat'
import TableCard from '../seat/TableCard'
import React, { useState, useEffect} from 'react'
//eslint-disable-next-line
import store, {  addWaiting, setlastAction,  clearSeats, clearWaiting, assignSeats, setCards, setThreeCard, clearWinner, setWinner, setFourCard, setFiveCard, clearTableCard, clearCards} from '../../store/store'
import './Gamescreen.css'
import '../seat/Seat.css'
import { socket } from '../../socket'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import rank from '../rank'

export default function Gamescreen() {
    const card1 = useSelector(state => state.commoncard1)
    const card2 = useSelector(state => state.commoncard2)
    const card3 = useSelector(state => state.commoncard3)
    const card4 = useSelector(state => state.commoncard4)
    const card5 = useSelector(state => state.commoncard5)

    const isAdmin = localStorage.getItem('admin')
    const coins = localStorage.getItem('coins') ? localStorage.getItem('coins') : null
    const user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username ?
    JSON.parse(localStorage.getItem('user')).username : null
    
    const roomId = localStorage.getItem('roomId')
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const waiters = useSelector(state => state.waitingList)
    const store_seat = useSelector(state => state.seats)
    const myseat = store_seat.filter(e => e.name === user)
    const winner = useSelector(state => state.winner)

    const [seat, setSeat] = useState('')
    const [selectseat, setSelectSeat] = useState([])
    const [pot, setPot] = useState(0)
    const [chance, setChance] = useState('')
    const [callcheck, setCallcheck] = useState('')
    const [p_raise, setPraise] = useState(false)
    const [raise, setRaise] = useState(0)
    const [hideStart, sethideStart] = useState(false)
    const [deal, setDeal] = useState(false)
    const [iwon, setiwon] = useState(false)
    const [dealer, setDealer] = useState('')
    const [action, setAction] = useState({})
    const [winpot, setWinpot] = useState(0)

    useEffect(() => {
        socket.on('player-waiting', (user) => {
            if(!waiters.includes(user))
            dispatch(addWaiting(user))
        })

        socket.on('locked-seats', (seats) => {
            dispatch(assignSeats(seats))
        })

        socket.on('game-started', () => {
            // console.log('Game Started')
        })

        socket.on('dealer', (name) => {
            setDealer(name)
        })

        socket.on('big-blind', (name) => {
            setTimeout(() => {
                if(dealer === user)
                socket.emit('after-bigblind', roomId)
            }, 2000)
        })

        socket.on('small-blind', (name) => {
            // console.log('small-blind', name)
        })
        socket.on('pot-seat', (pot, seats) => {
            setPot(pot)
            dispatch(assignSeats(seats))
        })

        socket.on('two-cards', (card1, card2) => {
            dispatch(setCards({card1, card2}))
        })

        socket.on('chance', (name, action) => {
            setCallcheck(action)
            setChance(name)
        })

        socket.on('first-3-cards', (card1, card2, card3) => {
            dispatch(setThreeCard({card1, card2, card3}))
        })

        socket.on('fourth-card', (card4) => {
            dispatch(setFourCard(card4))
        })

        socket.on('fifth-card', (card5) => {
            dispatch(setFiveCard(card5))
        })

        socket.on('winner', (data, winpot) => {
            setWinpot(winpot)
            setChance('')
            dispatch(setWinner(data))
            setDeal(true)
            if(data.find(e => e.name === user)) {
                setiwon(true)
            }
            // console.log(data)
        })

        socket.on('game-over', () => {
            setChance('')
        })

        socket.on('re-match', () => {
            setWinpot(0)
            setDealer('')
            setChance('')
            dispatch(clearCards())
            dispatch(clearWinner())
            setDeal(false)
            setiwon(false)
        })

        socket.on('last-action', (data) => {
            setAction(data)
            dispatch(setlastAction(data))
        })
    }, [dispatch, waiters, myseat, pot, store_seat, user, winner, dealer, roomId])

    const selectSeat = (e) => {
        e.preventDefault();
        if(store_seat.filter(ele => ele.id === e.currentTarget.id).length === 0) {
            if(seat !== 'selected') {
                setSeat(e.currentTarget.id)
            }
        }
    }

    const handleOK = (e) => {
        e.stopPropagation();
        if(selectseat.length > 0)
        alert('Seats are already allocated for you')          
        else {
            setSelectSeat(prev => [{id: seat, nickname: user}, ...prev])
            socket.emit('seat-selected', {id: seat, nickname: user, room: roomId, coins: coins})
            setSeat('selected')
        }
    }

    const onStart = (e) => {
        e.preventDefault();
        if(store_seat.length >= 3) {
            sethideStart(true)
            socket.emit('game-started',roomId)
        } else alert('Seats are not selected 3 players required') 
    }

    const onCallcheck = (e) => {
        e.preventDefault();
        socket.emit('return-chance', callcheck, chance, 0, roomId)
    }

    const onFold = (e) => {
        e.preventDefault();
        socket.emit('return-chance', 'Fold', chance, 0, roomId)
    }

    const onRaise = (e) => {
        e.preventDefault();
        setPraise(false)
        if(parseInt(myseat[0].coins) >= raise)
        socket.emit('return-chance', 'Raise', chance, raise, roomId)
        else alert('You dont have enough Fund')
    }

    // const onContinue = (e) => {
    //     e.preventDefault();
    //     setDeal(false)
    //     setiwon(false)
    //     sethideStart(false)
    //     setSelectSeat([])
    //     setDealer('')
    //     setSeat('')
        // socket.emit('deal-again', roomId)
    //     dispatch(clearWinner())
    //     dispatch(clearCards())
    //     dispatch(clearWaiting())
    //     dispatch(clearSeats())
    //     navigate('/')
    // }

    const onDealAgain = (e) => {
        e.preventDefault();
        socket.emit('deal-again',  roomId)
    }

    const onCopy = async (e) => {
        e.preventDefault();
        var copytxt = document.getElementById('span-room').innerHTML
        await navigator.clipboard.writeText(copytxt)
    }

    return (
        <div className='game-screen-div'>
        { (waiters.length > 0 && isAdmin === "true") && <span className='span'>{waiters.length}</span> }
        { isAdmin === "true" && 
        <>
            <button className='options' onClick={(e) => {e.preventDefault(); navigate('/option')}}>OPTIONS</button>            
            { hideStart === false && <button className='options start' onClick={onStart}>START</button> }           
        </>
        }
        <label className='pot'>${pot}</label>
            <div id='1' className='seat seat-1' onClick={selectSeat}>
                {
                    (seat === '1' && seat !== 'selected') &&
                    <div className='pop-div'>
                        <button className='pop-btn' onClick={handleOK}>Select Seat</button>
                    </div>
                }
                <Seat id='1' chance={chance} dealer={dealer} action={action} left={'230px'}/>
            </div>

            <div id='2' className='seat seat-2' onClick={selectSeat}>
                {
                    (seat === '2' && seat !== 'selected') && 
                    <div className='pop-div'>
                        <button className='pop-btn'onClick={handleOK} >Select Seat</button>
                    </div>
                }
                <Seat id='2' chance={chance} dealer={dealer}  action={action} left={'230px'}/>
            </div>

            <div id='3' className='seat seat-3' onClick={selectSeat}>
                {
                    (seat === '3' && seat !== 'selected') && 
                    <div className='pop-div'>
                        <button className='pop-btn' onClick={handleOK} >Select Seat</button>
                    </div>
                }
                <Seat id='3' chance={chance} dealer={dealer}  action={action} left={'230px'}/>
            </div>

            <div id='4' className='seat seat-4' onClick={selectSeat}>
                {
                    (seat === '4' && seat !== 'selected') && 
                    <div className='pop-div'>
                        <button className='pop-btn' onClick={handleOK} >Select Seat</button>
                    </div>
                }
                <Seat  id='4' chance={chance} dealer={dealer}  action={action} left={'-50px'}/>
            </div>

            <div id='5' className='seat seat-5' onClick={selectSeat}>
                {
                    (seat === '5' && seat !== 'selected') && 
                    <div className='pop-div'>
                        <button className='pop-btn' onClick={handleOK}>Select Seat</button>
                    </div>
                }
                <Seat id='5' chance={chance} dealer={dealer}  action={action} left={'-50px'}/>
            </div>

            <div id='6' className='seat seat-6' onClick={selectSeat}>
                {
                    (seat === '6' && seat !== 'selected') && 
                    <div className='pop-div'>
                        <button className='pop-btn'onClick={handleOK}>Select Seat</button>
                    </div>
                }
                <Seat id='6' chance={chance} dealer={dealer}  action={action} left={'-50px'}/>
            </div>
            {p_raise === true && 
            <div className='pop-div' style={{position: 'fixed', bottom: '15%'}}>
                <input value={raise} className='pop-txt' type="number" placeholder='Amount' onChange={(e) => {e.preventDefault(); setRaise(e.target.value)}}/>
                <button className='pop-btn' onClick={onRaise}>Raise</button>
                <button className='pop-btn' style={{background: '#bc0909'}} onClick={(e) => {e.preventDefault(); setPraise(false)}}>Back</button>
            </div>
            }
            { chance === user && 
            <div className='fold-div'> 
            <button className='fold-call-raise' onClick={onFold}>Fold</button>
            <button className='fold-call-raise' onClick={onCallcheck}>{callcheck}</button>
            <button className='fold-call-raise' onClick={(e) => {e.preventDefault(); setPraise(true)}}>Raise</button>
            </div>
            } 
            {
                (card1 && card1.rank) && <TableCard card={card1} left={'33%'}/>
            }
            {
                (card2 && card2.rank) && <TableCard card={card2} left={'41%'}/>
            }
            {
                (card3 && card3.rank) && <TableCard card={card3} left={'49%'}/>
            }
            {
                (card4 && card4.rank) && <TableCard card={card4} left={'57%'}/>
            }
            {
                (card5 && card5.rank) && <TableCard card={card5} left={'65%'}/>
            }
            {
                (deal === true) && 
                <div className='win-lose-div'>
                { (iwon === true && winner[0] && winner[0].rank) ? 
                <>
                <label className='win-lose'>You Win ${winpot} !!</label> 
                <label className='win-lose' style={{color: "#edcb12", fontSize: '80px'}}>{rank[`${winner[0].rank}`]}</label>
                </>
                :
                <label className='win-lose'>
                    Game Over
                </label> }
                { isAdmin === "true" && <label onClick={onDealAgain} className='continue'>(Deal Again)</label>}
                </div>
            }
            {
                (isAdmin === "true" && hideStart === false) && 
                <div className='pop-room-div'>
                    <span id='span-room' className='pop-room-span'>{roomId}</span>
                    <button className='copy-btn' onClick={onCopy}>Copy</button>
                </div>
            }
        </div>
    )
}