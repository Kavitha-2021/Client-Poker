import { useNavigate } from 'react-router-dom'
import './Home.css'
import { v4 } from 'uuid'
import { socket } from '../../socket'

export default function Home() {    
    const user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null

    const navigate = useNavigate()

    const gonewGame = () => {
        socket.connect();
        localStorage.setItem('admin', false)
        navigate('/newgame')
    }

    const goLogin = () => {
        navigate('/login')
    }

    const gogame = () => {
        localStorage.setItem('roomId', v4())
        localStorage.setItem('admin', true)
        socket.connect()
        // socket.emit('create-room', localStorage.getItem('roomId'))
        navigate('coin')
    }

    const addGuest = () => {
        var guest = {
            firstname: 'Guest',
            username: 'Guest'+Math.floor(1000 + Math.random()*1000),
        }
        localStorage.setItem('user', JSON.stringify(guest))
        navigate('/')
    }

    return (
        <div className="home-outer-div">
            <label className='poker-text'>POKER</label>
            <div style={{display: 'flex', gap: '20px'}}>
                { !user && <button className='guest-sign' onClick={addGuest}>Guest</button>}
                { !user && <button className='guest-sign' onClick={goLogin}>Login</button>}
                { user && <button className='guest-sign' onClick={gogame}>New Game</button>}
                { user && <button className='guest-sign' onClick={gonewGame}>Join Game</button>}
            </div>
        </div>
    )
}