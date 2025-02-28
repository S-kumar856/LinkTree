
// pages/Links/LinksPage.jsx
import React, { useEffect, useState, useRef  } from 'react';
import Hero from '../../components/Hero/HeroPage'
import PhonePreview from '../../components/PhonePreview/PhonePreview';
import AddLinkModal from '../../components/AddlinkModel/AddLinkModel';
import styles from './LinkPage.module.css';

import avatarImg from '../../assets/avatar.png'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAppContext } from '../../components/AppContext';


const LinkPage = () => {
  const { linkData } = useAppContext();
  const [showPhonePreview, setShowPhonePreview] = useState(false);
  const [currentId, setCurrentId] = useState(null)
  const [active, setActive] = useState('link');
  const [modalType, setModalType] = useState(''); 
  const { userRegisterData, setUserRegisterData, links, setLinks } = useAppContext();

  const predefinedColors = ["#3E3129", "#FFFFFF", "#000000"];
  const [selectedColor, setSelectedColor] = useState("#3E3129");
  const [file, setFile] = useState(null);
  console.log(file)


  // Save selected color to local storage (optional)
  useEffect(() => {
    const savedColor = localStorage.getItem("bannerColor");
    if (savedColor) setSelectedColor(savedColor);
  }, []);

  // file manager
  const fileInput = useRef(null);
  const handleOpenFileManager = () => {
    fileInput.current.click();
  };

 

  const handleColorChange = (color) => setSelectedColor(color);

  const handleSave = () => {
    localStorage.setItem("bannerColor", selectedColor);
    alert("Background color saved!");
  };




  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleAddLink = (newLink) => {
    setLinks([...links, newLink]);
  };

  const handleAddClick = () => {
    setCurrentId(null); // Reset currentId when adding a new link
    setModalType(active); // Set modal type based on current selection
    setIsModalOpen(!isModalOpen); // Open the modal
  };

  // fetching links from the backend
  


  // handle update links

  // const handleUpdateLinks = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.put(`http://localhost:4000/api/links/updatelink/${currentId}`,
  //       {
  //         title: linkData.title,
  //         url: linkData.url,
  //         platform: linkData.platform
  //       },
  //       {
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     console.log(response.data)
  //     if (response.data) {

  //       toast.success("link updated successfully");
  //     }
  //   } catch (error) {
  //     console.log("error in updating the Url", error);
  //     toast.error("Error updating the Url")
  //   }
  // };



  // deleting links 
  const deleteLink = async (id, type) => {
    console.log("delete id:", id)
    console.log("delete type:", type)
    try {
      const response = await axios.delete(`http://localhost:4000/api/links/deletelink/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
  
      setLinks((prevLinks) => prevLinks.filter((link) => !(link._id === id && link.type === type)));
  
      toast.success(`${type === "shop" ? "Shop" : "Link"} deleted successfully`);
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      toast.error(`Error deleting ${type === "shop" ? "shop" : "link"}`);
    }
  };
  

  // updateId
  const updateId = (id) => {
    setCurrentId(id);
    setIsModalOpen(!isModalOpen);

  }

  return (
    <>
      <div className={styles.pageContainer}>
        <div className={styles.content}>
          <div className={styles.editor}>
            <p>Profile</p>
            <section className={styles.profileSection}>
              <div className={styles.avatarUpload}>
                <img
                  src={file}
                  alt="Profile"
                  className={styles.avatar}
                />
                <div className={styles.profileBtn}>
                  <button className={styles.uploadButton} onClick={handleOpenFileManager}>
                    Pick an image
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInput}
                    style={{ display: 'none' }}
                    onChange={(e)=>setFile(e.target.files[0])}
                  />
                  <button className={styles.removeButton}>
                    Remove
                  </button>
                </div>
              </div>
              <input
                type="text"
                placeholder="Profile Title"
                className={styles.input}
                value={userRegisterData.username}
                onChange={(e) => setUserRegisterData({ ...userRegisterData, username: e.target.value })}
              />
              <textarea
                placeholder="Bio"
                className={styles.textarea}
                value={userRegisterData.bio}
                onChange={(e) => setUserRegisterData({ ...userRegisterData, bio: e.target.value })}
              />
            </section>

            <section className={styles.linksSection}>
              <div className={styles.linkShopBtn}>
                <div
                  className={`${styles.linkBtn} ${active === 'link' ? styles.active : ''}`}
                  onClick={() => setActive('link')}
                >
                  <i className="fa-solid fa-shop"></i>
                  link
                </div>
                <div
                  className={`${styles.shopBtn} ${active === 'shop' ? styles.active : ''}`}
                  onClick={() => setActive('shop')}
                >
                  <i className="fa-solid fa-shop"></i>
                  Shop
                </div>
              </div>
              <button
                className={styles.addButton}
                onClick={handleAddClick}
              >
                + Add
              </button>

              {/* url details */}
              <div className={styles.links_detail}>
                {links
                .filter((link) => link.type === active)
                .map((links, index) => {
                  return (
                    
                    <div key={index} className={styles.linkItem}>
                      <div className={styles.links_update}>
                        <div className={styles.title_update}>
                          {active === 'link' ? links.title : links.shopTitle}
                          <i className="fa-solid fa-pen" onClick={()=>updateId(links._id)}></i>

                        </div>
                        <div className={styles.url_update}>
                          <div className={styles.inner_url}>
                            {active === 'link' ? links.url : links.shopUrl}
                         
                          </div>
                          <div className={styles.toggle}>
                            hi
                          </div>
                        </div>
                      </div>
                      <div className={styles.linksCicks}>
                        <div className={styles.clicks}>
                          <i className="fa-solid fa-chart-simple" ></i>
                          <p>{links.clicks}</p>
                          <p>clicks</p>
                        </div>
                        <div className={styles.deleteIcon} onClick={() =>deleteLink(links._id, active)}>
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
            {/* banner section */}
            <section>
              <div className={styles.bannerContainer}>
                <h3>Banner</h3>
                <div className={styles.bannerContent}>
                  <div className={styles.banner} style={{ backgroundColor: selectedColor }}>
                    <img className={styles.avatar} src={avatarImg} alt="Profile" />
                    <p className={styles.username}>{userRegisterData.username}</p>
                  </div>

                  <div className={styles.colorSection}>
                    <p>Custom Background Color</p>
                    <div className={styles.colors}>
                      {predefinedColors.map((color) => (
                        <div
                          key={color}
                          className={`${styles.colorCircle} ${selectedColor === color ? styles.active : ""}`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                        />
                      ))}
                    </div>

                    <div className={styles.colorPicker}>
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => handleColorChange(e.target.value)}
                      />
                      <input type="text" value={selectedColor} readOnly />
                    </div>
                  </div>
                </div>

                <button className={styles.saveBtn} onClick={handleSave}>Save</button>
              </div>
            </section>
          </div>
        </div>
        <button
        className={styles.phonePreviewButton}
        onClick={() => setShowPhonePreview(!showPhonePreview)}
      >
        {showPhonePreview ? "Hide Preview" : "Show Phone Preview"}
      </button>
        
        <div className={styles.PhonePreview}>
          <PhonePreview links={links} color={selectedColor} />
        </div>

        <AddLinkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(!isModalOpen)}
          onAdd={handleAddLink}
          updateId = {currentId}
          type={modalType}
        />
      </div>
    </>
  );
};

export default LinkPage;

