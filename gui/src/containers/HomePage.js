import React from "react";
import { Button, Radio } from "antd";
import { Link } from "react-router-dom";
import * as actions from "../store/actions/auth";
import { LoadingOutlined } from "@ant-design/icons";
import "antd/dist/antd.less";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

class HomePage extends React.Component {
  formRef = React.createRef();

  render() {
    const button = {
      height: "50px",
      width: "150px",
    };

    const header = {
      color: "#000",
      padding: "10px",
      fontFamily: "Helvetica Neue",
      fontWeight: "250",
      fontSize: "50px",
    };

    const tagline = {
      color: "#006EA7",
      padding: "10px",
      fontFamily: "Helvetica Neue",
      fontWeight: "150",
      width: "70%",
      fontSize: "40px",
      marginTop: "-30px",
    };

    const brand = {};

    const onFinish = (values) => {
      this.props.onAuth(values.username, values.password);
      this.props.history.push("/");
    };

    const onFinishFailed = (errorInfo) => {};

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div>
        <div style={brand}>
          <h1 style={header}>Time to move up the UX Ladder</h1>
          <h1 style={tagline}>
            Scan your portfolio projects and compare with Job Descriptions
          </h1>
          <Button type="primary" shape="round" style={button}>
            <Link to="/new-scan/" style={{ fontSize: "17px" }}>
              Scan Now
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

//const WrappedNormalLoginForm = this.forkmRef.create()(NormalLoginForm);

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password)),
  };
};

export default HomePage;
