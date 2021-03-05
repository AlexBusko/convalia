import React from "react";
import s from './../Content.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {
    let path = "/content/" + props.id;
    return   <div className={s.dialog}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>;
};

export default DialogItem;