import React, { useEffect, useState } from "react";
import styles from "./Setting.module.css";
import axios from "axios";
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Settings = () => {

  const navigate = useNavigate();
  const [settingForm, setSettingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmpassword: ''
  })

  const handleSettingForm = (e) => {
    const { name, value } = e.target;
    setSettingForm({ ...settingForm, [name]: value })
  }

  useEffect(() => {
    fetchUser();
  }, [])
  // fetching the user data from the dackend
  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/getusers",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      const userData = response.data.user;
      setSettingForm({
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
      })

    } catch (error) {
      console.log("Failed to fetch user data", error)
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const updateUser = {};
    if (settingForm.firstName) updateUser.firstName = settingForm.firstName
    if (settingForm.lastName) updateUser.lastName = settingForm.lastName
    if (settingForm.email) updateUser.email = settingForm.email
    if (settingForm.password) updateUser.password = settingForm.password

    try {
      const response = await axios.put("http://localhost:4000/api/user/updateuser",
        updateUser,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })

      toast.success("Profile updated successfully!", {
        position: "top-right",
      });

      // If email is updated, logout user
      if (updateUser.email) {
        logout();
      }
    } catch (error) {
      console.log(error)
    }
  }
  // logout function
  const logout = () => {
    localStorage.removeItem("token");
    navigate('/login')
  };


  return (
    <div className={styles.setttingContainer}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.activeTab}>Edit Profile</span>
      </div>

      {/* Form */}
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <div className={styles.formGroup}>
          <label>First name</label>
          <input type="text"
            placeholder="Jenny"
            name="firstName"
            value={settingForm.firstName}
            onChange={handleSettingForm}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Last name</label>
          <input type="text"
            placeholder="Wilson"
            name="lastName"
            value={settingForm.lastName}
            onChange={handleSettingForm}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email</label>
          <input type="email" placeholder="JennyWilson08@gmail.com"
            name="email"
            value={settingForm.email}
            onChange={handleSettingForm}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Password</label>
          <input type="password" placeholder="**********"
            name="password"
            value={settingForm.password}

            onChange={handleSettingForm}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Confirm Password</label>
          <input type="password" placeholder="**********"
            name="confirmPassword"
            value={settingForm.confirmpassword}
            onChange={handleSettingForm}
          />
        </div>

        {/* Save Button */}
        <button className={styles.saveButton} type="submit">Save</button>
      </form>
    </div>
  );
};

export default Settings;

