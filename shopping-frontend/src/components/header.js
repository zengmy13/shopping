import React from 'react';
import {Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../pages/login/store/actioncreators";
import Searchbox from "./searchbox";
import {Route} from 'react-router-dom'


export default function Header() {
    const {currentuser} = useSelector(state => state.login);
    const dispatch = useDispatch();
    const handlelogout = () => {
        dispatch(logout())
    }
    return (
        <Navbar bg="dark" expand="lg" variant='dark'>
            <Container>
                <Navbar.Brand as={Link} to='/'>
                    PROJECT2
                </Navbar.Brand>
                <Navbar>
                    <Route render={({history}) => {
                        return <Searchbox history={history}/>
                    }}/>
                </Navbar>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={`/cart`}>
                            <i className='fas fa-shopping-cart mr-1'></i>
                            Cart
                        </Nav.Link>
                        {
                            currentuser ? <NavDropdown title={currentuser.name}>
                                <NavDropdown.Item as={Link}
                                                  to={`/profile/${currentuser._id}`}>Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handlelogout}>Log out</NavDropdown.Item>
                            </NavDropdown> : <Nav.Link as={Link} to='/login'>
                                <i className='fas fa-user mr-1'></i>
                                Sign In
                            </Nav.Link>
                        }
                        {
                            currentuser && currentuser?.isAdmin && <NavDropdown title='Admin'>
                                <NavDropdown.Item as={Link} to='/userlist'>Users</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/productlist'>Products</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/orderlist'>Orders</NavDropdown.Item>
                            </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}