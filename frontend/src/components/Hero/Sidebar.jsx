// components/Layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Link as LinkIcon, BarChart2, Settings, Palette } from 'lucide-react';
import styles from './Sidebar.module.css';
import sparkImg from '../../assets/spark.png'
import avatarImg from '../../assets/avatar.png'
import { useAppContext } from '../AppContext';

const Sidebar = () => {
  const location = useLocation();
  const { userRegisterData } = useAppContext();

  const navItems = [
    { icon: <LinkIcon size={20} />, label: 'Links', path: 'links' },
    { icon: <BarChart2 size={20} />, label: 'Analytics', path: 'analytics' },
    { icon: <Palette size={20} />, label: 'Appearance', path: 'appearance' },
    { icon: <Settings size={20} />, label: 'Settings', path: 'settings' }
  ];



  return (
    <div className={styles.main}>
      <div className={styles.sidebar}>
        <div>
          <div className={styles.logo}>
            <img src={sparkImg} alt="logo.png" />
            <span className={styles.sparkLogo}> Spark</span>
          </div>

          <nav className={styles.nav}>
            {navItems.map((item, index) => (
            
              <div key={index}>
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''
                  }`}
              >
              <div className={styles.navIcon}>
                {item.icon}
                <span>{item.label}</span>
              </div>
              </Link>
              </div>
            ))}
          </nav>
        </div>
        <div className={styles.user}>
          <img src={avatarImg} alt="img" />
          <p>{userRegisterData.firstName} {userRegisterData.lastName}  </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;