import { useEffect, useState, useContext } from "react";
import { baseURL } from "../shared";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginContext } from '../App';
export default function Register() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useContext(LoginContext);

    useEffect(() => {
        console.log('name', username);
        console.log('email', email);
        console.log('password', password);
    }, [username, email, password]);

    function login(e) {
        e.preventDefault();
        const url = baseURL + 'api/register/';
        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: username,
                password: password,
            }),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // localStorage.setItem('token', data);
            localStorage.setItem('refresh', data.refresh);
            localStorage.setItem('access', data.access);
            setLoggedIn(true);
            navigate(
                location?.state?.previousUrl
                    ? location.state.previousUrl
                    : '/customers'
            )
        })
    }
    return (
        <form className="m-2 w-full max-w-sm"
            id='customer'
            onSubmit={login}>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label htmlFor='email'>Email</label>
                </div>
                <div className="md:w-3/4">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="email"
                        type='email'
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                        }}
                    />
                </div>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label htmlFor='name'>username</label>
                </div>
                <div className="md:w-3/4">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        id="name"
                        type='text'
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);

                        }}
                    />
                </div>
            </div>

            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/4">
                    <label htmlFor="password"> Password </label>
                </div>
                <div className="md:w-3/4">
                    <input
                        id="password"
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        type='text'
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);

                        }}
                    />
                </div>
            </div>
            <button className="bg-purple-500 mr-2 hover:bg-purple-400 focus:outline-none text-white font-bold py-2 px-4 w-auto rounded "> Register  </button>
        </form >
    )
}