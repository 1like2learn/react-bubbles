import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const defaultCredentials = {
  username: '',
  password: '',
  
};

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ credentials, setCredentials ] = useState(defaultCredentials);
  const history = useHistory()

  const changeHandler = event => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value
    })
  };
  const onSubmit = event => {
    event.preventDefault()
    axios.post('http://localhost:5000/api/login', {
      username: 'Lambda School',
      password: 'i<3Lambd4'
    })
    .then(response => {
      localStorage.setItem('token', response.data.payload)
      history.push("/protected/bubblePage")
    })
    .catch(response => {
      console.log('response', response);
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={onSubmit}>
        <label>
          <input 
            name='username'
            type='username'
            value={credentials.username}
            onChange={changeHandler}
          />
        </label>
        <label>
          <input 
            name='password'
            type='password'
            value={credentials.password}
            onChange={changeHandler}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
