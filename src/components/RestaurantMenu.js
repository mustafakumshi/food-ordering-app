import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import Shimmer from "./Shimmer";
import { useState } from "react";

const RestaurantMenu = () => {

  const {resId} = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex, setShowIndex] = useState(0);


  if (resInfo === null) return <Shimmer/>;

  const RestaurantInfo = resInfo?.cards.find(card => card?.card?.card?.info)?.card.card.info;

  const {name, avgRatingString, totalRatingsString, costForTwoMessage, cuisines, areaName, feeDetails} = RestaurantInfo;

  const startIndex = feeDetails?.message?.indexOf("<b>") + 3; // Index after "<b>"
  const endIndex = feeDetails?.message?.indexOf("</b>");

  const distance = feeDetails?.message?.substring(startIndex, endIndex); // "21.7 kms"

  const feeIndex = feeDetails?.message?.indexOf(" | ") + 3; // Index after " | "
  const fee = feeDetails?.message?.substring(feeIndex); // "₹262 Delivery fee will be deducted"


  const categories = resInfo?.cards.find(card => card?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(card => card?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");


  return (
    <div className="resmenu-container px-4">
      <div className="restaurant-info text-center">
      <h1 className="font-bold text-4xl">{name}</h1>
      <p><span>{avgRatingString}</span><span>   ({totalRatingsString})</span><span>   {costForTwoMessage}</span></p>
      <p className="cuisines">{cuisines.join(", ")}</p>
      <p><span><b>Outlet</b></span><span>   {areaName}</span></p>
      <p><b>{distance}</b> | {fee}</p>
      <h2 className="font-bold text-lg">Restaurant Menu</h2>
      </div>

      {categories.map((category, index) => <RestaurantCategory key={category.card.card.title} data={category.card.card}                  showItems = {index === showIndex && true} index={index} setShowIndex={()=>setShowIndex(index)} hideActive={()=>setShowIndex(null)}/>)}

    </div>
  )
}

export default RestaurantMenu;


