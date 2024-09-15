import Shimmer from "./Shimmer";
import RestaurantCard, { RestaurantWithFastDelivery } from "./RestaurantCard";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Body = () => {

  const [originalList, setOriginalList] = useState([]);
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  const { loggedInUser, setUserName } = useContext(UserContext);

  const RestaurantCardWithFastDelivery = RestaurantWithFastDelivery(RestaurantCard);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.24747&lng=73.14170&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

    const json = await data.json();

    const restaurantsList = json?.data?.cards.find(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setListOfRestaurants(restaurantsList);
    setOriginalList(restaurantsList);
  }

  // const fetchData = async () => {
  //   try{
  //     const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.24747&lng=73.14170&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

  //     const json = await data.json();

  //     console.log(json);
  //     const restaurantsList = json?.data?.cards.find(card => card?.card?.card?.gridElements?.infoWithStyle?.restaurants)?.card?.card?.gridElements?.infoWithStyle?.restaurants;
  //     console.log(restaurantsList);
  //     setListOfRestaurants(restaurantsList);
  //     setOriginalList(restaurantsList);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // Handle error: log it, show a user-friendly message, etc.
  //     // For example, you could set an empty list:
  //     setListOfRestaurants([]);
  //     setOriginalList([]);
  //   }
  // }

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) return <h1>Opps! you are offline, Pappa ko bolo recharge karvaye !!!</h1>;

  return originalList.length === 0 ? <Shimmer /> : (
    <div className='body px-10'>
      <div className='filter flex items-center gap-6'>
        <div className="search py-4 flex gap-2">
          <input type="text" className="search-box border border-black rounded p-2" onChange={(e) => setSearchText(e.target.value)} value={searchText} data-testid="searchInput" />
          <button className="border p-2 bg-green-200 rounded-md text-white hover:border-black hover:text-black" onClick={() => {
            const filteredRes = originalList.filter(res => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
            setListOfRestaurants(filteredRes);
          }}>Search</button>
        </div>


        <button onClick={() => {
          const filteredList = originalList.filter(res => res.info.avgRating > 4);
          setListOfRestaurants(filteredList);
        }} className="filter-btn border h-fit p-2 bg-blue-300 rounded-md text-white hover:border-black hover:text-black">Top Rated Restaurants</button>


        <button onClick={() => {
          setListOfRestaurants(originalList);
        }} className="filter-btn border h-fit p-2 bg-blue-300 rounded-md text-white hover:border-black hover:text-black">Reset Restaurants</button>

        
        <div className="search py-4 flex gap-2 items-center">
          <label>UserName : </label>
          <input className="border border-black p-2 rounded" value={loggedInUser} onChange={(e) => setUserName(e.target.value)} />
        </div>
      </div>
      <div className='res-container flex flex-wrap gap-4'>
        {listOfRestaurants.map(restaurant => <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
          {restaurant.info.sla.deliveryTime < 31 ? <RestaurantCardWithFastDelivery resData={restaurant} /> : <RestaurantCard resData={restaurant} />}
        </Link>)}
      </div>
    </div>
  )
}

export default Body;