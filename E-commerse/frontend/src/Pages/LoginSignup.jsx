import React, { useState } from 'react'
import './CSS/loginsignup.css'
const LoginSignup = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  })

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    console.log("Lodin executed", formData);
    let responceData;
    await fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responceData = data);
    if (responceData.success) {
      localStorage.setItem('auth-token', responceData.token);
      window.location.replace("/");
    }
    else {
      alert(responceData.errors);
    }
  }

  const signup = async () => {
    console.log("Lodin executed", formData);
    let responceData;
    await fetch('http://localhost:4000/signup', {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responceData = data);
    if (responceData.success) {
      localStorage.setItem('auth-token', responceData.token);
      window.location.replace("/");
    }
    else {
      alert(responceData.errors);
    }
  }

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Id' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>{state}</button>
        {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>LogIn</span></p> :
          <p className="loginsignup-login">Create an Account? <span onClick={() => { setState("Sign Up") }}>Sign Up</span></p>}
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
