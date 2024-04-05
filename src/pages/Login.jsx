// import React from 'react'

// const Login = () => {
//   return (
//     <div>
//        <div>
//         <form class="form">
//           <input class="input" type="password" id="pswd" placeholder="Password" required/>
//           <button type="submit">Log in </button>
//         </form>
//     </div>
//     </div>
//   )
// }

// export default Login


import React, { useState } from 'react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === '12345') {
      setLoginStatus('Successful');
    } else {
      setLoginStatus('Incorrect password');
    }
    setPassword('')
  };
  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="password"
          id="pswd"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
      </form>
      {loginStatus && <p>{loginStatus}</p>}
    </div>
  );
};

export default Login;
