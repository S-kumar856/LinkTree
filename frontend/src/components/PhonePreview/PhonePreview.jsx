// components/PhonePreview/PhonePreview.jsx
import React, { useState } from 'react';
import styles from './PhonePreview.module.css';
import avatar from '../../assets/avatar.png'
import sprakImg from '../../assets/spark.png'
import axios from 'axios';
import { useAppContext } from '../AppContext';

const PhonePreview = ({ links, color }) => {
  const [active, setActive] = useState('link');
  const [urlId, setUrlId] = useState(null)

   const { userRegisterData } = useAppContext();
  
  const redirectUrl = async () =>{
      const url = await axios.get(`http://localhost:4000/api/links/redirect/${urlId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(url)
      console.log(url.data)
  }


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

          <div className={styles.linksSection}>
            {links.map((link, index) => (

              <a
                onClick={()=>{setUrlId(link._id),redirectUrl()} }
                key={index}
                // href={link.url}
                className={`${styles.linkButton} ${styles[link.type]}`}
                target="_blank"
                rel="noopener noreferrer">
                {link.title}
              </a>
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