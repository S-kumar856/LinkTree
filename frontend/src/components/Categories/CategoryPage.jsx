// OnboardingForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import style from './CategoryPage.module.css';
import womenImg from '../../assets/login.png'
import sparkImg from "../../assets/spark.png"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppContext } from '../AppContext';


const categories = [
    { id: 'business', label: 'Business', icon: '🏢' },
    { id: 'creative', label: 'Creative', icon: '🎨' },
    { id: 'education', label: 'Education', icon: '📚' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎶' },
    { id: 'fashion', label: 'Fashion & Beauty', icon: '👗' },
    { id: 'food', label: 'Food & Beverage', icon: '🍕' },
    { id: 'government', label: 'Government & Politics', icon: '⚖️' },
    { id: 'health', label: 'Health & Wellness', icon: '🍎' },
    { id: 'nonprofit', label: 'Non-Profit', icon: '💗' },
    { id: 'other', label: 'Other', icon: '💗' },
    { id: 'tech', label: 'Tech', icon: '💻' },
    { id: 'travel', label: 'Travel & Tourism', icon: '✈️' }
];

const CategoryPage = () => {
    const { username, setUsername } = useAppContext();
    const [selectedCategory, setSelectedCategory] = useState('');
    console.log(username)

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/api/user/userdetails",
                {
                    username: username.username,
                },
                {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                }
            );

            if (response.status === 200) {

                setUsername({
                   username:''
                });
                console.log(response)
                toast.success('User Registrated successfully')
            }
            else {
                console.log(response.data)
                toast.error('Registration failed')
            }

        } catch (error) {
            console.error(error.response.data)
            toast.error(error.response.data.msg)

        }
    };

    return (
        <div className={style.container}>


            <div className={style.formSection}>
                <div className={style.logo}>
                    <img src={sparkImg} alt="SparkImg" className={style.logoImg} />
                    <span className={style.sparkText}>SPARK</span>
                </div>
                <div className={style.formGroup}>
                    <div className={style.formContent}>
                        <h1>Tell us about yourself</h1>
                        <p className={style.subtitle}>For a personalized Spark experience</p>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Tell us your username"
                                value={username.username}
                                onChange={(e) => setUsername({username: e.target.value})}
                                className={style.input}
                            />

                            <div className={style.categorySection}>
                                <p className={style.categoryLabel}>
                                    Select one category that best describes your Linktree:
                                </p>
                                <div className={style.categoryGrid}>
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            className={`${style.categoryButton} ${selectedCategory === category.id ? style.selected : ''
                                                }`}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            <span className={style.categoryIcon}>{category.icon}</span>
                                            <span>{category.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button type="submit" className={style.continueButton} onClick={() => navigate('/hero')}>
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className={style.imageSection}>
                <img
                    src={womenImg}
                    alt="womenImg"
                    className={style.decorativeImage}
                />
            </div>
        </div>
    );
};

export default CategoryPage;