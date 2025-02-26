// components/AddLinkModal/AddLinkModal.jsx
import React, { useState } from 'react';
import styles from './AddLinkModel.module.css';
import { useAppContext } from '../AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddLinkModal = ({ isOpen, onClose, onAdd , updateFun}) => {
  const [linkType, setLinkType] = useState('link'); // 'link' or 'shop'
  const {linkData, setLinkData, links, setLinks} = useAppContext();

  // add links to backend



  const handleSubmit = async(e) => {
    console.log("Token:", localStorage.getItem("token"));
    console.log(linkData)
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/links/addlinks",
        {
          title: linkData.title,
          url: linkData.url,
          platform: linkData.platform
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if(response.data){
          toast.success("link created successfully")
         
          onAdd({ ...linkData, type: linkType });
         
        }
        console.log("links:", linkData)
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      toast.error("Error creating the links")
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Enter URL</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.tabGroup}>
            <button
              className={`${styles.tab} ${linkType === 'link' ? styles.active : ''}`}
              onClick={() => setLinkType('link')}
            >
              Add Link
            </button>
            <button
              className={`${styles.tab} ${linkType === 'shop' ? styles.active : ''}`}
              onClick={() => setLinkType('shop')}
            >
              Add Shop
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>Link title</label>
              <input
                type="text"
                value={linkData.title}
                onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
                placeholder="Enter link title"
              />
            </div>

            <div className={styles.inputGroup}>
              <label>URL</label>
              <input
                type="url"
                value={linkData.url}
                onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                placeholder="Enter URL"
              />
            </div>

            <div className={styles.applications}>
              <div className={styles.appIcons}>
                 <label>platform</label>
              <input
                type="text"
                value={linkData.platform}
                onChange={(e) => setLinkData({ ...linkData, platform: e.target.value })}
                placeholder="Enter URL"
              />
              </div>
            </div>

            <button type="submit" className={styles.addButton}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;