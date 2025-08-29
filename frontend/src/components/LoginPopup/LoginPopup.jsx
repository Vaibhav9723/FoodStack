import { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'
const LoginPopup = ({setShowLogin}) => {

    const {url,setToken} = useContext(StoreContext)
    const [currState,setCurrState] = useState("Sign Up")
    const [data,setData] = useState({
      name:"",
      password:"",
      email:""
    })

    const onChangleHandler = (event) =>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event) =>{
      event.preventDefault()
      let newUrl = url;
      if(currState==="Login")
      {
        newUrl +="/api/user/login"
      }else{
        newUrl +="/api/user/register"
      }

      const response = await axios.post(newUrl,data)
      if(response.data.success)
      {
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false)
      }
      else{
        alert(response.data.message)
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs"> 
            {currState==="Login"?<></>:<input type="text" name='name' onChange={onChangleHandler} value={data.name} placeholder='Your name' required/>}

            <input type="email" name="email" onChange={onChangleHandler} value={data.email} placeholder='Your email' required/>

            <input type="password" name="password" onChange={onChangleHandler} value={data.password} placeholder='Password' required/>
        </div>
        <button type='submit'>{currState==="Sign Up"?"Create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState==="Login"?
        <p>Create a account?<span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
        :<p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login Here</span></p>}
        
        
      </form>
    </div>
  )
}

export default LoginPopup
