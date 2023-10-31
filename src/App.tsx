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

const aossPostEndpoint = process.env.REACT_APP_API_ENDPOINT + '';
const titanApikey = process.env.REACT_APP_X_API_TOKEN + '';

const apiServerUrl = process.env.REACT_APP_HELLO_API_ENDPOINT + '';
const xtoken = process.env.REACT_APP_GET_API_TOKEN + '';

const fetchData = async () => {
  const oldsettings = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-api-key': xtoken,
    },
  }
  const response = await fetch(apiServerUrl,oldsettings);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function App() {

  const [inputPrompt, setInputPrompt] = useState("");
  const handleInputChange = (event:any) => {
    setInputPrompt(event.target.value);
  };

  const { mutate: getStatement }  = useMutation({
    mutationFn: async (
          apiInput: string
    ) => {
      let statementInput = {"statement": apiInput}
      const settings = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': titanApikey
        },
        body: JSON.stringify(statementInput)
      }

      console.log(settings)
      const response = await fetch(aossPostEndpoint, settings);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log(response)
      return response.json();
    },
      onSuccess: () => console.log("Bedrock API Call")
  });

  const handleClick = () => {
    console.log(inputPrompt);
    getStatement(inputPrompt);
  };

  const { data, isLoading, error } = useQuery("myData", fetchData, {
    enabled: true, // Prevents the query from running automatically
  });

  useEffect(() => {
    if (data) {
      console.log("API call result:", data);
    }
  }, [data]);

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
            <Home misinfoId='1' misinfoTitle='Title' misinfoRisk='Risk' misinfoDisease='Disease' misinfoTopic='Topic' misinfoMetadata='Metadata'/>
          </Col>
        </Row>
      </Container>
      
    </>
  );
}

export default App;
