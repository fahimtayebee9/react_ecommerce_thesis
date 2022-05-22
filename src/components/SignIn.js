// import {AuthProvider, AuthStatus, useAuth} from "./auth/Auth";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DB_USERS from "./../database/user_db";

const SignIn = () => {
    const [usersList, setUsersList] = useState(DB_USERS);
    let navigate = useNavigate();
    const [user, setUser] = useState(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        let formData = new FormData(event.currentTarget);
        let username = formData.get("email");
        let password = formData.get("password");
        
        let user = usersList.filter(user => String(user.email) === String(username) && String(user.password) === String(password));

        if (user.length > 0) {
            localStorage.setItem("token", user[0].token);
            setUser(user[0]);
            navigate("/");
            window.location.reload(false);
        } else {
            localStorage.removeItem("token");
            setUser(null);
            alert("Invalid credentials");
        }
    }

    useEffect(() => {
        if(user){
            navigate("/checkout");
        }
        else{
            navigate("/login");
        }
    }, [user]);
    return (
        <div className="flex items-center h-screen w-full">
            <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                <form className="mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4 md:w-full">
                        <label htmlFor="email" className="block text-xs mb-1">Username or Email</label>
                        <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="email" name="email" id="email" placeholder="Username or Email" />
                    </div>
                    <div className="mb-6 md:w-full">
                        <label htmlFor="password" className="block text-xs mb-1">Password</label>
                        <input className="w-full border rounded p-2 outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
                    </div>
                    <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">Login</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;