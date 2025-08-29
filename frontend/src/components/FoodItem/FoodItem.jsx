import { useContext } from 'react'
import { assets } from '../../assets/frontend_assets/assets'
import './FoodItem.css'
import { StoreContext } from '../Context/StoreContext'

const FoodItem = ({id,name,price,image,desc}) => {

  const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext)
  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img src={url+"/images/"+image} alt="" className="food-item-image" />
        {
          !cartItems[id] ? 
          <img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} />
          : <div className='food-item-counter'>
            <img onClick={()=>removeFromCart(id)}  src={assets.remove_icon_red} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
          </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
        </div>
        <div className="food-item-desc">{desc}</div>
        <div className="food-item-price">Rs.{price}</div>
      </div>
    </div>
  )
}

export default FoodItem
