import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {

    const navigate = useNavigate();
    const goGame = () => {
        navigate('game')
    }
    
    return (
        <div className='login-div'>
            <form name='loginForm' className='login-form'>
                <label className='login-name'>DEVILFISH 
                <label style={{color: 'red'}} className='login-name'> POKER</label>
                </label>
                <label htmlFor='login-input' className='login-input-label'>Login with your Email</label>
                <input id='login-input' className='login-input' type="text" />
                <button onClick={(e) => {e.preventDefault(); goGame() }} className='login-btn'>Send me the Login Code</button>
            </form>
        </div>
    )
}   