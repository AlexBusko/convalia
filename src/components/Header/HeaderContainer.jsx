import React from "react";
import Head from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";

class HeaderContainer extends React.Component {
  render() {
    return <Head {...this.props} />;
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  login: state.auth.login,
});

export default connect(mapStateToProps, { logout })(HeaderContainer);
