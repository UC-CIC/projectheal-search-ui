import {useState} from "react";
import {useMutation} from 'react-query';
import '../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Sidenav from './Sidenav';
import Display from './Display';
import Spinner from 'react-bootstrap/Spinner';

const xtoken = process.env.REACT_APP_GET_API_TOKEN + '';
const aossSearchEndpoint = process.env.REACT_APP_SEARCH_API_ENDPOINT + '';

interface PostData {
  statement: string;
  intent: string;
  severity: string;
  source: string;
  medicalConditions: string[] | null;
  topics: string[] | null;
}

interface FilterValues {
  medicalConditions: string[] | null;
  intent: string | null;
  source: string | null;
  severity: string | null;
  topics: string[] | null;
}

function Home() {

  const [inputPrompt, setInputPrompt] = useState("");
  const [samedata, setSamedata] = useState<any | null>(null);
  const [similardata, setSimilardata] = useState<any | null>(null);
  const [intent, setIntent] = useState<string>('');
  const [source, setSource] =  useState<string>('');
  const [severity, setSeverity] =  useState<string>('');
  const [topics, setTopics] =  useState<string[]>([]);

  const [metadata, setMetadata] =  useState<string[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({ medicalConditions: [], intent: '', source: '', severity:'', topics: [] });

  
  const handleInputChange = (event:any) => {
    setInputPrompt(event.target.value);
  };

  const { mutate, isLoading } = useMutation<void, Error, PostData>(
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
      // console.log(response)
      return await response.json(); 
    }
  );


  const handleClick = () => {
    // console.log(inputPrompt);

    const dataToSend: PostData = {
      statement: inputPrompt,
      intent: intent,
      severity: severity,
      source: source,
      topics: topics,
      medicalConditions: metadata
    };
    // console.log(dataToSend)
    mutate(dataToSend, {
      onSuccess: (data) => {
        // console.log('Mutation was successful', data);
        if (data?.["Search response"]!==''){
          // console.log(data?.["Search response"]);
          setSamedata(data?.["Search response"][0])
          setSimilardata(data?.["Search response"][1])
        }
        else {
          // console.log(data);
          // setSamedata({"No matching results": ""})
          // setSimilardata({"No matching results": ""})
        }
      },
      onError: (error) => {
        console.error('There was an error:', error);
      },
    });
  };

  const handleFilterValuesChange = (newFilterValues: any) => {
    setFilterValues(newFilterValues);

    setMetadata(newFilterValues.medicalConditions !== null ? newFilterValues.medicalConditions : []);
    setIntent(newFilterValues.intent !== null ? newFilterValues.intent : '');
    setSource(newFilterValues.source !== null ? newFilterValues.source : '');
    setSeverity(newFilterValues.severity !== null ? newFilterValues.severity : '');
    setTopics(newFilterValues.topics !== null ? newFilterValues.topics : []);
    // console.log(newFilterValues);
  };


  return (
    <>
    
      <Container fluid>
        <Row className="page-layout__content">
          <h2 style={{color: "#003594", fontWeight: "bold"}}>Search & browse for mis/disinformation threats</h2>
        </Row>
        <Row>
          <Col sm={5}>
            <InputGroup>
              <Form.Control type="text" placeholder="Search for a mis/disinformation threat by keyword(s)" onChange={handleInputChange}/>
              <Button id="button-addon1" onClick={handleClick} style={{ backgroundColor: '#003594'}}>Search</Button>
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
            <Sidenav  onFilterValuesChange={handleFilterValuesChange}/>
          </Col>
          <Col sm={9}>
            {isLoading && <center><Spinner animation="border" variant="secondary" /></center>}
            {similardata &&
              <Display samemisinfo={samedata} similarmisinfo={similardata} />
            }
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
