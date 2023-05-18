import { useNavigate } from 'react-router-dom'
import './Login.css'

export default function Login() {

    const navigate = useNavigate();
    const goNewgame = () => {
        navigate('/newgame')
    }
    
    return (
        <div className='login-div'>
            <form name='loginForm' className='login-form'>
                <label className='login-name'>LOGIN 
                <label style={{color: 'red'}} className='login-name'> POKER</label>
                </label>
                <label htmlFor='login-input' className='login-input-label'>Login with your Email</label>
                <input id='login-input' className='login-input' type="text" />
                <button onClick={(e) => {e.preventDefault(); goNewgame() }} className='login-btn'>Send me the Login Code</button>
            </form>
        </div>
    )
}   