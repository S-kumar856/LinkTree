import React from 'react'
import style from './Register.module.css'
import loginImg from '../../assets/login.png'
import sparkImg from '../../assets/spark.png'
import { Link } from 'react-router-dom'

const Register = () => {
    return (
        <>
            <div className={style.parent_register}>
                <div className={style.right_register}>
                    <div className={style.title_spark}>
                        <img src={sparkImg} alt="spark.png" />
                        <h2>SPARK</h2>
                    </div>
                    <div className={style.register}>
                        <p className={style.registerTitle}>Sign up to your Spark</p>
                        <div className={style.form_register}>
                            <div className={style.formTitle}>
                                <p>Create an account</p>
                                <Link to={'/login'}>Sign in instead</Link>
                            </div>
                            <form className={style.form}>
                                <div className={style.formFields}>
                                    <label htmlFor="firstname">First name</label><br />
                                    <input type="text" name='firstname' />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="lastname">Last name</label><br />
                                    <input type="text" name='lastname' />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="email">Email</label><br />
                                    <input type="text" name='email' />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="password">Password</label><br />
                                    <input type="password" name='password' />
                                </div>
                                <div className={style.formFields}>
                                    <label htmlFor="confirmpassword">Confirm Password</label><br />
                                    <input type="password" name='confirmpassword' />
                                </div>
                                <div className={style.termsCondition}>
                                    <input type="checkbox" name="checkbox" id="checkbox" />
                                    <p>By creating an account, I agree to our Terms of use
                                        and Privacy Policy </p>
                                </div>
                                <button className={style.createBtn} type="submit">Create an account</button>
                            </form>
                        </div>
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

export default Register
