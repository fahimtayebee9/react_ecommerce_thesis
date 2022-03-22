import "./../node_modules/tailwindcss/base.css";
import "./../node_modules/tailwindcss/components.css";
import "./../node_modules/tailwindcss/utilities.css";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import SignIn from "./components/SignIn";
import ProductsList from "./components/ProductsList";
import Layout from "./components/Layout";
import SingleCategory from "./components/SingleCategory";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
    const [cartList, setCartList] = useState(localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : []);

    const addToCart = (product) => {
        if(cartList.filter(cart => cart.product_id === product.id).length > 0){
            let cart = cartList.filter(cart => cart.product_id === product.id);
            cart[0].quantity += 1;
            setCartList([...cartList]);
        }
        else{
            setCartList([...cartList, {
                product_id: product.id,
                quantity: 1,
                key: product.id + Math.random()
            }]);
        }
        localStorage.setItem("cartList", JSON.stringify(cartList));
        console.log(localStorage.getItem("cartList"));
    };

    useEffect(() => {
        if (localStorage.getItem("alert-desc") === null && localStorage.getItem("alert-title") === null
            && localStorage.getItem("alert-type") !== null) {
            Swal.fire({
                title: localStorage.getItem("alert-title"),
                text: localStorage.getItem("alert-desc"),
                icon: localStorage.getItem("alert-type"),
                confirmButtonText: 'Ok'
            });

            const MySwal = withReactContent(Swal)

            MySwal.fire({
                title: localStorage.getItem("alert-title"),
                footer: localStorage.getItem("alert-desc"),
                didOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire(<p>Shorthand works too</p>)
            })
        }
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="categories" element={<Categories />} />
                        <Route path="login" element={<SignIn />} />
                        <Route path="products" element={<ProductsList />} />
                        <Route path="categories/:id" element={<SingleCategory />} />
                        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart}/>} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
