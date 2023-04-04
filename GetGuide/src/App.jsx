import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import './App.css'
import Header from './Components/Header';
import Home from './Pages/HomePage';
import Chat from './Pages/Chat';
const route = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
    children: [
       {
        path:'/',
        element:<Home/>
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
