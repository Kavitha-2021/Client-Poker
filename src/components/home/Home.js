import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home() {
    const navigate = useNavigate()

    const goLogin = () => {
        navigate('/login')
    }

    const goNewgame = () => {
        navigate('newgame')
    }

    return (
        <div className="home-outer-div">
            <button className='play-online' onClick={goNewgame}>Play Online</button>
            <div style={{display: 'flex', gap: '20px'}}>
                <button className='guest-sign' onClick={goNewgame}>Guest</button>
                <button className='guest-sign' onClick={goLogin}>Sign In</button>
            </div>
        </div>
    )
}