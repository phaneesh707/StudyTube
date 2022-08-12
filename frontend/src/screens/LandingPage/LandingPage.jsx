import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Button from 'react-bootstrap/Button'
import './LandingPage.css'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const LandingPage = () => {

  const navigate = useNavigate()

  useEffect(() => {
    const info = localStorage.getItem("userInfo")
    if(info){
      navigate('/mynotes');
    }
  }, [navigate])
  


  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to StudyTube</h1>
              <p className="subtitle">one place to learn without distractions.</p>
              <div className="buttonContainer">
                <a href="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </a>
                <a href="/register">
                  <Button size="lg" className="landingbutton" variant="outline-primary">
                    Signup
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage