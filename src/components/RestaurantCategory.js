import { useState } from "react";
import RestaurantCategoryItems from "./RestaurantCategoryItems";

const RestaurantCategory = ({ data, showItems, setShowIndex, hideActive}) => {

    // const [showItems, setShowItems] = useState(false);

    const handleAccordionClick = () => {
        !showItems ? setShowIndex() : hideActive();
    }

    return (
        <div className="menu-accordion w-[650px] mx-auto shadow-lg bg-blue-50">
            <div className="menu-accordion-header cursor-pointer font-bold text-xl flex justify-between p-4 my-4" onClick={handleAccordionClick}>
                <span>{data.title} ({data.itemCards.length})</span>
                <span>{!showItems ? "🔽" : "🔼"}</span>
            </div>

            {showItems && <RestaurantCategoryItems items={data.itemCards}/>}
        </div>
    )
}

export default RestaurantCategory;