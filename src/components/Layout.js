import { Outlet, Link } from "react-router-dom";
import logo from "./../logo.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Layout = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isSignedIn, setIsSignedIn] = useState(null);
    let navigate = useNavigate();

    const handleSearch = (e) => {
        if(e.target.value !== ""){
            navigate("/search/" + e.target.value);
        }
        else{
            e.target.value = "";
            navigate("/");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsSignedIn(false);
        navigate("/");
    };

    useEffect(() => {
        if(token !== null) {
            setIsSignedIn(true);
            navigate("/");
        }
    }, [token]);

    return (
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-4 dark:bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <div>
                        <Link to={'/'} className="flex items-center">
                            <img src={logo} className="mr-3 h-6 sm:h-10" alt="Flowbite Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Nemo’s Store</span>
                        </Link>
                        <button data-collapse-toggle="mobile-menu" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className="mb-0 xl:w-96">
                            <div className="input-group relative flex flex-wrap items-stretch w-full mb-0">
                            <input type="search" onKeyUp={(e) => { handleSearch(e);}}
                                className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base 
                                    font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 
                                    rounded min-w-60 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
                                    focus:border-blue-600 focus:outline-none" placeholder="Search" 
                                aria-label="Search" aria-describedby="button-addon2"/>
                            </div>
                        </div>
                    </div>
                    <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <Link to="/" className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white">Home</Link>
                            </li>
                            <li>
                                <Link to="/categories" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 dark:active:">Categories</Link>
                            </li>
                            <li>
                                <Link to="/products" className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Products</Link>
                            </li>
                            {
                                !isSignedIn ? (
                                    <li>
                                        <Link to="/login" className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                                    </li>
                                ) : null
                            }
                            {
                                isSignedIn ? (
                                    <li className="flex items-baseline justify-between">
                                        <Link to="/cart" 
                                            className="block py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 
                                                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 
                                                md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 
                                                dark:hover:text-white md:dark:hover:bg-transparent">Cart</Link>
                                        <a  href="#" onClick={ (e) => { e.preventDefault(); handleLogout()}}
                                            className="block pl-4 text-gray-700 hover:bg-gray-50 
                                                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 
                                                md:px-4 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 
                                                dark:hover:text-white md:dark:hover:bg-transparent">Logout</a>
                                    </li>
                                ) : null
                            }
                            
                        </ul>
                    </div>
                </div>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;