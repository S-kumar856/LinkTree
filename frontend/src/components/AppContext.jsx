import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // for liknks
      const [linkData, setLinkData] = useState({
        title: '',
        url: '',
        platform:''
      });

      // for userdetials
      const [username, setUsername] = useState({
        username: '',
        bio:'',
        color:''
      });

       const [links, setLinks] = useState([]);
      

      // usestate for storing the register data
      const [userRegisterData, setUserRegisterData] = useState({})
      useEffect(()=>{
        fetchRegister();
        fetchLinks();
      },[])

      // func for fetching userregisterdata
      const fetchRegister = async () =>{
        try {
          const response = await axios.get("http://localhost:4000/api/user/getusers",
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            // console.log(response.data)
            setUserRegisterData(response.data.user)
        } catch (error) {
          console.error(error)
        }
      }

      // fetchlinks

      const fetchLinks = async () => {
        try {
          const response = await axios.get("http://localhost:4000/api/links/getlinks",
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
          if (response.data) {
            setLinks(response.data)
            // toast.success("fetched links successfully");
          }
    
        } catch (error) {
          console.error("error:", error.response?.data || error.message)
          // toast.error("error fetching links")
        }
      }
  

 

  return (
    <AppContext.Provider value={{ linkData, setLinkData, username, setUsername, userRegisterData, setUserRegisterData, links, setLinks }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);