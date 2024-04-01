import React from 'react'

const Login = () => {
  return (
    <div>
       <div>
        <form class="form">
          <input class="input" type="password" id="pswd" placeholder="Password" required/>
          <button type="submit">Log in </button>
        </form>
    </div>
    </div>
  )
}

export default Login


// import React, { useState } from 'react';

// const Login = () => {
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password === '12345') {
//       // Perform the login logic here
//       console.log('Login successful');
//     } else {
//       console.log('Invalid password');
//     }
//   };

//   const handleChange = (e) => {
//     setPassword(e.target.value);
//   };

//   return (
//     <div className='bg-[red] w-[200px] h-[200px]'>
//       <form className="form" onSubmit={handleSubmit}>
//         <input
//           className="input"
//           type="password"
//           id="pswd"
//           placeholder="Password"
//           value={password}
//           onChange={handleChange}
//           required
//         />
//         <button type="submit">Log in</button>
//       </form>
//     </div>
//   );
// };

// export default Login;