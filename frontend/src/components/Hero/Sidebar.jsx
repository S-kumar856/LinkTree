// components/Layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as LinkIcon, BarChart2, Settings, Palette } from 'lucide-react';
import style from './Sidebar.module.css';
import sparkImg from '../../assets/spark.png'

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { icon: <LinkIcon size={20} />, label: 'Links', path: '/links' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: '/analytics' },
    { icon: <Palette size={20} />, label: 'Appearance', path: '/appearance' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' }
  ];

  return (
    <div className={style.sidebar}>
      <div className={style.logo}>
      <img src={sparkImg} alt="logo.png" />
        <span className={style.sparkLogo}> Spark</span>
      </div>
      
      <nav className={style.nav}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`${style.navItem} ${
              location.pathname === item.path ? style.active : ''
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;