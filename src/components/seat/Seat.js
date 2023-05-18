import './Seat.css';

export default function Seat() {
    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{position: 'relative'}}>
                <div className='card-1'>❤</div>
                <div className='card-2'>🔶</div>
            </div>
            <label className='chips' >$1000</label>
            <label className='username'>username</label>
        </div>
    )
}