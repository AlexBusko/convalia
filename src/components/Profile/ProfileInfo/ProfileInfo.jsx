import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";


const ProfileInfo = ({profile, status, updateStatus}) => {

    if (!profile) {
        return <Preloader />
    }

    return (
        <div>
            <img src={profile.photos.large} alt={"UserPhoto"} />
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
        </div>
    )
}

export default ProfileInfo;