import Seat from '../seat/Seat'

import './Gamescreen.css'

export default function Gamescreen() {
    return (
        <div className='game-screen-div'>                
            <div className='seat seat-1'>
                <Seat />
            </div>

            <div className='seat seat-2'>
                <Seat />
            </div>

            <div className='seat seat-3'>
                <Seat />
            </div>

            <div className='seat seat-4'>
                <Seat />
            </div>

            <div className='seat seat-5'>
                <Seat />
            </div>

            <div className='seat seat-6'>
                <Seat />
            </div>
        </div>
    )
}