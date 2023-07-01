import { useNavigate } from 'react-router-dom'
import './Layout.css'
import Profile from '../../images/profile.webp'
import { socket } from '../../socket'
import { clearWaiting, clearSeats, clearCards } from '../../store/store'
import { useDispatch } from 'react-redux'

export default function Layout() {
    const user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')) ?
    JSON.parse(localStorage.getItem('user')).firstname : null

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const goHome = () => {
        navigate('/')
    }

    const logout = () => {
        socket.disconnect();
        localStorage.clear('user')
        dispatch(clearWaiting())
        dispatch(clearSeats())
        dispatch(clearCards())
        navigate('/')
    }

    return (
        <div className="layout-div">
            <div className='lay-div-div'>
            <div onClick={goHome}>
                <label className='logo-name'>
                    <label style={{color: 'black', fontSize: '25px'}} className='logo'>DEVIL-FISH</label>
                    <label style={{color: 'white', fontSize: '40px', textShadow: '0 0 10px black'}} className='logo'>POKER</label>
                </label>
            </div>
            {/* <div className='layout-label'>
            {
                user && <div>OPTIONS</div>
            }   
            </div> */}
            <div className='layout-label'>
            {
                user && <div onClick={logout}>LOGOUT</div>
            }
            </div>
            <div className='layout-label' >

            </div>
            <div className='layout-label'>
                
            </div>
            <div className='layout-label'>
                
            </div>
            <div className='layout-label'>
                
            </div>
            </div>
            <div id='profile-outer-div'> 
            {
                !user && <img src={Profile} alt='profile' id='profile-img'/>
            }
            {
                user && <div className='avatar'>{user.charAt(0).toUpperCase() }</div>
            }  
            </div>
        </div>
    )
}