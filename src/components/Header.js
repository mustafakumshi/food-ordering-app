import { useState, useEffect, useContext } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {

    // console.log("Header Rendered");

    const cartItems = useSelector(state => state.cart.items);

    const [btnText, setBtnText] = useState("Login");

    const {loggedInUser} = useContext(UserContext);

    useEffect(()=>{
      // console.log("UseEffect Called");
    },[btnText])

    const onlineStatus = useOnlineStatus();

    const listStyles = 'p-4';

    return (
      <div className='header flex items-center justify-between border border-black border-solid shadow-sm'>
        <div className='logo-container w-52'>
          <img className='logo' src={LOGO_URL} />
        </div>
        <div className='nav-items'>
          <ul className="flex pr-4">
            <li className={listStyles}>Online Status : {onlineStatus ? "✅" : "🔴"}</li>
            <li className={listStyles}><Link to={"/"}>Home</Link></li>
            <li className={listStyles}><Link to={"/about"}>About Us</Link></li>
            <li className={listStyles}><Link to={"/contact"}>Contact Us</Link></li>
            <li className={listStyles}><Link to={"/grocery"}>Grocery</Link></li>
            <li className={listStyles + " font-bold"}><Link to={"/cart"}>Cart({cartItems.length})</Link></li>
            <button className={listStyles + " login"} onClick={()=> btnText === "Login" ? setBtnText("Logout") : setBtnText("Login")}>{btnText}</button>
            <li className={listStyles + " font-bold"}>{loggedInUser}</li>
          </ul>
        </div>
      </div>
    )
  }

  export default Header;