import React, { useEffect } from "react";
import {useState} from "react";
import { useMutation} from 'react-query';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const aossPostEndpoint = process.env.REACT_APP_API_ENDPOINT + '';

const xtoken = process.env.REACT_APP_GET_API_TOKEN + '';

interface IInsertHomeProps {
    statement: string;
    intent: string;
    severity: string;
    source: string;
}

function InsertHome() {

    const [inputPrompt, setInputPrompt] = useState("");
    const [initialRender, setInitialRender] = useState(true);

    const [intent, setIntent] = useState("");
    const [source, setSource] = useState("");
    const [severity, setSeverity] = useState("");
    
    
    const handleInputChange = (event:any) => {
      setInputPrompt(event.target.value);
    };
  
    const { mutate } = useMutation<void, Error, IInsertHomeProps>(
      async (dataToSend) => {
        const apiUrl = aossPostEndpoint;
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
    console.log(intent);
    console.log(severity);
    console.log(source);
    
    const dataToSend: IInsertHomeProps = {
      statement: inputPrompt,
      intent: intent,
      severity: severity,
      source: source
    };

    mutate(dataToSend, {
      onSuccess: (data) => {
        console.log('Mutation was successful', data);

      },
      onError: (error) => {
        console.error('There was an error:', error);
      },
    });
  };

  const handleSubmit = async (event: { preventDefault: () => void; currentTarget: any; }) => {

    event.preventDefault(); 
    const form = event.currentTarget;

    console.log("Intent:", form.formHorizontalIntentRadios.value);
    console.log("Severity:", form.formHorizontalSeverityRadios.value);
    console.log("Source:", form.formHorizontalSourceRadios.value);
    
    setIntent(form.formHorizontalIntentRadios.value);
    setSeverity(form.formHorizontalSeverityRadios.value);
    setSource(form.formHorizontalSourceRadios.value);

};
  
  useEffect(() => {
    if (initialRender) {
        setInitialRender(false);
        return;
      }

    console.log("Intent state:", intent);
    console.log("Severity state:", severity);
    console.log("Source state:", source);

    handleClick();
  }, [intent, severity, source]);

  return (
    <>
    <Form onSubmit={handleSubmit} style={{margin: "10px"}}>
      <Form.Group as={Row} className="mb-3" controlId="formHorizontalText" >
        <Form.Label column sm={2} style={{margin: "auto", fontWeight: "bold", textAlign: "center"}}>
          Statement
        </Form.Label>
        <Col sm={10}>
            <FloatingLabel controlId="floatingInput" label="Insert mis/disinformation threats">
                <Form.Control type="text" placeholder="Insert mis/disinformation threats" onChange={handleInputChange} required />
            </FloatingLabel>
          {/* <Form.Control type="text" placeholder="Insert mis/disinformation threats" /> */}
        </Col>
      </Form.Group>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2} style={{margin: "auto", fontWeight: "bold", textAlign: "center"}}>
            Intent
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Misinformation"
              value="Misinformation"
              name="formHorizontalIntentRadios"
              id="Misinformation-radio"
              required
            />
            <Form.Check
              type="radio"
              label="Disinformation"
              value="Disinformation"
              name="formHorizontalIntentRadios"
              id="Disinformation-radio" required
            />
            <Form.Check
              type="radio"
              label="Malinformation"
              value="Malinformation"
              name="formHorizontalIntentRadios"
              id="Malinformation-radio" required
            />
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2} style={{margin: "auto", fontWeight: "bold", textAlign: "center"}}>
            Severity
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="High"
              value="High"
              name="formHorizontalSeverityRadios"
              id="HighRadio" required
            />
            <Form.Check
              type="radio"
              label="Medium"
              value="Medium"
              name="formHorizontalSeverityRadios"
              id="MediumRadio"
              required
            />
            <Form.Check
              type="radio"
              label="Low"
              value="Low"
              name="formHorizontalSeverityRadios"
              id="LowRadio"
              required
            />
          </Col>
        </Form.Group>
      </fieldset>

      <fieldset>
        <Form.Group as={Row} className="mb-3">
          <Form.Label as="legend" column sm={2} style={{margin: "auto", fontWeight: "bold", textAlign: "center"}}>
            Source
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Twitter"
              value="Twitter"
              name="formHorizontalSourceRadios"
              id="TwitterRadio"
              required
            />
            <Form.Check
              type="radio"
              label="Reddit"
              value="Reddit"
              name="formHorizontalSourceRadios"
              id="RedditRadio"
              required
            />
            <Form.Check
              type="radio"
              label="Quora"
              value="Quora"
              name="formHorizontalSourceRadios"
              id="QuoraRadio"
              required
            />
          </Col>
        </Form.Group>
      </fieldset>


      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }}>
          <Button type="submit">Submit</Button>
        </Col>
      </Form.Group>
    </Form>
    </>
  ); 
};

export default InsertHome;
