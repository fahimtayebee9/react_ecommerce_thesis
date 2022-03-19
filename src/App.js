import "./../node_modules/tailwindcss/base.css";
import "./../node_modules/tailwindcss/components.css";
import "./../node_modules/tailwindcss/utilities.css";
import React from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Categories from "./components/Categories";
import AuthenticationSignIn from "./components/AuthenticationSignIn";
import ProductsList from "./components/ProductsList";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<Categories />} />
            <Route
              path="login"
              element={<AuthenticationSignIn />}
            />
            <Route
              path="products-list"
              element={<ProductsList />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
