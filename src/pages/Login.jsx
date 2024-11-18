import React, {useContext} from 'react';
import MyInput from "../Components/UI/input/MyInput";
import MyButton from "../Components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth,setIsAuth} = useContext(AuthContext);
    const Login = (e) => {
        e.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
        console.log(isAuth)
    }

    return (
        <div>
            <h1>Регистрация/Вход</h1>
            <form onSubmit={Login}>
                <MyInput type='text' placeholder='Enter username'/>
                <MyInput type='password' placeholder='Enter password'/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;