import React from 'react';
import { Misinfo } from './models/misinfo.model';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Header from './components/Header';
import Sidenav from './components/Sidenav';
import Home from './components/Home';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();


function App() {
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Header />
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Sidenav />
          </Col>
          <Col sm={8}>
            <Home />
          </Col>
        </Row>
      </Container>
      
    </QueryClientProvider>
    </>
  );
}

export default App;
