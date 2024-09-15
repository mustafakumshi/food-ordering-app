import React, { lazy, Suspense, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Contact from './components/Contact';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import Cart from './components/Cart';
import UserContext from './utils/UserContext';
import appStore from './utils/appStore';
import { Provider } from 'react-redux';


const Grocery = lazy(()=> import('./components/Grocery'));


// * not using keys (not acceptable) <<<< index as a key <<<<<<<<<< unique id (is the best  practice)

const AppLayout = () => {

  const [userName, setUserName] = useState();

  useEffect(()=>{

    const data = {
      name: "Mustafa Kumshi"
    }

    setUserName(data.name);

  },[])

  return (
    <Provider store={appStore}>
    <UserContext.Provider value={{loggedInUser : userName, setUserName}}>
    <div className='app'>
      <UserContext.Provider value={{loggedInUser : "LORD"}}>
      <Header />
      </UserContext.Provider>
      <Outlet/>
    </div>
    </UserContext.Provider>
    </Provider>
  )
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <AppLayout/>,
    children: [
      {
        path:"/",
        element: <Body/>,
      },
      {
        path:"/about",
        element: <About/>,
      },
      {
        path:"/contact",
        element: <Contact/>,
      },
      {
        path:"/grocery",
        element: <Suspense fallback={<h1>Loading...</h1>}><Grocery/></Suspense>,
      },
      {
        path:"/restaurants/:resId",
        element: <RestaurantMenu/>,
      },
      {
        path:"/cart",
        element: <Cart/>,
      },

    ],
    errorElement: <Error/>
  }
])


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>)

