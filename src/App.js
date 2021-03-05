import React from "react";
import "./App.scss";
import "antd/dist/antd.css";
import Navigation from "./components/Navigation/Navigation";
import UsersContainer from "./components/Users/UsersContainer";
import { BrowserRouter, Route, withRouter } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginPage from "./components/Login/Login";
import Prices from "./components/Prices/Prices";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspenseHoc";
import { Layout } from "antd";

const { Content } = Layout;

const ContentContainer = React.lazy(() =>
  import("./components/Messages/ContentContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <Layout className="wrapper">
        <HeaderContainer />
        <Layout>
          <Navigation />
          <Content className="wrapper-content">
            <Route path="/content" render={withSuspense(ContentContainer)} />
            <Route
              path="/profile/:userId?"
              render={withSuspense(ProfileContainer)}
            />
            <Route path="/users" render={() => <UsersContainer />} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/prices" render={() => <Prices />} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const ConvaliaJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default ConvaliaJSApp;
