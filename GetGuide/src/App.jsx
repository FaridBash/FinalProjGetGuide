import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import './App.css'
import Header from './Components/Header';
import Home from './Pages/HomePage';
import Chat from './Pages/Chat';
import AdminDash from './Pages/Dashboards/AdminDash'
import Tours from './Pages/Tours/Tours';
import TourPage from './Pages/Tours/TourPage';
import ToursPerCity from './Pages/Tours/ToursPerCity';
import SignIn from './Pages/SignIn/SignIn';
import Signup from './Pages/SignUp/Signup';
import TouristDashboard from './Pages/Dashboards/UserDashBoard/TouristDashboard';
import UserOpenAuctionsPage from './Pages/Dashboards/UserDashBoard/UserOpenAuctions';
import AvailableAuctions from './Pages/Dashboards/GuideDashboard/AvilableAuctions';
import GuideDashboard from './Pages/Dashboards/GuideDashboard/GuideDashboard';
import AuctionPage from './Pages/AuctionPage/AuctionPage';
import ClosedAuctions from './Pages/AuctionPage/ClosedAuctions';
import WonAuctions from './Pages/AuctionPage/WonAuctions';
import JoinedAuctions from './Pages/AuctionPage/JoinedAuctions';
import UserClosedAuctionsPage from './Pages/Dashboards/UserDashBoard/UserClosedAuction';
import ChatPage from './Pages/Chat/ChatPage';

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
        path:'/ToursPerCity/:city',
        element:<Tours/>
      },
       {
        path:'/ToursPerCity/:city/:id',
        element:<TourPage/>
      },
       {
        path:'/ToursPerCity/',
        element:<ToursPerCity/>
      },
       {
        path:'/SignIn/',
        element:<SignIn/>
      },
       {
        path:'/SignUp/',
        element:<Signup/>
      },
       {
        path:'/Dashboard/userDashboard/',
        element:<TouristDashboard/>,
        children: [
          {
            path:'/Dashboard/userDashboard/openAuctions',
            element:<UserOpenAuctionsPage/>
          },
          {
            path:'/Dashboard/userDashboard/closedAuctions',
            element:<UserClosedAuctionsPage/>
          },
        ]
      },
       {
        path:'/Dashboard/guideDashboard/',
        element:<GuideDashboard/>,
        children: [
          {
            path:'/Dashboard/guideDashboard/Auctions',
            element:<AvailableAuctions/>
          },
          {
            path:'/Dashboard/guideDashboard/ClosedAuctions',
            element:<ClosedAuctions/>
          },
          {
            path:'/Dashboard/guideDashboard/WonTours',
            element:<WonAuctions/>
          },
          {
            path:'/Dashboard/guideDashboard/JoinedTours',
            element:<JoinedAuctions/>
          },
        ]
      },
      {
        path:'/Dashboard/guideDashboard/Auctions/:aucid',
        element:<AuctionPage/>
      },
      {
        path:'/Dashboard/guideDashboard/Chats/:aucid',
        element:<ChatPage/>
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
