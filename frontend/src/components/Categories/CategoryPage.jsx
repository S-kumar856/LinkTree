// OnboardingForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import style from './CategoryPage.module.css';
import womenImg from '../../assets/login.png'
import sparkImg from "../../assets/spark.png"


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
    const [username, setUsername] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', { username, selectedCategory });
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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

                            <button type="submit" className={style.continueButton} onClick={() => navigate('/main')}>
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