import { Field, reduxForm } from "redux-form";
import { Textarea } from "../../common/FormsControls/FormsControls";
import { maxLength, required } from "../../../utils/validators/validators";
import React from "react";

let maxLength15 = maxLength(15);

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newMessageBody"
          placeholder="Enter your message here!"
          validate={[required, maxLength15]}
        />
      </div>
      <div>
        <button>Надіслати</button>
      </div>
    </form>
  );
};

export default reduxForm({ form: "dialogAddMessageForm" })(AddMessageForm);
