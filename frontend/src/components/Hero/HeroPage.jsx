import React from 'react';
import Sidebar from './Sidebar';
import styles from './HeroPage.module.css';
import { Outlet } from 'react-router-dom';
import UserDetails from '../../Pages/UserDetails/UserDetails';

const HeroPage = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.DivFlex}>
        <div className={styles.user}>

          <UserDetails />
        </div>
        <div className={styles.outlet}>
          <Outlet />

        </div>
      </div>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default HeroPage;