// components/PhonePreview/PhonePreview.jsx
import React, { useState } from 'react';
import styles from './PhonePreview.module.css';
import avatar from '../../assets/avatar.png'
import sprakImg from '../../assets/spark.png'
import { FaShoppingCart } from 'react-icons/fa';
import { useAppContext } from '../AppContext';

const PhonePreview = ({ links = [], color, selectedLayout}) => {
  const [active, setActive] = useState('link');
  const { userRegisterData } = useAppContext();
  

  // redirect url
  const redirectUrl = (id) => {
    window.open(`http://localhost:4000/api/links/redirect/${id}`, "_blank");
  };

  return (
    <div className={styles.previewContainer}>

      <div className={styles.phoneFrame}>
        <div className={styles.phoneContent}>
          <div className={styles.profileSection}
            style={{ backgroundColor: color }}
          >
            <img
              src={avatar}
              alt="Profile"
              className={styles.avatar}
            />
            <h3 className={styles.username}>{userRegisterData.username}</h3>
            <p className={styles.bio}>{userRegisterData.bio}</p>
          </div>

          <div className={styles.linkShopBtn}>
            <div
              className={`${styles.linkBtn} ${active === 'link' ? styles.active : ''}`}
              onClick={() => setActive('link')}
            >
              link
            </div>
            <div
              className={`${styles.shopBtn} ${active === 'shop' ? styles.active : ''}`}
              onClick={() => setActive('shop')}
            >
              Shop
            </div>
          </div>

          <div className={`${styles.linksSection} ${styles[selectedLayout]}`}>
            {links
            .filter((link) => link.type === active)
            .map((link, index) => (
              <>
                {active === 'link' ? (
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      redirectUrl(link._id)
                    }}
                    key={index}
                    className={`${styles.linkButton} ${styles[link.type]}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    {link.title}
                  </a>
                ) : (
                  <div className={styles.shopCard}>
                  <div className={styles.inner_shopcard}>
                    <img
                      src={link.shopUrl}
                      alt="image"
                      className={styles.productImage}
                    />
                    <p className={styles.productTitle}>{link.shopTitle}</p>
                    <button className={styles.buyButton}>
                      <FaShoppingCart className={styles.cartIcon} />
                      Buy Now
                    </button>
                    </div>
                  </div>

                )}

              </>
            ))}
          </div>
      
          <div className={styles.footer}>
            <div className={styles.getConnected}>
              <button>Get Connected</button>
            </div>
            <div className={styles.sparkBranding}>
              <img src={sprakImg} alt="" />
              <span>SPARK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhonePreview;