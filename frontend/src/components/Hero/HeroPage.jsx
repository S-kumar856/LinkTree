import React from 'react';
import Sidebar from './Sidebar';
import styles from './HeroPage.module.css';

const HeroPage = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default HeroPage;