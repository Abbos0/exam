import React from 'react'
import { useSelector } from 'react-redux'

//components
import Entrance from './pages/Entrance'
import Question from './pages/Question'
import Login from './pages/Login'
const App = () => {

  const {loggedIn} = useSelector(state=>state.auth)


  return (
    <div>
      {loggedIn ? <Question /> : <Entrance />}
      {/* <Login/> */}
      
    </div>
  )
}

export default App

