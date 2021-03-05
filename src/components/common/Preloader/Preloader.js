import React from "react";
import preloader from "../../../assets/images/Reload-2.2s-200px.svg";

let Preloader = (props) => {
    return <div className="preloader" >
                <img src={preloader} alt={"Preloader"} />
            </div>
    }

export default Preloader;