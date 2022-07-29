import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import HomePage from "./Pages/HomePage";
import Navbar from "./component/Navbar";
import Registration from "./Pages/Auth/Registration";
import Example from "./component/Example";
import { Button } from 'antd';
import ProductDetail from "./component/ProductDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Navbar/>
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Registration/>} />
      <Route path="/product/:id" element={<ProductDetail/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/checkout" element={<Checkout/>} />




    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
