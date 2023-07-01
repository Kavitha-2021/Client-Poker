import '../gamescreen/Gamescreen.css'
import './Seat.css'

import Heart from '../../images/heart-small.jpg'
import Spade from '../../images/spade-small.jpg'
import Diamond from '../../images/diamond-small.jpg'
import Clover from '../../images/clover-small.jpg'

export default function TableCard({card, left}) {

    const color = (card.suit === 's' || card.suit === 'c' ) ? 'black' : 'red'
    const img = card.suit === 's' ? Spade  : card.suit === 'h' ? Heart : card.suit === 'd' ? Diamond : Clover
    return (
        <div className='card-1 common' style={{left: left}}>
            <div style={{display: 'flex', justifyContent: 'space-between', color: color, fontSize: '25px'}}>
            {card.rank === 14 ? 'A' : card.rank === 13 ? 'K' : card.rank === 12 ? 'Q' : card.rank === 11 ? 'J' : card.rank}
                <img width={30} height={30} src={img} alt='suits' />
            </div>
        <div className='div-center'>
        <img width={60} height={60} src={img} alt='suits' />
        </div>
        </div>
    )
}