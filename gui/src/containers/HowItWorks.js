import React from "react";
import { Button, Typography, Row, Col } from "antd";

const { Title, Text } = Typography;

class HowItWorks extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    const button = {
      height: "50px",
      width: "150px",
    };



    return (
      <div>
        <Row gutter={[16, 24]}>
          <Col span={3} />
          <Col span={16}>
            <Title level={2}>How Creativehire Works</Title>
          </Col>
          <Col span={5} />
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={3} />
          <Col span={16}>
          <p>
          <Text>1. Paste a job description from any job portal.</Text>
          </p>
          <p>
            <Text>2. Upload a link to a portfolio project.</Text>
          </p>
          <p>
            <Text>3. Enter the Project Name, Company Name, and Position Advertised.</Text>
          </p>
          <p>
            <Text>
              4. Scan and check the compatibility score between your portfolio
              project and the job description's requirements.
            </Text>        
          </p>
          </Col>
          <Col span={5} />
        </Row>

        <Row gutter={[16, 24]}>
          <Col span={8} />
          <Col span={11}>
              <Button
              type="primary"
              shape="round"
              htmlType="submit"
              style={button}
            >
              <div style={{ fontSize: "20px", fontWeight: "600" }}>Scan Now</div>
            </Button>
          </Col>
          <Col span={5} />
        </Row>

      </div>
    );
  }
}

export default HowItWorks;
