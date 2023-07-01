import { useNavigate } from "react-router-dom";
import "./Login.css";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };
  return (
    <div className="login-div">
      <Formik
        initialValues={{ firstname: "", username: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.firstname) {
            errors.firstname = "*Required";
          } else if (values.firstname.length <= 3) {
            errors.firstname = "*Name should be maximum of 3 Characters";
          }

          if (!values.username) {
            errors.username = "*Required";
          } else if (values.username.length <= 5) {
            errors.username = "*Username should be maximum of 5 Characters";
          }

          if (!values.password) {
            errors.password = "*Required";
          } else if (values.password < 7) {
            errors.password = "*Password must be atleast 8 chars ";//asdfghjk
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
            axios.post('http://192.168.5.20:8080/player', values)
            .then(res => {
                alert(res.data.message)
                localStorage.setItem('user', JSON.stringify(values))
                goHome();
            }).catch(err => {
                console.log(err)
            })
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="login-form">
            <label className="login-name">
              SIGNUP
              <label style={{ color: "red" }} className="login-name">
                {" "}
                POKER
              </label>
            </label>
            <Field
              className="login-input"
              type="text"
              name="firstname"
              placeholder="Enter Firstname"
            />
            <ErrorMessage
              className="error"
              style={{ top: "36%" }}
              name="firstname"
              component="span"
            />
            <Field
              className="login-input"
              type="text"
              name="username"
              placeholder="Username"
            />
            <ErrorMessage
              className="error"
              style={{ top: "51%" }}
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
              style={{ top: "65%" }}
              name="password"
              component="span"
            />
            <button className="login-btn" type="submit" disabled={isSubmitting}>
              Signup
            </button>
            <span style={{ fontSize: "20px", color: "white" }}>
              Go Back to{" "}
              <span style={{ color: "red" }} onClick={goLogin}>
                Login
              </span>
            </span>
          </Form>
        )}
      </Formik>
    </div>
    // <div className='login-div'>
    //     <form name='loginForm' className='login-form'>
    //         <label className='login-name'>SIGNUP
    //         <label style={{color: 'red'}} className='login-name'> POKER</label>
    //         </label>
    //         <input id='sign-name' className='login-input' type="text" placeholder='Enter FirstName'/>
    //         <input id='sign-user' className='login-input' type="text" placeholder='Username'/>
    //         <input id='sign-pass' className='login-input' type="text" placeholder='Password'/>
    //         <div style={{width: 'inherit', color: 'white'}}>
    //         <input id='agree' type='checkbox' value={true} style={{accentColor: 'red'}}/>
    //         <label htmlFor='agree'>I agree to the terms of service</label>
    //         </div>
    //         <button onClick={(e) => {e.preventDefault(); goNewgame()}} className='login-btn'>Signup</button>
    //         <span style={{fontSize: '20px', color: 'white'}}>Go Back to <span style={{color: 'red'}} onClick={goLogin}>Login</span></span>
    //     </form>
    // </div>
  );
}
