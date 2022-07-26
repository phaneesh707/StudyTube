import React from 'react'
import MainScreen from '../../components/MainScreen'
import {Form,Button} from 'react-bootstrap'
import { useEffect,useState } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import Loading from '../../components/Loading/Loading'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/UserActions'

const RegisterScreen = () => {
    const [name,setName] = useState("")
    const [email, setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [pic, setPic] = useState(
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [picMessage,setPicMessage] = useState(null);
    const [message,setMessage] = useState(null)
    // const [error, setError] = useState(false)
    // const [loading,setLoading] = useState(false)

    const navigate = useNavigate()

    

      const dispatch = useDispatch()
      const userRegister = useSelector(state=>state.userRegister)

      const {loading,error,userInfo} = userRegister



    useEffect(() => {
      const info = localStorage.getItem("userInfo");
      if (info) {
        navigate("/mynotes");
      }
    }, [navigate, userInfo]);

    
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if(password!==confirmPassword){
          setMessage('Passwords dont match')
        }else{
          dispatch(register(name,email,password,pic))
        }
        
 
    }

  return (
    <MainScreen title="Registration">
      <div className="formContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage>{message}</ErrorMessage>}
        {loading && <Loading/>   }
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) =>{
                setName(e.target.value);
              } }
            />
          </Form.Group>
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
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              // onChange={(e)=>postDetails(e.target.files[0])}
              id="custom-file"
              type="file"
              label="Upload Profile Picture"
              placeholder="Confirm Password"
            />
          </Form.Group> */}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </MainScreen>
  );
}

export default RegisterScreen