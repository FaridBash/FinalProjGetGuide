import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import './App.css'
import Header from './Components/Header';
import Home from './Pages/HomePage';
import Chat from './Pages/Chat';
import AdminDash from './Pages/AdminDash';
import Tours from './Pages/Tours/Tours';
import TourPage from './Pages/Tours/TourPage';
const route = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children: [
       {
        path:'/',
        element:<Home/>
      },
       {
        path:'/Dashboard',
        element:<AdminDash/>
      },
       {
        path:'/Tours',
        element:<Tours/>
      },
       {
        path:'/Tours/:id',
        element:<TourPage/>
      },
      // {
      //   path:'*',
      //   element:<NoPath/>
      // }
    ],
  },
  {
    path:"/chat",
    element:<Chat/>
  }
 
]);
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <RouterProvider router={route}/>
    </div>
  )
}

export default App
