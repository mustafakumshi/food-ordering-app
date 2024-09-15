import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../utils/cartSlice";
import { RES_MENU_IMG } from "../utils/constants";

const Cart = () => {

    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const handleAddClick = (item) => {
        dispatch(removeFromCart(item))
    }

    const handleClearClick = () => {
        dispatch(clearCart())
    }

    return (
        <div className="flex items-center flex-col gap-5">
            <h1 className="font-bold text-3xl mt-6">Cart</h1>
            <button onClick={handleClearClick} className="p-2 bg-black text-white rounded-lg">Clear Cart</button>

            {cartItems.length === 0  && <div>Add Items to Cart !!!</div>}
            {cartItems.map(item => {
                const { id, name, description, imageId, defaultPrice, finalPrice, price } = item?.card?.info;

                return (<div data-testid= "cartItem" key={id} className="flex justify-between gap-4 w-[650px] border border-black p-2 bg-white">
                    <div className="text-container w-8/12">
                        <h4 className="font-bold text-xl">{name}</h4>
                        <h4 className="font-bold"><span className="price line-through text-gray-400 font-normal">{(finalPrice ? "₹" : "") + (finalPrice ? defaultPrice / 100 || price / 100 : "")}</span><span className="final-price">   {"₹" + (!finalPrice ? defaultPrice || price : finalPrice) / 100}</span></h4>
                        <p>{description}</p>
                    </div>
                    <div className="image-container w-4/12 flex relative">
                        <button onClick={() => handleAddClick(item)} className="absolute bg-black text-white p-2 px-4 rounded-xl top-3/4 left-1/2 -translate-x-2/4">Remove -</button>
                        <img src={RES_MENU_IMG + imageId} alt={name} />
                    </div>
                </div>)
            })}
        </div>
    );
}

export default Cart;