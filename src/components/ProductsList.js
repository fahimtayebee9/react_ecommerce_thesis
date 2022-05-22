// import {CANCEL_SVG} from './../assets/icons/cancel.svg';

import Tag from "./Tag";
import Item from "./Item";
import { useState, useEffect } from "react";
import DB_PRODUCTS from "../database/products_db";
import DB_USERS from "../database/user_db";
import DB_ATTRIBUTES from "../database/attributes_db";
import Breadcrumb from "./Breadcrumb";
import { useParams } from "react-router-dom";

const ProductsList = (props) => {
    const {query} = useParams();

    // SETTING PRODUCTS LIST
    const [productsList, setProductsList] = useState((props.category) ? 
            DB_PRODUCTS.filter(product => Number(product.category) === Number(props.category)) : 
            DB_PRODUCTS);

    // SETTING ATTRIBUTES LIST
    const [attributes, setAttributes] = useState(DB_ATTRIBUTES);
    const [user, setUser] = useState(DB_USERS);

    // DEFAULT CRUMBS
    const [search_crumbs, setSearchCrumbs] = useState([
        {name: "Home", url: '/'},
        {name: "Search", url: '/search'},
    ]);

    const [tags, setTags] = useState({
        category: "",
        size: "",
        year: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
    });

    // FILTER PRODUCT USING CATEGORY, SIZE, YEAR, BRAND, MIN PRICE, MAX PRICE
    const [filter, setFilter] = useState({
        category: "",
        size: "",
        year: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
    });

    useEffect(() => {
        // CHECKING IF THERE IS A CATAGORY IN URL
        if(props.category){
            setProductsList(DB_PRODUCTS.filter(product => Number(product.category) === Number(props.category)));
            setTags((prevState) => {
                return {
                    ...prevState,
                    category: props.category,
                };
            });
        }

        // CHECKING IF THERE IS A QUERY
        if(query){
            let queryArray = null;
            let count = 0;
            
            // CHECKING IF THERE IS A QUERY WITH A SPACE
            if(query.includes(" ")){
                queryArray = query.split(" ");
            }else{
                queryArray = [query];
            }
            
            // LOOPING THROUGH THE QUERY ARRAY AND PUSHING THE QUERY TO THE SEARCH CRUMBS
            while(count < queryArray.length){
                search_crumbs.push({name: queryArray[count], url: '/search/' + queryArray[count]});
                console.log(queryArray[count], count);
                count++;
            }
        }
    }, [filter, props.category, productsList, query, search_crumbs]);

    

    // FILTER PRODUCTS BY SIZE
    let filterBySize = (size) => {
        setSearchCrumbs([
            {name: "Home", url: '/'},
            {name: "Products", url: '/products'}
        ]);

        setFilter((prevState) => {
            return {
                ...prevState,
                size: size,
            };
        });
    };

    // FILTER PRODUCTS BY category
    const filterBycategory = (category) => {
        setSearchCrumbs([
            {name: "Home", url: '/'},
            {name: "Products", url: '/products'}
        ]);

        setFilter((prevState) => {
            return {
                ...prevState,
                category: category,
            };
        });
    };

    // FILTER PRODUCTS BY YEAR
    let filterByYear = (year) => {
        setSearchCrumbs([
            {name: "Home", url: '/'},
            {name: "Products", url: '/products'}
        ]);

        setFilter((prevState) => {
            return {
                ...prevState,
                year: year,
            };
        });
    };

    // FILTER PRODUCTS BY BRAND
    let filterByBrand = (brand) => {
        setSearchCrumbs([
            {name: "Home", url: '/'},
            {name: "Products", url: '/products'}
        ]);

        setFilter((prevState) => {
            return {
                ...prevState,
                brand: brand,
            };
        });
    };

    // FILTER PRODUCTS BY MIN PRICE
    const filterByMinPrice = (minPrice) => {
        setSearchCrumbs([
            {name: "Home", url: '/'},
            {name: "Products", url: '/products'}
        ]);
        setFilter((prevState) => {
            return {
                ...prevState,
                minPrice: minPrice,
            };
        });
    };

    // FILTER PRODUCTS BY MAX PRICE
    const filterByMaxPrice = (maxPrice) => {
        setSearchCrumbs([
            {name: "Home", url: '/'},
            {name: "Products", url: '/products'}
        ]);
        setFilter((prevState) => {
            return {
                ...prevState,
                maxPrice: maxPrice,
            };
        });
    };

    // FILTER PRODUCTS BY TAGS
    const handleRemoveTag = (tag) => {
        setSearchCrumbs([
            {name: "Home", url: '/'},
            {name: "Products", url: '/products'}
        ]);
        if(tag === "category"){
            setFilter((prevState) => {
                return {
                    ...prevState,
                    category: "",
                };
            });
        }
        if(tag === "size"){
            setFilter((prevState) => {
                return {
                    ...prevState,
                    size: "",
                };
            });
        }
        if(tag === "year"){
            setFilter((prevState) => {
                return {
                    ...prevState,
                    year: "",
                };
            });
        }
        if(tag === "brand"){
            setFilter((prevState) => {
                return {
                    ...prevState,
                    brand: "",
                };
            });
        }
        if(tag === "minPrice"){
            setFilter((prevState) => {
                return {
                    ...prevState,
                    minPrice: "",
                };
            });
        }
        if(tag === "maxPrice"){
            setFilter((prevState) => {
                return {
                    ...prevState,
                    maxPrice: "",
                };
            });
        }
    };

    // UPDATE CRUMBS ON CRUMB CLICK
    const handleCrumbsClick = (crumb) => {
        search_crumbs.splice(search_crumbs.indexOf(crumb) + 1, search_crumbs.length - (search_crumbs.indexOf(crumb) + 1)); //index , 
    };

    return (
        <div className="bg-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="breadcrumb block">
                    {
                        (query !== "" && query !== null && query !== undefined) ? 
                            <Breadcrumb handleCrumbsClick={handleCrumbsClick} crumbs={ search_crumbs } query={query} selected={ props.selected } /> : 
                            <Breadcrumb handleCrumbsClick={handleCrumbsClick} crumbs={ props.crumbs } selected={ props.selected } />
                    }
                </div>
                <div className="relative z-10 flex items-baseline justify-between pt-5 pb-6 border-b border-gray-200">
                    
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
                        New Arrivals
                    </h1>

                    <div className="flex items-center relative" id="tag-container" >
                        { (filter.category !== "") ? <Tag value={filter.category} type={"category"} handleRemoveTag={handleRemoveTag}/> : ""}
                        { (filter.size !== "") ?  <Tag value={filter.size}  type={"size"}  handleRemoveTag={handleRemoveTag}/> : ""}
                        { (filter.year  !== "") ? <Tag value={filter.year}  type={"year"}  handleRemoveTag={handleRemoveTag}/> : ""}
                        { (filter.brand !== "") ? <Tag value={filter.brand} type={"brand"} handleRemoveTag={handleRemoveTag}/> : ""}
                    </div>
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                        <form className="hidden lg:block">
                            <h3 className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                                Category
                            </h3>

                            <div className="flex justify-center border-b border-gray-200 pb-6">
                                <div className="mb-3 xl:w-96">
                                    <select
                                        onChange={(event) => { filterBycategory(event.target.value); }}
                                        className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        aria-label="Default select example"
                                        name="category"
                                        id="category-select"
                                    >
                                        <option defaultValue={0}>Open this select menu</option>
                                        {
                                            Object.keys(attributes.category).map((key) => {
                                                return (
                                                    <option key={ attributes.category[key].uid } value={ attributes.category[key].uid} >
                                                        {
                                                            attributes.category[key].value
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
                                                    <option key={attributes.size[key].uid} value={attributes.size[key].uid}>
                                                        {
                                                            attributes.size[key].value
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
                                                    <option value={attributes.year[key].value} key={attributes.year[key].value}>
                                                        {
                                                            attributes.year[key].value
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
                                                    <option value={attributes.brands[key].uid} key={attributes.brands[key].uid}>
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
                                        category="number"
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
                                        category="text"
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
                                (filter.category !== "" && filter.brand !== "" && filter.size !== "" && filter.year !== "") ? 
                                    productsList.filter(
                                        (product) => {
                                            if(Number(product.category) === Number( filter.category) && 
                                                    Number(product.brand) === Number( filter.brand) &&
                                                    product.size.includes(Number(filter.size)) &&
                                                    Number(product.date) === Number(filter.year)){
                                                return product;
                                            }
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        )
                                    })
                                :
                                (filter.category !== "") ? 
                                    productsList.filter(
                                        (product) => {
                                            return Number(product.category) === Number( filter.category);
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        );
                                    })
                                : (filter.brand !== "") ? 
                                    productsList.filter(
                                        (product) => {
                                            return Number(product.brand) === Number(filter.brand);
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        );
                                    }) 
                                : (filter.size !== "") ?
                                    productsList.filter(
                                        (product) => {
                                            return product.size.find((size) => {
                                                if(Number(size) === Number(filter.size)){ return product; }
                                            })
                                        }).map((product) => {
                                            return (
                                                <Item key={product.id} product={product} />
                                            );
                                        }) 
                                : (filter.year !== "") ? 
                                    productsList.filter(
                                        (product) => {
                                            return Number(product.date) === Number(filter.year);
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        );
                                    })
                                : (filter.minPrice !== "" && filter.maxPrice !== "") ? 
                                    productsList.filter(
                                        (product) => {
                                            if(Number(product.price) >= Number(filter.minPrice) && 
                                                    Number(product.price) <= Number(filter.maxPrice)){
                                                return product;
                                            }
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        );
                                    }) 
                                : (filter.minPrice !== "") ? 
                                    productsList.filter(
                                        (product) => {
                                            if(Number(product.price) >= Number(filter.minPrice)){
                                                return product;
                                            }
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        );
                                    }) 
                                : (filter.maxPrice !== "") ? 
                                    productsList.filter(
                                        (product) => {
                                            if(Number(product.price) <= Number(filter.maxPrice)){
                                                return product;
                                            }
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        );
                                    })
                                : (query !== "" && query !== null && query !== undefined) ? 
                                    productsList.filter(
                                        (product) => {
                                            if(product.name.toLowerCase().includes(query.toLowerCase()) ||
                                                    product.description.toLowerCase().includes(query.toLowerCase())){
                                                return product;
                                            }
                                        }).map((product) => {
                                        return (
                                            <Item key={product.id} product={product} />
                                        );
                                    })
                                : productsList && productsList.length > 0 ? (
                                    Object.keys(productsList).map((key) => {
                                        return (
                                            <Item key={productsList[key].id} product={productsList[key]} />
                                        );
                                    })
                                ) : (query === "" && query === null && query === undefined) ? (
                                    <div className="text-center">
                                        <h1 className="text-gray-500 text-xl py-5 px-5">
                                            No Products Found
                                        </h1>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <h1 className="text-gray-500 text-xl py-5 px-5">
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
