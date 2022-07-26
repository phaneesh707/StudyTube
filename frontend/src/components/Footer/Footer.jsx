import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col"
const Footer = () => {
  return (
    <>
      <footer
        style={{
          position: "relative",
          bottom: 0,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row>
            <Col className="text-center py-3">Made with Love ❤️</Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default Footer