import React, { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import style from "../common/FormsControls/FormsControls.module.css";
import { AppStateType } from "../../redux/redux-store";
import { Row, Col } from "antd";
import "./style.scss";

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, any> & any> = ({
  handleSubmit,
  error,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("Email", "email", [required], Input)}
      {createField("Password", "password", [required], Input, {
        type: "password",
      })}
      {createField(
        undefined,
        "rememberMe",
        [],
        Input,
        { type: "checkbox" },
        "Remember me"
      )}
      {error && <div className={style.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType>({ form: "login" })(
  LoginForm
);

type MapStatePropsType = {
  isAuth: boolean;
};

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean) => void;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: any) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <Row justify="center" align="middle">
      <Col className="login">
        <h1 className="title">Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
