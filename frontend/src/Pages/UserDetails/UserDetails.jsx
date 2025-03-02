import React from 'react'
import style from './UserDetails.module.css'
import { Share2 } from 'lucide-react';
import { useAppContext } from '../../components/AppContext';

const UserDetails = () => {

  const { userRegisterData } = useAppContext();

  return (
    <div className={style.userDetail_main}>
      <div className={style.header}>
        <p className={style.userName}><strong>Hi,</strong> {userRegisterData.firstName} {userRegisterData.lastName} <strong>!</strong></p>
        <p className={style.userText}>Congratulations, You get a great response today.</p>
      </div>
      <button className={style.shareButton}>
        <Share2 size={16} />
        Share
      </button>
    </div>
  )
}

export default UserDetails;
