import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { socket } from '../../socket'
import { removeWaiting } from '../../store/store'

import './Gamescreen.css'

export default function Options() {
    const coins = localStorage.getItem('coins')
    const roomId = localStorage.getItem('roomId')
    const waiters = useSelector(state => state.waitingList)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const allowName = (name) => {
        dispatch(removeWaiting(name))
        socket.emit('allow-player', name, roomId, coins)
    }
    
    const rejectName = (name) => {
        dispatch(removeWaiting(name))
        socket.emit('reject-player', name)
    }
    return (
        <>
        <button className='options' style={{boxShadow: '0 0 10px black', background: 'red'}} onClick={(e) => {e.preventDefault(); navigate(-1)}}>Back</button>
        <div className='table-div'>
            <table className='table'>
                <thead>
                <tr>
                    <th className='th' colSpan={3}>Players</th>
                </tr>
                </thead>
                <tbody style={{display: 'inline-table', width: '100%'}}>
                {
                    (waiters && waiters.length > 0) && 
                    waiters.map((name, key) => {
                        return (
                            <tr key={key}>
                                <td className='name-player'>{name}</td>
                                <td style={{textAlign: 'center', borderBottom: '1px solid black'}}><button onClick={() => allowName(name)} className='allow'>Allow</button></td>
                                <td style={{textAlign: 'center', borderBottom: '1px solid black'}}><button onClick={() => rejectName(name)} style={{ background: 'red', color: 'white'}} className='allow'>Reject</button></td>
                            </tr>
                        )
                    })
                }
                {
                    waiters.length === 0 && <tr><td style={{textAlign: 'center', color: 'white', fontStyle: 'italic'}} colSpan={3}>No Player found</td></tr>
                }
                </tbody>
            </table>
        </div>
        </>
    )
}