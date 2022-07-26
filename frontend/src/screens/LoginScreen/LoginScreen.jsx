import React, { useEffect } from 'react'
import MainScreen from '../../components/MainScreen'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col";
import { Link, useNavigate } from 'react-router-dom';
import './LoginScreen.css'
import { useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../../actions/UserActions"

const LoginScreen = () => {

    const [email,setEmail] = useState("")
    const [password,setPasswrod] = useState("")
    // const [error,setError] = useState(false)
    // const [loading,setLoading] = useState(false)
    
    
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const userLogin = useSelector(state =>state.userLogin)
    const {loading,error,userInfo} = userLogin 

    useEffect(() => {
      const info = localStorage.getItem("userInfo");
      if (info) {
        navigate("/mynotes");
      }
    }, [navigate,userInfo]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        dispatch(login(email,password))
    }

  return (
    <MainScreen title="LOGIN">
      <div className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPasswrod(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New User ?<Link to="/register"> Register here</Link>
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
}

export default LoginScreen