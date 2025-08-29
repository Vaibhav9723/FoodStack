import { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {

    // const url = "http://localhost:4000"
    const [list,setList] = useState([]);

    const fetchList = async () =>{
        const responce = await axios.get(`${url}/api/food/list`)
        console.log(responce.data.data)
        if(responce.data.success)
        {
            setList(responce.data.data)
        }
        else{
            toast.error(responce.message)
        }
    }

    const removeFood = async (foodId) =>{
        console.log("Deleting ID:", foodId);
        const responce = await axios.post(`${url}/api/food/remove`,{id:foodId},{
            headers: {
                'Content-Type': 'application/json'
            }
        })
        await fetchList();
        if(responce.data.success)
        {
            toast.success(responce.data.message)
        }
        else
        {
            toast.error(responce.data.message)
        }
    }

    useEffect(()=>{
        fetchList();
    },[])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
            return(
            <div className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p> {item.name} </p>
                <p> {item.category} </p>
                <p>₹{item.price} </p>
                <p onClick={()=>removeFood(item._id)} className='cursur'> X </p>
            </div>
            )
         })}
      </div>
    </div>
  )
}

export default List
