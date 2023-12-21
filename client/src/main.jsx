import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import App from './App.jsx'
import("./style.css");
// import Navbar from './components/Navbar'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Card from './components/Card';
import Shop from './components/Shop';
import Search from './components/Search';
import OrderUsers from './components/OrderUsers';
import OrderManage from './components/OrderManage';
import ProductManage from './components/ProductManage';
const router = createBrowserRouter([
  {path: "/",element: <Home/>,},
  {path: "/login",element: <Login/>,},
  {path: "/register",element: <Register/>,},
  {path: "/card",element: <Card/>,},
  {path: "/Shop",element: <Shop/>,},
  {path: "/Search",element: <Search/>,},
  {path: "/OrderUsers",element: <OrderUsers/>,},
  {path: "/OrderManage",element: <OrderManage/>,},
  {path: "/ProductManage",element: <ProductManage/>,},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
);
