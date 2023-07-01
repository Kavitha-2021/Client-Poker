import { useNavigate } from 'react-router-dom'
import '../authentication/Login.css'
import { Formik, Form, Field, ErrorMessage } from "formik";
import '../authentication/Login.css'
import './Newgame.css'
import { socket } from '../../socket'

export default function Coins() {
    const user = JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).username ?
    JSON.parse(localStorage.getItem('user')).username : null
    
    const navigate = useNavigate()

    const goGame = () => {
        navigate('/game')
    }
    return (
        <div className='login-div'> 
            <Formik 
            initialValues={{coins: 0}}
            validate={(values) => {
               const errors = {};

               if(!values.coins)
               errors.coins = '*Required'

               return errors;

            }}
            onSubmit={(values, {setSubmitting}) => {
                localStorage.setItem('coins', JSON.stringify(values.coins))
                socket.emit('create-room', localStorage.getItem('roomId'), user)
                goGame();
                setSubmitting(false);
            }}
            >
                <Form className='login-form'>
                <label className='login-name'>POKER 
                <label style={{color: 'red'}} className='login-name'> NEW GAME</label>
                </label> 
                <label className='coin-label' htmlFor='coins'>Enter Coin Value</label>
                <Field
                id="coins"
                className="login-input"
                type="number"
                name="coins"
                // placeholder="Enter Coin Value"
                />
                <ErrorMessage
                className="error"
                style={{ top: "66%" }}
                name="coins"
                component="span"
                />
                <button  type="submit" className='login-btn'>Join Game</button>
                </Form>
            </Formik>
        </div>
    )
}