import React from 'react';
import { Misinfo } from './models/misinfo.model';
import {useState, useEffect} from "react";
import {useQuery, useMutation} from 'react-query';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Header from './components/Header';
import Sidenav from './components/Sidenav';
import Home from './components/Home';
import Card from 'react-bootstrap/Card';

const aossPostEndpoint = process.env.REACT_APP_API_ENDPOINT + '';

const apiServerUrl = process.env.REACT_APP_HELLO_API_ENDPOINT + '';
const xtoken = process.env.REACT_APP_GET_API_TOKEN + '';
const aossSearchEndpoint = process.env.REACT_APP_SEARCH_API_ENDPOINT + '';

interface PostData {
  statement: string;
}


function App() {


  const [inputPrompt, setInputPrompt] = useState("");
  const [data, setData] = useState<any | null>(null);
  
  
  const handleInputChange = (event:any) => {
    setInputPrompt(event.target.value);
  };

  const { mutate } = useMutation<void, Error, PostData>(
    async (dataToSend) => {
      const apiUrl = aossSearchEndpoint;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': xtoken
        },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log(response)
      return await response.json(); 
    }
  );
  


  const handleClick = () => {
    console.log(inputPrompt);
    const dataToSend: PostData = {
      statement: inputPrompt,
    };

    mutate(dataToSend, {
      onSuccess: (data) => {
        console.log('Mutation was successful', data);
        console.log(data?.["Exact match"][1][0]);
        setData(data?.["Exact match"][1][0])
      },
      onError: (error) => {
        console.error('There was an error:', error);
      },
    });
  };


  return (
    <>
    
      <Header />
      <Container fluid>
        <Row className="page-layout__content">
          <h2 style={{color: "#003594", fontWeight: "bold"}}>Search & browse for mis/disinformation threats</h2>
        </Row>
        <Row>
          <Col sm={5}>
            <InputGroup>
              <Form.Control type="text" placeholder="Search for a mis/disinformation threat by keyword(s)" onChange={handleInputChange}/>
              <Button variant="outline-secondary" id="button-addon1"  onClick={handleClick}>Search</Button>
            </InputGroup>
          </Col>
          <Col sm={5}>
          </Col>
        </Row>
        {/* <Row>
          {JSON.stringify(data)}
        </Row> */}
        <Row>
          <Col sm={3}>
            FILTER
          </Col>
          <Col sm={9}>
            VIEW SORT
          </Col>
        </Row>
        <Row>
          <Col sm={3}>
            <Sidenav />
          </Col>
          <Col sm={9}>
          {data &&
            <Home misinfo={data} />
          }
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default App;
