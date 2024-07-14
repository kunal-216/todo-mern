import React, { useContext } from 'react'
import { Context } from '../main'
import Loader from '../components/Loader'
import "../styles/profile.css"

const Profile = () => {

    const { loading, user } = useContext(Context)

    return (
        loading ? <Loader /> : (
            <div className='profile'>
                <h1>{user?.name}</h1>
                <p>{user?.email}</p>
            </div>
        )
    )
}

export default Profile
