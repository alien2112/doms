import React from 'react'
import Form from '../components/Form'
import Admin from './admin';
import { useState,useEffect } from 'react';
import Profile from './Profile';
import axios from "axios"; 
const Account = ({theme,setTheme}) => {
const [isSignedIn,setIsSignedIn] = useState(false)
const [user,setUser] = useState()





    return (
      isSignedIn? <Profile setIsSignedIn={setIsSignedIn} user={user} theme={theme} setTheme={setTheme} /> : <Form user={user} setUser={setUser}setIsSignedIn={setIsSignedIn} theme={theme}></Form>
   
  )
}
export default Account;

