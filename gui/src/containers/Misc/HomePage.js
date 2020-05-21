import React from "react";
import { Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import "antd/dist/antd.less";


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

    return (
      <div>
        <Row>
          <Col span={6}/>
          <Col span={16}>
            <div style={brand}>
              <h1 style={header}>Time to move up the UX Ladder</h1>
              <h1 style={tagline}>
                Scan your portfolio projects and compare with Job Descriptions
              </h1>
              <Button type="primary" shape="round" style={button}>
                <Link to="new-scan/" style={{ fontSize: "17px" }}>
                  Scan Now
                </Link>
              </Button>
            </div>
          </Col>
          <Col span={2}/>
        </Row>
      </div>
    );
  }
}



export default HomePage;
