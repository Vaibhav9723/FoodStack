import './Add.css';
import {assets} from '../../assets/assets';
import { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({url}) => {

  // const url = "http://localhost:4000"
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    desc:"",
    price:"",
    category:"Salad"
  })

  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler =async (e) =>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("desc",data.desc)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)

    const responce =await axios.post(`${url}/api/food/add`,formData)
    if(responce.data.success)
    {
      setData({
        name:"",
        desc:"",
        price:"",
        category:"Salad"
      })
      setImage(false)
      toast.success(responce.data.message)
    }else{
      toast.error(responce.data.message)
    }
    


  }

  return (
    <div className='add'>
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" 
            id='image' 
            hidden 
            required />
        </div> 
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input type="text" onChange={onChangeHandler} value={data.name} name='name' placeholder='Type here' />
        </div>
        <div className="add-product-desc flex-col">
          <p>Product Description</p>
          <textarea name="desc" onChange={onChangeHandler} value={data.desc} rows="6" placeholder='Write Content Here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name='category'>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input type="Number" onChange={onChangeHandler} value={data.price} name='price' placeholder=' 20'/>
          </div>
        </div>
        <button type='Submit' className='add-btn'>ADD</button>
      </form>
    </div>
  )
}

export default Add
