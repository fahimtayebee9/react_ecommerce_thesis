// import {CANCEL_SVG} from './../assets/icons/cancel.svg';

import Tag from "./Tag";
import Item from "./Item";
import { useState, useEffect } from "react";
import DB_PRODUCTS from "../database/products_db";
import DB_USERS from "../database/user_db";
import DB_ATTRIBUTES from "../database/attributes_db";
import { isFocusable } from "@testing-library/user-event/dist/utils";

const ProductsList = (props) => {
    // const [filter, setFilter] = useState([]);
    const [productsList, setProductsList] = useState(DB_PRODUCTS);
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);
    const [user, setUser] = useState(DB_USERS);
    const [tags, setTags] = useState([]);

    const [filter, setFilter] = useState({
        type: "",
        size: "",
        year: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
    });

    useEffect(() => {
        filteredProducts();
    }, [filter]);

    const filteredProducts = () => {
        if (filter.type !== "") {
            const filteredProducts = productsList.filter(
                (product) => Number(product.type) === Number(filter.type)
            );
            setProductsList(filteredProducts);
        } 
        else if (filter.size !== "") {
            let filteredProducts = [];
            productsList.forEach((product) => {
                product.size.forEach((size) => {
                    if (Number(size) === Number(filter.size)) {
                        filteredProducts.push(product);
                    }
                });
            });
            setProductsList(filteredProducts);
        } 
        else if (filter.year !== "") {
            const filteredProducts = productsList.filter(
                (product) => Number(product.year) === Number(filter.year)
            );
            setProductsList(filteredProducts);
        } 
        else if (filter.brand !== "") {
            const filteredProducts = productsList.filter(
                (product) => product.brand === filter.brand
            );
            setProductsList(filteredProducts);
        }
        else if (filter.minPrice !== "" && filter.maxPrice !== "") {
            const filteredProducts = productsList.filter(
                (product) =>
                    product.price >= Number(filter.minPrice) &&
                    product.price <= Number(filter.maxPrice)
            );
            setProductsList(filteredProducts);
        }
        else if (
            filter.type !== "" &&
            filter.size !== "" &&
            filter.year !== "" &&
            filter.brand !== "" &&
            filter.minPrice !== "" &&
            filter.maxPrice !== "" 
        ) {
            const filteredProducts = productsList.filter(
                (product) =>
                    Number(product.type) === Number(filter.type) &&
                    product.size.includes(Number(filter.size)) &&
                    Number(product.year) === Number(filter.year) &&
                    Number(product.brand) === Number(filter.brand) &&
                    Number(product.price) >= Number(filter.minPrice) &&
                    Number(product.price) <= Number(filter.maxPrice) 
            );
            setProductsList(filteredProducts);
        }
        else {
            setProductsList(DB_PRODUCTS);
        }
    };

    // FILTER PRODUCTS BY SIZE
    let filterBySize = (size) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                size: size,
            };
        });
    };

    // FILTER PRODUCTS BY TYPE
    const filterByType = (type) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                type: type,
            };
        });
    };

    // // FILTER PRODUCTS BY YEAR
    let filterByYear = (year) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                year: year,
            };
        });
    };

    // // // FILTER PRODUCTS BY BRAND
    let filterByBrand = (brand) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                brand: brand,
            };
        });
    };

    // // // FILTER PRODUCTS BY SEARCH
    let filterBySearch = (search) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                search: search,
            };
        });
    };

    const filterByMinPrice = (minPrice) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                minPrice: minPrice,
            };
        });
    };

    const filterByMaxPrice = (maxPrice) => {
        setFilter((prevState) => {
            return {
                ...prevState,
                maxPrice: maxPrice,
            };
        });
    };

    // // FILTER PRODUCTS BY ALL
    // let filterByAll = () => {
    //     if (
    //         filterBrand !== null &&
    //         filterSize !== null &&
    //         filterType !== null &&
    //         filterYear !== null
    //     ) {
    //         const filteredProducts = products.filter((product) => {
    //             return (
    //                 product.brand === filterBrand &&
    //                 product.size.includes(filterSize) &&
    //                 product.type === Number(filterType) &&
    //                 product.date === filterYear
    //             );
    //         });

    //         setProductsList(filteredProducts);
    //     }
    // };

    // const filterByCategory = (category) => {
    //     // setFilterCategory(category);
    //     setFilter([...filter, category]);

    //     const filteredProducts = products.filter((product) => {
    //         return product.category === category;
    //     });

    //     setProductsList(filteredProducts);
    // };

    // const handleRemoveTag = (tag) => { };

    return (
        <div className="bg-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        New Arrivals
                    </h1>

                    <div
                        className="flex items-center relative"
                        id="tag-container"
                    >
                        {/* { filter.type !== "" &&  <Tag value={filter.type}/> } */}
                        {/* { filter.size !== "" &&  <Tag value={filter.size}/> } */}
                        {/* { filter.year !== "" &&  <Tag value={filter.year}/> } */}
                        {/* { filter.brand !== "" &&  <Tag value={filter.brand}/> } */}
                        {/* { filter.price !== "" &&  <Tag value={filter.minPrice + ' - ' + filter.maxPrice} /> } */}
                    </div>
                </div>

                <section
                    aria-labelledby="products-heading"
                    className="pt-6 pb-24"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                        <form className="hidden lg:block">
                            <h3 className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                Type
                            </h3>

                            <div className="flex justify-center border-b border-gray-200 pb-6">
                                <div className="mb-3 xl:w-96">
                                    <select
                                        onChange={(event) => {
                                            filterByType(event.target.value);
                                        }}
                                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example"
                                        name="type"
                                        id="type-select"
                                    >
                                        <option defaultValue={0}>
                                            Open this select menu
                                        </option>
                                        {Object.keys(attributes.type).map(
                                            (key) => {
                                                return (
                                                    <option
                                                        key={
                                                            attributes.type[key]
                                                                .uid
                                                        }
                                                        value={
                                                            attributes.type[key]
                                                                .uid
                                                        }
                                                    >
                                                        {
                                                            attributes.type[key]
                                                                .value
                                                        }
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <h3 className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                Size
                            </h3>

                            <div className="flex justify-center border-b border-gray-200 pb-6">
                                <div className="mb-3 xl:w-96">
                                    <select
                                        onChange={(event) => {
                                            filterBySize(event.target.value);
                                        }}
                                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example"
                                    >
                                        <option defaultValue={"0"}>
                                            Open this select menu
                                        </option>
                                        {Object.keys(attributes.size).map(
                                            (key) => {
                                                return (
                                                    <option
                                                        key={
                                                            attributes.size[key]
                                                                .uid
                                                        }
                                                        value={
                                                            attributes.size[key]
                                                                .value
                                                        }
                                                    >
                                                        {
                                                            attributes.size[key]
                                                                .value
                                                        }
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <h3 className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                Years
                            </h3>

                            <div className="flex justify-center border-b border-gray-200 pb-6">
                                <div className="mb-3 xl:w-96">
                                    <select
                                        onChange={(event) => {
                                            filterByYear(event.target.value);
                                        }}
                                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example"
                                    >
                                        <option defaultValue>
                                            Open this select menu
                                        </option>
                                        {Object.keys(attributes.year).map(
                                            (key) => {
                                                return (
                                                    <option
                                                        value={
                                                            attributes.year[key]
                                                                .value
                                                        }
                                                        key={
                                                            attributes.year[key]
                                                                .uid
                                                        }
                                                    >
                                                        {
                                                            attributes.year[key]
                                                                .value
                                                        }
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <h3 className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                Brands
                            </h3>

                            <div className="flex justify-center border-b border-gray-200 pb-6">
                                <div className="mb-3 xl:w-96">
                                    <select
                                        onChange={(event) => {
                                            filterByBrand(event.target.value);
                                        }}
                                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example"
                                    >
                                        <option defaultValue>
                                            Open this select menu
                                        </option>
                                        {Object.keys(attributes.brands).map(
                                            (key) => {
                                                return (
                                                    <option
                                                        value={
                                                            attributes.brands[
                                                                key
                                                            ].value
                                                        }
                                                        key={
                                                            attributes.brands[
                                                                key
                                                            ].uid
                                                        }
                                                    >
                                                        {
                                                            attributes.brands[
                                                                key
                                                            ].value
                                                        }
                                                    </option>
                                                );
                                            }
                                        )}
                                    </select>
                                </div>
                            </div>

                            <h3 className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                Price Range
                            </h3>

                            <div className="grid xl:grid-cols-2 xl:gap-6">
                                <div className="relative z-0 mb-6 w-full group">
                                    <input
                                        type="number"
                                        name="floating_phone"
                                        id="floating_phone"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder="Min"
                                        onChange={(event) => {
                                            filterByMinPrice(event.target.value);
                                        }}
                                    />
                                </div>
                                <div className="relative z-0 mb-6 w-full group">
                                    <input
                                        type="text"
                                        name="floating_company"
                                        id="floating_company"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-dark dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder="Max" 
                                        onKeyUp={(event) => {
                                            filterByMaxPrice(event.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="grid grid-cols-3 gap-4 lg:col-span-3">
                            {   
                                productsList && productsList.length > 0 ? (
                                    Object.keys(productsList).map((key) => {
                                        console.log(productsList.length);
                                        return (
                                            <Item key={productsList[key].id} product={productsList[key]} />
                                        );
                                    })
                                ) : (
                                    <div className="text-center">
                                        <h1 className="text-gray-500 text-xl">
                                            No Products Found
                                        </h1>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProductsList;
