import React from 'react'
import { useSelector } from 'react-redux'
import Entrance from '../pages/Entrance'
import Question from '../pages/Question'
const Main = () => {
    const {loggedIn} = useSelector(state=>state.auth)
    return (
      <div>
        {loggedIn ? <Question /> : <Entrance />}
      </div>
    )
  }
  
  export default Main