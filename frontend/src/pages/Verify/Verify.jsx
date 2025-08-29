import { useContext, useEffect } from 'react';
import './Verify.css'
import {useNavigate, useSearchParams} from 'react-router-dom'
import { StoreContext } from '../../components/Context/StoreContext';
import axios from 'axios';

const Verify = () => {

    const [searchParam,setSearchParam] = useSearchParams();
    const success = searchParam.get("success")
    const orderId = searchParam.get("orderId")
    const {url} = useContext(StoreContext)
    const navigate = useNavigate()

    const verifyPayment = async (req,res) =>{
      const responce = await axios.post(url+"api/order/verify",{success,orderId})
      if(responce.data.success)
      {
        navigate("/myorders")
      }
      else{
        navigate("/")
      }
    }

    useEffect(()=>{
      verifyPayment()
    },[])
    
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
