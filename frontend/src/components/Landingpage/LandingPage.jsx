import React from 'react'
import style from './LandingPage.module.css'
import { FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaFire } from 'react-icons/fa';
import sparklogo from '../../assets/spark.png'
import analytic1img from '../../assets/Analytics1.png'
import analytic2img from '../../assets/div.png'
import analytic3img from '../../assets/div1.png'
import flowericon from '../../assets/icon.png'
import frame1 from '../../assets/frame/Frame1.png'
import frame2 from '../../assets/frame/Frame2.png'
import frame3 from '../../assets/frame/Frame3.png'
import frame4 from '../../assets/frame/Frame4.png'
import frame5 from '../../assets/frame/Frame5.png'
import frame6 from '../../assets/frame/Frame6.png'
import frame7 from '../../assets/frame/Frame7.png'
import frame8 from '../../assets/frame/Frame8.png'
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className={style.main_container}>
                <nav className={style.nav_spark}>
                    <div className={style.spark}>
                        <img src={sparklogo} alt="spark" />
                        <span className={style.sparkTitle}>SPARK</span> <span className={style.dash}>|</span> <span className={style.market}>Marketplace</span>
                    </div>
                    <div className={style.nav_btn}>
                        <button onClick={() => navigate('/register')}>Sign up free</button>
                    </div>
                </nav>
                {/* container2 */}
                <div className={style.container2}>
                    <div className={style.container2_left}>
                        <h2>The easiest place to update and share your Connection</h2>
                        <p>Help your followers discover everything you’re sharing all over the internet, in one simple place. They’ll thank you for it!</p>
                        <button className={style.container2_leftBtn}>Get your free Spark</button>
                    </div>
                    <div className={style.container2_right}>
                        <img src={analytic1img} alt="analytics.img" />
                    </div>
                </div>
                {/* container3 */}
                <div className={style.container3}>
                    <div className={style.container3_left}>
                        <div className={style.container3_leftImg}>
                            <img src={analytic2img} alt="revenue-analytics" />
                        </div>
                        <p>Sell products and collect payments. It’s monetization made simple.</p>
                    </div>
                    <div className={style.container3_right}>
                        <h2>Analyze your audience <br /> and keep your followers <br /> engaged</h2>
                        <p>
                            Track your engagement over time, monitor revenue and learn what’s converting your audience. Make informed updates on the fly to keep them coming back.
                        </p>
                    </div>
                </div>
                {/* container 3 end */}

                {/* container4 start */}
                <div className={style.container4}>
                    <div className={style.container4_left}>
                        <h2>Share limitless content <br /> in limitless ways</h2>
                        <p>
                            Connect your content in all its forms and help followers find more of what they’re looking for.
                            Your TikToks, Tweets, YouTube videos, music, articles, recipes, podcasts and more...
                            It all comes together in one powerful place.
                        </p>
                    </div>
                    <div className={style.container4_right}>
                        <div className={style.container4_rightImg}>
                            <img src={analytic3img} alt="content" className={style.content_image} />
                        </div>
                        <p className={style.content_caption}>Share your content in limitless ways on your Spark</p>
                    </div>
                </div>
                {/* container4 end */}

                {/* container5 start */}
                <div className={style.container5}>
                    <div className={style.container5_left}>
                        <h2>
                            Here's what our <span className={style.highlight}>customer</span> <br />
                            has to says
                        </h2>
                        <button className={style.customer_btn}>Read customer stories</button>
                    </div>
                    <div className={style.container5_right}>
                        <span className={style.icon}><img src={flowericon} alt="flowericon" /></span>
                        <p>
                            <strong>[short description goes in here]</strong> Lorem ipsum is a placeholder text to demonstrate.
                        </p>
                    </div>
                </div>

                {/* container5 end */}

                {/* container6 start */}
                <div className={style.container6}>

                    <div className={style.testimonial_cardGray}>
                        <h3>Amazing tool! Saved me months</h3>
                        <p>
                            This is a placeholder for your testimonials and what your client has to say,
                            put them here and make sure it’s 100% true and meaningful.
                        </p>
                        <div className={style.author_section}>
                            <div className={style.avatar}></div>
                            <div>
                                <strong>John Master</strong>
                                <p>Director, Spark.com</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.testimonial_card}>
                        <h3>Amazing tool! Saved me months</h3>
                        <p>
                            This is a placeholder for your testimonials and what your client has to say,
                            put them here and make sure it’s 100% true and meaningful.
                        </p>
                        <div className={style.author_section}>
                            <div className={style.avatar}></div>
                            <div>
                                <strong>John Master</strong>
                                <p>Director, Spark.com</p>
                            </div>
                        </div>
                    </div>

                    <div className={style.testimonial_card}>
                        <h3>Amazing tool! Saved me months</h3>
                        <p>
                            This is a placeholder for your testimonials and what your client has to say,
                            put them here and make sure it’s 100% true and meaningful.
                        </p>
                        <div className={style.author_section}>
                            <div className={style.avatar}></div>
                            <div>
                                <strong>John Master</strong>
                                <p>Director, Spark.com</p>
                            </div>
                        </div>
                    </div>
                    <div className={style.testimonial_cardGray}>
                        <h3>Amazing tool! Saved me months</h3>
                        <p>
                            This is a placeholder for your testimonials and what your client has to say,
                            put them here and make sure it’s 100% true and meaningful.
                        </p>
                        <div className={style.author_section}>
                            <div className={style.avatar}></div>
                            <div>
                                <strong>John Master</strong>
                                <p>Director, Spark.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* container6 end */}

                {/* container7 start */}
                <div className={style.container7}>
                    <h2>All Link Apps and Integrations</h2>
                    <div className={style.appGrids}>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame1} alt="" /></div>
                            <div>
                                <strong>Audiomack</strong>
                                <p>Add an Audiomack player to your Linktree</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame2} alt="" /></div>
                            <div>
                                <strong>Bandsintown</strong>
                                <p>Drive ticket sales by listing your events</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame3} alt="" /></div>
                            <div>
                                <strong>Bonfire</strong>
                                <p>Display and sell your custom merch</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame4} alt="" /></div>
                            <div>
                                <strong>Books</strong>
                                <p>Promote books on your Linktree</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame5} alt="" /></div>
                            <div>
                                <strong>Buy Me A Gift</strong>
                                <p>Let visitors support you with a small gift</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame6} alt="" /></div>
                            <div>
                                <strong>Cameo</strong>
                                <p>Make impossible fan connections possible</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame7} alt="" /></div>
                            <div>
                                <strong>Clubhouse</strong>
                                <p>Let your community in on the conversation</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame8} alt="" /></div>
                            <div>
                                <strong>Community</strong>
                                <p>Build an SMS subscriber list</p>
                            </div>
                        </div>

                        <div className={style.appCards}>
                            <div className={style.icon}><img src={frame1} alt="" /></div>
                            <div>
                                <strong>Contact Details</strong>
                                <p>Easily share downloadable contact details</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* container7 end */}

                {/* footer */}
                <div className={style.footerContainer}>
                    <div className={style.inner_footer}>
                        <div className={style.footerButtons}>
                            <div className={style.landPage_Btn}>
                                <button className={style.loginBtn}>Log in</button>
                                <button className={style.signupBtn}>Sign up free</button>
                            </div>
                        </div>

                        <div className={style.footerLinks}>
                            <ul>
                                <li>About Spark</li>
                                <li>Blog</li>
                                <li>Press</li>
                                <li>Social Good</li>
                                <li>Contact</li>
                            </ul>
                        </div>
                        <div className={style.footerLinks}>
                            <ul>
                                <li>Careers</li>
                                <li>Getting Started</li>
                                <li>Features and How-Tos</li>
                                <li>FAQs</li>
                                <li>Report a Violation</li>
                            </ul>
                        </div>
                        <div className={style.footerLinks}>
                            <ul>
                                <li>Terms and Conditions</li>
                                <li>Privacy Policy</li>
                                <li>Cookies Notice</li>
                                <li>Trust Center</li>
                            </ul>
                        </div>
                    </div>

                    <div className={style.acknowledgement}>
                        <p >
                            We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people of the Kulin Nation, and pay our respects to Elders past, present and emerging.
                        </p>

                        <div className={style.socialIcons}>
                            <FaTwitter />
                            <FaInstagram />
                            <FaYoutube />
                            <FaTiktok />
                            <FaFire />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LandingPage
