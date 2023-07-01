import './Seat.css';
import '../gamescreen/Gamescreen.css'
import { useSelector } from 'react-redux'

import Heart from '../../images/heart-small.jpg'
import Spade from '../../images/spade-small.jpg'
import Diamond from '../../images/diamond-small.jpg'
import Clover from '../../images/clover-small.jpg'

export default function Seat({id, chance, dealer, action , left}) {

    const card1 = useSelector(state => state.usercard1)
    const card2 = useSelector(state => state.usercard2)
    // const winner = useSelector(state => state.winner)

    const img1 = card1.suit === 's' ? Spade  : card1.suit === 'h' ? Heart : card1.suit === 'd' ? Diamond : Clover
    const img2 = card2.suit === 's' ? Spade  : card2.suit === 'h' ? Heart : card2.suit === 'd' ? Diamond : Clover

    const color1 = (card1.suit === 's' || card1.suit === 'c' ) ? 'black' : 'red'
    const color2 = (card2.suit === 's' || card2.suit === 'c' ) ? 'black' : 'red'

    const user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username ?
    JSON.parse(localStorage.getItem('user')).username : null

    // const coins = localStorage.getItem('coins') ? localStorage.getItem('coins') : null
    const store_seat = useSelector(state => state.seats)
    const c_seat = store_seat.filter(e => e.id === id)[0]

    // const highlight = (winner && c_seat && c_seat.name && winner.includes(e => e.name === c_seat.name)) ? console.log(true) : console.log(false)

    var display_name = 'username'
    if(c_seat && c_seat.name) {
        if(c_seat.name === user)
        display_name = 'You'
        else display_name = c_seat.name
    }

    var display_coin = 'coins'
    if(c_seat && c_seat.coins) {
        display_coin = parseInt(c_seat.coins)
    }
    return (
        <div className={ (c_seat && c_seat.name) && (chance === c_seat.name) ? 'seat-div chance' : 'seat-div' }>
            {
                (display_name === 'You') &&
                <div style={{position: 'relative'}}>
                    { c_seat.isFold === false ? 
                    <>
                    { (card1 && card1.rank) && 
                        <div className='card-1' style={{ transform: 'rotate(342deg)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', color: color1}}>
                                {card1.rank === 14 ? 'A' : card1.rank === 13 ? 'K' : card1.rank === 12 ? 'Q' : card1.rank === 11 ? 'J' : card1.rank}
                                <img width={25} height={25} src={img1} alt='suits' />
                            </div>
                        <div className='div-center'>
                        <img width={50} height={50} src={img1} alt='suits' />
                        </div>
                        </div>
                    }
                    { (card2 && card2.rank) && 
                        <div className='card-2' style={{ transform: 'rotate(20deg)'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', color: color2}}>
                            {card2.rank === 14 ? 'A' : card2.rank === 13 ? 'K' : card2.rank === 12 ? 'Q' : card2.rank === 11 ? 'J' : card2.rank}
                                <img width={25} height={25} src={img2} alt='suits' />
                            </div>
                        <div className='div-center'>
                        <img width={50} height={50} src={img2} alt='suits' />
                        </div>
                        </div>
                    }
                    </> : 
                    <div>
                        <label className='fold'>Fold</label>
                    </div> 
                    }
                </div> 
            }
            {
                (display_name !== 'You' && display_name !== 'username') && 
                <div style={{position: 'relative'}}>
                { c_seat.isFold === false ?
                <>
                { (card1 && card1.rank) && <div className='card-1 nocard' style={{ transform: 'rotate(342deg)'}}></div>}
                { (card2 && card2.rank) && <div className='card-2 nocard' style={{ transform: 'rotate(20deg)'}}></div>}
                </> : 
                <div>
                    <label className='fold'>Fold</label>
                </div>
                }
                </div>
            } 
            <>
            <label className={display_coin === 'coins' ? 'chips nochips': 'chips'}>{display_coin}</label>
            <label className={display_name === 'username' ? 'username nousername': 'username'}>{display_name}</label>
            </>
            { (c_seat && c_seat.name === dealer) && <label className='dealer-coin'>D</label>}
            { (c_seat && c_seat.name && action && action[c_seat.name]) && <label className='pop-ups' style={{left: left}}>{action[c_seat.name]}</label> }
        </div>
    )
}
