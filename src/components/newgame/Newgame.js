import { useNavigate } from 'react-router-dom'
import '../authentication/Login.css'

export default function Newgame() {
    const navigate = useNavigate()

    const goGame = () => {
        navigate('/game')
    }

    return (
        <div className='login-div'>
            <form name='newgameform' className='login-form'>
            <label className='login-name'>POKER 
                <label style={{color: 'red'}} className='login-name'> NEW GAME</label>
                </label>
                <label htmlFor='newgame' className='login-input-label'>Your NickName</label>
                <input id='newgame' className='login-input' type='text' />
                <button className='login-btn' onClick={(e) => { e.preventDefault(); goGame() }}>Create Game</button>
            </form>
        </div>
    )
}