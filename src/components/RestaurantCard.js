import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla, areaName } = resData?.info;

  const {loggedInUser} = useContext(UserContext)

  return (
    <div data-testid= "resCard" className='res-card bg-gray-100 w-56 border border-black p-2 h-full rounded-lg hover:bg-gray-200'>
      <img className='res-logo aspect-[11/13] rounded' src={CDN_URL + cloudinaryImageId} alt="res-logo" />
      <h3 className="font-bold">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.deliveryTime} minutes</h4>
      <h4>{areaName}</h4>
      <h4 className="font-bold">User : {loggedInUser}</h4>
    </div>
  )
}

export const RestaurantWithFastDelivery = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="h-full">
        <label className="absolute px-4 m-4 bg-black text-white rounded-full">Fast Delivery</label>
        <RestaurantCard {...props}/>
      </div>
    )
  }
}

export default RestaurantCard;