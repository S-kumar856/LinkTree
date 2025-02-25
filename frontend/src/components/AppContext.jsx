import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
      const [linkData, setLinkData] = useState({
        title: '',
        url: '',
        platform:''
      });
  

 

  return (
    <AppContext.Provider value={{ linkData, setLinkData  }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);