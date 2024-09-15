import { RES_MENU_API } from "../utils/constants";
import { useState, useEffect } from "react";

const useRestaurantMenu = (resId) => {

    const [originalResList, setOriginalResList] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(RES_MENU_API + resId);
        const json = await data.json();
        const resData = json.data;
        setOriginalResList(resData);

    }

    return originalResList;

}

export default useRestaurantMenu;
