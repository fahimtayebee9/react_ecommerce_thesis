import Item from "./Item";
import { useState, useEffect } from "react";
import DB_PRODUCTS from "../database/products_db";
import DB_ATTRIBUTES from "../database/attributes_db";

const ProductsList = (props) => {
    // const [filter, setFilter] = useState([]);
    const [productsList, setProductsList] = useState(DB_PRODUCTS);
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);

    const [tags, setTags] = useState({
        category: null,
        brand: null,
        color: null,
        size: null,
        maxPrice: null,
        minPrice: null,
        year: null,
    });

    const [filterYear, setFilterYear] = useState(null);
    const [filterMinPrice, setFilterMinPrice] = useState(null);
    const [filterMaxPrice, setFilterMaxPrice] = useState(null);
    const [filterCategory, setFilterCategory] = useState(null);
    const [filterBrand, setFilterBrand] = useState(null);
    const [filterSize, setFilterSize] = useState(null);
    const [filterType, setFilterType] = useState(null);

    // FILTER PRODUCTS BY SIZE
    let filterBySize = (size) => {
        setFilterSize(size);
        setTags({...tags, size: size});
    };

    // FILTER PRODUCTS BY TYPE
    const filterByType = (type) => {
        setFilterType(type);
        setTags({ ...tags, type: type });
    };

    // // FILTER PRODUCTS BY YEAR
    let filterByYear = (year) => {
        setFilterYear(year);
        setTags({...tags, year: year});
    };

    // // // FILTER PRODUCTS BY BRAND
    let filterByBrand = (brand) => {
        setFilterBrand(brand);
        setTags({...tags, brand: brand});
    };

    // // // FILTER PRODUCTS BY SEARCH
    // let filterBySearch = (search) => {
        
    // };

    const filterByMinPrice = (minPrice) => {
        setFilterMinPrice(minPrice);
        setTags({...tags, minPrice: minPrice});
    };

    const filterByMaxPrice = (maxPrice) => {
        setFilterMaxPrice(maxPrice);
        setTags({...tags, maxPrice: maxPrice});
    };

    useEffect(() => {
        if(props.category){
            const filteredProducts = productsList.filter((product) => Number(product.category) === Number(props.category));
            setProductsList(filteredProducts);
        }
        if (filterType !== null || filterYear !== null || filterMinPrice !== null || filterMaxPrice !== null || filterBrand !== null || filterSize !== null) {
            const filteredProducts = productsList.filter(
                (product) => 
                    Number(product.type) === Number(filterType) ||
                    product.size.includes(Number(filterSize)) ||
                    Number(product.date) === Number(filterYear) ||
                    Number(product.price) >= Number(filterMinPrice) ||
                    Number(product.price) <= Number(filterMaxPrice) ||
                    Number(product.brand) === Number(filterBrand) ||
                    Number(product.category) === Number(filterBrand) 
            );
            setProductsList(filteredProducts);
        }
    }, [filterType, filterSize, filterYear, filterBrand, filterMinPrice, filterMaxPrice, productsList, attributes, props.category]);

    return (
        <div className="bg-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        New Arrivals
                    </h1>

                    <div className="flex items-center relative" id="tag-container" >
                        {
                            filterType !== null && (
                                <div className="tag-container px-1 py-1 mr-0.5 bg-orange-100">
                                    <div className="group inline-flex justify-center text-base font-medium text-dark hover:text-gray-900 flex">
                                        <span className="tag-text mr-1">
                                            { tags.type && attributes.type.filter((item) => item.uid === Number(tags.type))[0].value }
                                        </span>
                                        <button className="tag-close" onClick={ () => {
                                                setTags({ ...tags, type: null }); 
                                                setFilterType(null);
                                            }}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                        
                        {
                            tags.size !== null && (
                                <div className="tag-container px-1 py-1 mr-0.5 bg-orange-100">
                                    <div className="group inline-flex justify-center text-base font-medium text-dark hover:text-gray-900 flex">
                                        <span className="tag-text mr-1">
                                            { tags.size && attributes.size.filter((item) => item.uid === Number(tags.size))[0].value }
                                        </span>
                                        <button className="tag-close" onClick={() => setTags({ ...tags, size: null })}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        {
                            tags.year !== null && (
                                <div className="tag-container px-1 py-1 mr-0.5 bg-orange-100">
                                    <div className="group inline-flex justify-center text-base font-medium text-dark hover:text-gray-900 flex">
                                        <span className="tag-text mr-1">
                                            { tags.year && attributes.year.filter((item) => item.uid === Number(tags.year))[0].value }
                                        </span>
                                        <button className="tag-close" onClick={() => setTags({ ...tags, year: null })}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            )
                        }

                        {
                            tags.brand !== null && (
                                <div className="tag-container px-1 py-1 mr-0.5 bg-orange-100">
                                    <div className="group inline-flex justify-center text-base font-medium text-dark hover:text-gray-900 flex">
                                        <span className="tag-text mr-1">
                                            { tags.brand && attributes.brands.filter((item) => item.uid === Number(tags.brand))[0].value }
                                        </span>
                                        <button className="tag-close" onClick={() => setTags({ ...tags, brands: null })}>
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            )
                        }
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
                                                    <option key={ attributes.type[key].uid } 
                                                            value={ attributes.type[key].uid}>
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
                                                                .uid
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
                                                                .uid
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
                                        {
                                            Object.keys(attributes.brands).map( (key) => {
                                                return (
                                                    <option value={ attributes.brands[key].uid} key={ attributes.brands[key].uid } >
                                                        {
                                                            attributes.brands[key].value
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
                                        return ( <Item key={productsList[key].id} product={productsList[key]} /> );
                                    })
                                ) : (
                                    <div className="text-center">
                                        <h1 className="text-gray-500 text-xl console.log-danger">
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
