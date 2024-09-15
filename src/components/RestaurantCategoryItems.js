import { RES_MENU_IMG } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../utils/cartSlice";

const RestaurantCategoryItems = ({ items }) => {

    const dispatch = useDispatch();

    const handleAddClick = (item) => {
        dispatch(addToCart(item));
    }

    return (
        <div className="menu-accordion-body flex flex-col gap-5">
            {items.map(item => {

                const { id, name, description, imageId, defaultPrice, finalPrice, price } = item?.card?.info;

                return (<div key={id} data-testid="resItem" className="flex justify-between gap-4 w-[650px] border border-black p-2 bg-white">
                    <div className="text-container w-8/12">
                        <h4 className="font-bold text-xl">{name}</h4>
                        <h4 className="font-bold"><span className="price line-through text-gray-400 font-normal">{(finalPrice ? "₹" : "") + (finalPrice ? defaultPrice / 100 || price / 100 : "")}</span><span className="final-price">   {"₹" + (!finalPrice ? defaultPrice || price : finalPrice) / 100}</span></h4>
                        <p>{description}</p>
                    </div>
                    <div className="image-container w-4/12 flex relative">
                        <button onClick={() => handleAddClick(item)} className="absolute bg-black text-white p-2 px-4 rounded-xl top-3/4 left-1/2 -translate-x-2/4">ADD +</button>
                        <img src={RES_MENU_IMG + imageId} alt={name} />
                    </div>
                </div>)
            })}
        </div>
    )
}

export default RestaurantCategoryItems
