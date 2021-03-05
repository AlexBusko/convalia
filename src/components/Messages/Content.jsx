import React from "react";
import s from "./Content.module.css";
import Message from "./Message/Message";
import DialogItem from "./DialogItem/DialogItem";
import { Redirect } from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

const Content = (props) => {
  let state = props.dialogsPage;

  let messagesElements = state.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));
  let namesElements = state.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));

  let AddNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  };

  if (props.isAuth === false) return <Redirect to={"/login"} />;

  return (
    <div className={s.content}>
      <div className={s.dialog}>{namesElements}</div>
      <div className={s.messages}>{messagesElements}</div>
      <AddMessageForm onSubmit={AddNewMessage} />
    </div>
  );
};

export default Content;
