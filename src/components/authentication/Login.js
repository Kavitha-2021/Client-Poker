import { useNavigate } from 'react-router-dom'
import './Login.css'
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';

export default function Login() {

    const navigate = useNavigate();
    const goHome = () => {
        navigate('/')
    }

    const goSignup = () => {
        navigate('/signup')
    }
    
    return (
        <div className="login-div">
      <Formik
        initialValues={{ username: "", password: "" }}
        validate={(values) => {
          const errors = {};

          if (!values.username) {
            errors.username = "*Required";
          } else if (values.username.length < 5) {
            errors.username = "*Username should be maximum of 5 Characters";
          }

          if (!values.password) {
            errors.password = "*Required";
          } else if (values.password.length < 7) {
            errors.password = "*Password must be atleast 8 chars ";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            axios.post('http://192.168.5.20:8080/playerauth', values)
            .then(res => {
                alert(res.data.message)
                if(res.data.data.username) {
                localStorage.setItem('user', JSON.stringify(res.data.data))
                goHome();
                }
            }).catch(err => {
                console.log(err)
            })
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <label className="login-name">
              LOGIN
              <label style={{ color: "red" }} className="login-name">
                {" "}
                POKER
              </label>
            </label>
            <Field
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
            />
            <ErrorMessage
              className="error"
              style={{ top: "42%" }}
              name="username"
              component="span"
            />
            <Field
              className="login-input"
              type="password"
              name="password"
              placeholder="Password"
            />
            <ErrorMessage
              className="error"
              style={{ top: "59%" }}
              name="password"
              component="span"
            />
            <button className="login-btn" type="submit" disabled={isSubmitting}>
              Login
            </button>
            <span style={{fontSize: '20px', color: 'white'}}>New User? <span style={{color: 'red'}} onClick={goSignup}>Signup Here</span></span>
          </Form>
        )}
      </Formik>
    </div>
        // <div className='login-div'>
        //     <form name='loginForm' className='login-form'>
        //         <label className='login-name'>LOGIN 
        //         <label style={{color: 'red'}} className='login-name'> POKER</label>
        //         </label>
        //         <input id='login-user' className='login-input' type="text" placeholder='Username'/>
        //         <input id='login-password' className='login-input' type="text" placeholder='Password' />
        //         <button onClick={(e) => {e.preventDefault(); goNewgame() }} className='login-btn'>Login</button>
        //         <span style={{fontSize: '20px', color: 'white'}}>New User? <span style={{color: 'red'}} onClick={goSignup}>Signup Here</span></span>
        //     </form>
        // </div>
    )
}   