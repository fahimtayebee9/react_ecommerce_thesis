import SignIn from "./SignIn";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import DB_PRODUCTS from "../database/products_db";
import DB_ATTRIBUTES from "../database/attributes_db";

const Cart = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [cartList, setCartList] = useState(localStorage.getItem("cartList") ? JSON.parse(localStorage.getItem("cartList")) : []);

    const calculateTotalPrice = () => {
        let total = 0;
        cartList.map(cart => {
            total += DB_PRODUCTS.filter(product => product.id === cart.product_id)[0].price * cart.quantity;
        });
        return total;
    };

    const removeItem = (key) => {
        let cart = cartList.filter(cart => cart.key !== key);
        setCartList([...cart]);
        localStorage.setItem("cartList", JSON.stringify(cart));
    };

    if (!token) {
        return <SignIn setToken={setToken} />
    }

    return (
        <div className="container mx-auto mt-10">
            <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{cartList.length} Items</h2>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Product Details</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Quantity</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Price</h3>
                        <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 text-center">Total</h3>
                    </div>
                    {
                        cartList.map((item, index) => {
                            const product = DB_PRODUCTS.filter(product => product.id === item.product_id)[0];

                            return (
                                <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5" key={product.id}>
                                    <div className="flex w-2/5"> 
                                        <div className="w-20">
                                            <img className="h-24" src={product.image} alt=""/>
                                        </div>
                                        <div className="flex flex-col justify-between ml-4 flex-grow">
                                            <span className="font-bold text-sm">{product.name}</span>
                                            <span className="text-red-500 text-xs">
                                                {DB_ATTRIBUTES.brands.filter((attribute) => Number(attribute.uid) === Number(product.brand))[0].value}
                                            </span>
                                            <button onClick={() => {removeItem(item.key)}} className="font-semibold hover:text-red-500 text-gray-500 text-xs text-left">Remove</button>
                                        </div>
                                    </div>
                                    <div className="flex justify-center w-1/5">
                                        <input className="mx-2 border text-center w-14" type="number" defaultValue={item.quantity}/>
                                    </div>
                                    <span className="text-center w-1/5 font-semibold text-sm">BDT. {product.price}</span>
                                    <span className="text-center w-1/5 font-semibold text-sm">BDT. {product.price * item.quantity}</span>
                                </div>
                            )
                        })
                    }
                    

                    <Link to="/" className="flex font-semibold text-indigo-600 text-sm mt-10">
                        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512"><path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" /></svg>
                        Continue Shopping
                    </Link>
                </div>

                <div id="summary" className="w-1/4 px-8 py-10">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items {cartList.length}</span>
                        <span className="font-semibold text-sm">
                            BDT. { calculateTotalPrice() }
                        </span>
                    </div>
                    <div>
                        <label className="font-medium inline-block mb-3 text-sm uppercase block">Shipping</label><br />
                        <p className="font-small inline-block mb-3 text-sm uppercase">Cash On Delivery</p>
                    </div>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                            <span>Total cost</span>
                            <span>BDT. { calculateTotalPrice() }</span>
                        </div>
                        <Link to="/checkout" className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full block text-center">Checkout</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Cart;