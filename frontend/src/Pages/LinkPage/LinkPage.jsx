
// pages/Links/LinksPage.jsx
import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero/HeroPage'
import PhonePreview from '../../components/PhonePreview/PhonePreview';
import AddLinkModal from '../../components/AddlinkModel/AddLinkModel';
import styles from './LinkPage.module.css';

import avatarImg from '../../assets/avatar.png'
import axios from 'axios';
import { toast } from 'react-toastify';


const LinkPage = () => {
  const [active, setActive] = useState('link');
  const [profile, setProfile] = useState({
    username: '@opopo_08',
    avatar: '/api/placeholder/100/100',
    bio: ''
  });

  console.log("links page")
  const [links, setLinks] = useState([]);

  useEffect(()=>{
    fetchLinks();
  },[])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddLink = (newLink) => {
    setLinks([...links, newLink]);
  };

  // fetching links from the backend
  const fetchLinks = async () =>{
    try {
      const response = await axios.get("http://localhost:4000/api/links/getlinks",
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if(response.data){
        setLinks(response.data)
        toast.success("fetched links successfully");
      }
      
    } catch (error) {
      console.error("error:", error.response?.data || error.message)
      toast.error("error fetching links")
    }
  }

  // deleting links 
  const deleteLink = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/links/deletelink/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== id));
      toast.success("Link deleted successfully");
    } catch(error){
      console.error("Delete Error:", error.response?.data || error.message);
      toast.error("Error deleting link");
    }


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
                  src={avatarImg}
                  alt="Profile"
                  className={styles.avatar}
                />
                <div className={styles.profileBtn}>
                  <button className={styles.uploadButton}>
                    Pick an image
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    // ref={fileInputRef}
                    style={{ display: 'none' }}
                  // onChange={handleFileChange}
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
                value={profile.username}
                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
              />
              <textarea
                placeholder="Bio"
                className={styles.textarea}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
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
                onClick={() => setIsModalOpen(true)}
              >
                + Add
              </button>

              {/* url details */}
              <div className={styles.links_detail}>
                {links.map((links, index) => {
                  return (
                    <div key={index} className={styles.linkItem}>
                      <div className={styles.links_update}>
                        <div className={styles.title_update}>
                          {links.title}
                          <i className="fa-solid fa-pen"></i>

                        </div>
                        <div className={styles.url_update}>
                          <div className={styles.inner_url}>
                            {links.url}
                            <i className="fa-solid fa-pen"></i>
                          </div>
                          <div className={styles.toggle}>
                            hi
                          </div>
                        </div>
                      </div>
                      <div className={styles.linksCicks}>
                        <div className={styles.clicks}>
                          <i className="fa-solid fa-chart-simple"></i>
                          <p>{links.clicks}</p>
                          <p>clicks</p>
                        </div>
                        <div className={styles.deleteIcon} onClick={()=>deleteLink(links._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* click and delete icon */}


            </section>
          </div>
        </div>

        <PhonePreview profile={profile} links={links} />

        <AddLinkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddLink}
        />
      </div>
    </>
  );
};

export default LinkPage;

