import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/UserActions";

function Header({setSearch}) {

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin;
  console.log(userInfo)

  const handleLogout = () =>{
    dispatch(logout())
    navigate('/')
  }



  return (
    <Navbar bg="primary" expand="lg" varient="dark">
      <Container fluid>
        <Navbar.Brand href="/">
          <Link to="/"> Notez </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={e=>setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          {userInfo?<Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/mynotes">
              <Link to="/mynotes">My Notes</Link>
            </Nav.Link>
            <NavDropdown title={userInfo?.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>:null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
