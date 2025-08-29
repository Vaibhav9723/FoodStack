import { useContext, useEffect, useState } from "react"
import "./MyOrders.css"
import { StoreContext } from '../../components/Context/StoreContext'
import axios from "axios"
import {assets} from '../../assets/frontend_assets/assets'


const MyOrders = () => {

    const {token,url} = useContext(StoreContext)
    const [data,setData] = useState([])

    const fetchOrders = async () =>{
        const responce = await axios.post(url+"api/order/userorders",{},{headers:{token}})
        setData(responce.data.data)
        console.log(responce.data.data);    
        
    }

    useEffect(()=>{
        if(token)
        {
            fetchOrders();
        }
    },[token])

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
            return(
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if(index === order.items.length-1)
                        {
                            return item.name+" x "+item.quantity 
                        }
                        else{
                            return item.name+" x "+item.quantity+", "
                        }
                    })}</p>
                    <p>₹{order.amount}</p>
                    <p>Items: {order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrders}>Track Order</button>
                </div>
            )
        })}
      </div>
    </div>
  )
}

export default MyOrders
