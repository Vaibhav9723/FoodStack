import './PlaceOrder.css'
import { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../components/Context/StoreContext'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


const PlaceOrder = () => {

    const {getTotalCartAmount,token,url,cartItems,food_list} = useContext(StoreContext)

    const [data,setData] = useState({
      firstname:"",
      lastname:"",
      email:"",
      street:"",
      city:"",
      state:"",
      zipcode:"",
      country:"",
      phone:""
    })

    const onChangeHandler = (event) =>{
      const name = event.target.name
      const value = event.target.value
      setData(data=>({...data,[name]:value}))
    }

    const placeOrder = async (e) =>{
      e.preventDefault();
      let orderItems = [];
      food_list.map((item)=>{
        if(cartItems[item._id]>0)
        {
          let itemInfo = item;
          itemInfo["quantity"] = cartItems[item._id]
          orderItems.push(itemInfo)
        }})

        let orderData = {
          address:data,
          items:orderItems,
          amount:getTotalCartAmount()+50,
        }        

        let responce = await axios.post(url+"/api/order/place",orderData,{headers:{token}});

        if(responce.data.success)
        {
          const {session_url} = responce.data;
          window.location.replace(session_url)
        }
        else{
          alert("Error")
        }
      
    }

    const navigate = useNavigate();

    useEffect(()=>{
      if(!token)
      {
        navigate('/cart')
      }
      else if(getTotalCartAmount()===0)
      {
        navigate('/cart')
      }
    },[token])

  return (
    <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className='title'>Delivery Information</p>
        <div className="multi-fields">
          <input type="text" name='firstname' onChange={onChangeHandler} value={data.firstname}  placeholder='First Name'  required/>
          <input type="text" name='lastname' onChange={onChangeHandler} value={data.lastname} placeholder='Last Name'  required/>
        </div>
        <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email Address' required/>
        <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street'  required/>
        <div className="multi-fields">
          <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City'  required/>
          <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State'  required/>
        </div>
        <div className="multi-fields">
          <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode}  placeholder='Zip Code'  required/>
          <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country'  required/>
        </div>
        <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone'  required/>
      </div>
      <div className="place-order-right">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>&#x20B9; {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>&#x20B9; {getTotalCartAmount()===0?0:50}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <h4>Total</h4>
                <p>&#x20B9; {getTotalCartAmount()===0?0:getTotalCartAmount()+50}</p>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
      </div>
    </form>
  )
}

export default PlaceOrder
