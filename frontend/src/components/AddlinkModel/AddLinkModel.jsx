import React, { useState, useEffect } from 'react';
import styles from './AddLinkModel.module.css';
import { useAppContext } from '../AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddLinkModal = ({ isOpen, onClose, onAdd, updateId, modalType }) => {
  const { linkData, setLinkData, links } = useAppContext();
  const [linkType, setLinkType] = useState(modalType || 'link'); // Initialize with modalType



  useEffect(() => {
    setLinkType(modalType || 'link'); // Ensure modalType is used when opening modal
    if (updateId) {
      // Find the existing data to prefill fields
      const existingData = links.find((item) => item._id === updateId);
      if (existingData) {
        setLinkData({...existingData});
      }

    } else {
      // Reset form when adding a new link/shop
      setLinkData(
        modalType === "shop"
          ? { shopTitle: "", shopUrl: "", type: "shop" }
          : { title: "", url: "", platform: "", type: "link" }
      );
    }
  }, [modalType, isOpen, updateId, links]);


  const handleTabSwitch = (type) => {
    setLinkType(type);
    setLinkData(
      type === "shop"
        ? { shopTitle: "", shopUrl: "", type: "shop" }
        : { title: "", url: "", platform: "", type: "link" }
    ); // Reset form fields when switching tabs
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload =
      linkType === "shop"
        ? { shopTitle: linkData.shopTitle, shopUrl: linkData.shopUrl, type: "shop", _id: updateId }
        : {
          title: linkData.title,
          url: linkData.url,
          platform: linkData.platform,
          type: "link",
          _id: updateId
        };


    try {
      if (updateId) {
        // Update existing link
        const response = await axios.put(
          `http://localhost:4000/api/links/updatelinks/${updateId}`,
          payload,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (response.data) {
          toast.success(`${linkType === 'shop' ? "Shop" : "link"} updated successfully`);
          // setLinkData((prevLinks) =>
          //   prevLinks.map((link) => (link._id === updateId ? { ...link, ...payload } : link))
          // );
          
        }
        else{
          toast.error("Failed to update link");
        }

      } else {
        // Add new link or shop
        const response = await axios.post(
          "http://localhost:4000/api/links/addlinks",
          payload,
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );

        if (response.data) {
          toast.success(`${linkType === 'shop' ? "Shop" : "Link"} created successfully`);
          
          onAdd({ ...linkData, type: linkType });
        }
        else{
          toast.error(`Error in Creating ${linkType === 'shop' ? "Shop" : "Link"}`);
        }
      }
    } catch (error) {
      console.error("Error Response:", error.response?.data || error.message)
      toast.error("Error in creating in link");
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>{updateId ? `Edit ${linkType === 'shop' ? 'Shop' : 'Link'}` : `Add ${linkType === 'shop' ? 'Shop' : 'Link'}`}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.tabGroup}>
            <button
              className={`${styles.tab} ${linkType === 'link' ? styles.active : ''}`}
              onClick={() => handleTabSwitch('link')}
            >
              Add Link
            </button>
            <button
              className={`${styles.tab} ${linkType === 'shop' ? styles.active : ''}`}
              onClick={() => handleTabSwitch('shop')}
            >
              Add Shop
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label>{linkType === 'shop' ? 'Shop Name' : 'Link Title'}</label>
              <input
                type="text"
                value={linkType === 'link' ? linkData.title : linkData.shopTitle}
                onChange={(e) =>
                  linkType === 'shop'
                    ? setLinkData({ ...linkData, shopTitle: e.target.value })
                    : setLinkData({ ...linkData, title: e.target.value })
                }
                
              placeholder={linkType === 'shop' ? 'Enter Shop Name' : 'Enter Link Title'}
              />
            </div>

            <div className={styles.inputGroup}>
              <label>{linkType === 'shop' ? 'Shop URL' : 'URL'}</label>
              <input
                type="url"
                value={linkType === 'shop' ? linkData.shopUrl : linkData.url}
                onChange={(e) =>
                  linkType === 'shop'
                    ? setLinkData({ ...linkData, shopUrl: e.target.value })
                    : setLinkData({ ...linkData, url: e.target.value })
                }
                placeholder={linkType === 'shop' ? 'Enter Shop URL' : 'Enter URL'}
              />
            </div>

            {linkType === 'link' && (
              <div className={styles.applications}>
                <div className={styles.appIcons}>
                  <label>Platform</label>
                  <input
                    type="text"
                    value={linkData.platform}
                    onChange={(e) => setLinkData({ ...linkData, platform: e.target.value })}
                    placeholder="Enter Platform"
                  />
                </div>
              </div>
            )}


            <button type="submit" className={styles.addButton}>
              {updateId ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddLinkModal;
