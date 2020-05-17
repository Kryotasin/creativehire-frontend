import React from "react";
import { Button, Radio } from "antd";
import { Link } from "react-router-dom";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

class HowItWorks extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    const button = {
      height: "50px",
      width: "150px",
    };

    const primary = {
      color: "#063852",
      padding: "10px",
      fontFamily: "Arial",
      /* fontWeight: "bold", */
      fontSize: "20px",
    };

    const header = {
      color: "#000",
      padding: "10px",
      fontFamily: "Raleway",
      fontWeight: "bold",
      fontSize: "22px",
    };

    return (
      <div>
        <h1 style={header}>How it Works</h1>
        <h2 style={primary}>1. Paste a job description from any job portal.</h2>
        <h2 style={primary}>2. Upload a link to a portfolio project.</h2>
        <h2 style={primary}>
          3. Enter the Project Name, Company Name, and Position Advertised.
        </h2>
        <h2 style={primary}>
          4. Scan and check the compatibility score between your portfolio
          project and the job description's requirements.
        </h2>
        <Button
          type="primary"
          shape="round"
          htmlType="submit"
          style={button}
          loading={this.loading}
        >
          <div style={{ fontSize: "17px" }}>Scan Now</div>
        </Button>
      </div>
    );
  }
}

export default HowItWorks;
