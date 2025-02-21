import React from 'react'

import style from './Login.module.css'
import loginImg from '../../assets/login.png'
import sparkImg from '../../assets/spark.png'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <>
            <div className={style.parent_register}>
                <div className={style.right_register}>
                    <div className={style.title_spark}>
                        <img src={sparkImg} alt="spark.png" />
                        <h2>SPARK</h2>
                    </div>
                    <div className={style.register}>
                        <p className={style.registerTitle}>Sign in to your Spark</p>
                    </div>

                    <div className={style.formLogin}>
                        <form className={style.form}>
                            <div className={style.loginFields}>
                            <label htmlFor="username">Username</label><br />
                                <input type="text" name='username' placeholder='Spark/Username'/>
                            </div>
                            <div className={style.loginFields}>
                            <label htmlFor="username">Password</label><br />    
                                <input type="password" name='password' placeholder='Password'/>
                                <i className="fa-regular fa-eye"></i>
                            </div>
                            <button className={style.loginBtn}>Log in</button>
                        </form>
                    </div>

                <div className={style.forgotpassword}>
                    <a href="#">Forgot password?</a>
                    <p>Don't have an account? <Link to={'/'}>Sign up</Link></p>
                </div>

                    <div className={style.footer_register}>
                        <p>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply</p>
                    </div>
                </div>
                <div className={style.left_register}>
                    <img src={loginImg} alt="login.png" />
                </div>
            </div>
        </>
    )
}

export default Login
