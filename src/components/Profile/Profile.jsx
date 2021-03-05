import React from "react";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({updateStatus, status, profile}) => {
    return (
        <div>
            <ProfileInfo profile={profile}
            status={status}
            updateStatus={updateStatus}/>
        </div>
    )
}

export default Profile;