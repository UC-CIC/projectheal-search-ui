import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <>
    <style type="text/css">
    {`
      .elem {
        margin: 10px;
        color: white;
      }
      .bg-nvBr {
        background: #003594;
      }

    `}
    </style>

    <Navbar bg="nvBr" data-bs-theme="light" expand="lg">
    <Container fluid>
      <div>
        <Navbar.Brand href="/" style={{color: "white"}}>Project HEAL</Navbar.Brand>
      </div>
      <div style={{display: "flex"}}>
        <div className='elem'><Nav.Link href="#">About</Nav.Link></div>
        <div className='elem'><Nav.Link href="#">Learn</Nav.Link></div>
        <div className='elem'><Nav.Link href="/insert">Contribute</Nav.Link></div>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
          <Button variant="outline-info">Search</Button>
        </Form>
      </div>
    </Container>
  </Navbar>
  </>
  ); 
};

export default Header;
