import { useNavigate } from 'react-router-dom'
import '../authentication/Login.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import '../authentication/Login.css'
import { socket } from '../../socket'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import {  assignSeats } from '../../store/store'

export default function Newgame() {
    const user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username ?
    JSON.parse(localStorage.getItem('user')).username : null

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        socket.on('waiting-room', () => {
            alert('Connecting...')
        })

        socket.on('invalid-room', () => {
            alert('Invalid Room')
        })

        socket.on('admin-disconnected', () => {
            alert('admin disconnected')
        })

        socket.on('granted', (coins, roomId, seats) => {
            localStorage.setItem('coins', coins)
            localStorage.setItem('roomId', roomId)
            dispatch(assignSeats(seats))
            socket.emit('granted-join', (roomId))
            navigate('/game')
        })

        socket.on('denied', () => {
            alert('UnAuthorized')
        })

        socket.on('already-started', () => {
            alert('Game already started cannot join inbetween')
        })
    }, [navigate, dispatch])

    return (
        <div className='login-div'> 
            <Formik 
            initialValues={{gameid: ''}}
            validate={(values) => {
               const errors = {};

               if(!values.gameid)
               errors.gameid = '*Required'

               return errors;

            }}
            onSubmit={(values, {setSubmitting}) => {
                socket.emit('join-room', values.gameid, user)
                setSubmitting(false);
            }}
            >
                <Form className='login-form'>
                <label className='login-name'>POKER 
                <label style={{color: 'red'}} className='login-name'> NEW GAME</label>
                </label> 
                <Field
                className="login-input"
                type="text"
                name="gameid"
                placeholder="Game Id"
                />
                <ErrorMessage
                className="error"
                style={{ top: "60%" }}
                name="gameid"
                component="span"
                />
                <button  type="submit" className='login-btn'>Join Game</button>
                </Form>
            </Formik>
        </div>
        // <div className='login-div'>
        //     <form name='newgameform' className='login-form'>
        //     <label className='login-name'>POKER 
        //         <label style={{color: 'red'}} className='login-name'> NEW GAME</label>
        //         </label>
        //         <label htmlFor='newgame' className='login-input-label'>Your NickName</label>
        //         <input id='newgame' className='login-input' type='text' />
        //         <button className='login-btn' onClick={(e) => { e.preventDefault(); goGame() }}>Create Game</button>
        //     </form>
        // </div>
    )
}