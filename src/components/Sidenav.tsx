import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

const options = [
  {
    name: 'Disable backdrop',
    scroll: true,
    backdrop: false,
  }];

interface ISidenavProps {
}

const Sidenav: React.FunctionComponent<ISidenavProps> = (props) => {

  const [topicopen, setTopicopen] = useState(false);
  const [diseaseopen, setDiseaseopen] = useState(false);
  const [intentopen, setIntentopen] = useState(false);  
  const [sourceopen, setSourceopen] = useState(false);
  const [severityopen, setSeverityopen] = useState(false);
  return (
    <>
    <style type="text/css">
      {`
        .btn-purp {
          background-color:#326ee94d;
          color: black;
          width: 100%;
        }
      `}
    </style>


        <div style={{margin: "2px"}}>
          <Button  variant="purp" onClick={() => setTopicopen(!topicopen)} aria-controls="example-collapse-text" aria-expanded={topicopen}>Topic</Button>
          <Collapse in={topicopen}>
            <Form>
              <div key='default-checkbox' className="mb-3">
                  <Form.Check type="checkbox" id="Vaccines-checkbox" label="Vaccines" />
                  <Form.Check type="checkbox" id="Treatments-checkbox" label="Treatments" />
                  <Form.Check type="checkbox" id="Diseases-checkbox" label="Diseases" />
              </div>
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button  variant="purp" onClick={() => setDiseaseopen(!diseaseopen)} aria-controls="example-collapse-text" aria-expanded={diseaseopen}>Disease</Button>
          <Collapse in={diseaseopen}> 
            <Form>
              <div key='default-checkbox' className="mb-3">
                  <Form.Check type="checkbox" id="Vaccines-checkbox" label="Cancer" />
                  <Form.Check type="checkbox" id="Treatments-checkbox" label="H1N1" />
                  <Form.Check type="checkbox" id="Diseases-checkbox" label="COVID" />
              </div>
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button  variant="purp" onClick={() => setIntentopen(!intentopen)} aria-controls="example-collapse-text" aria-expanded={intentopen}>Intent</Button>
          <Collapse in={intentopen}>
            <Form>
              <div key='default-checkbox' className="mb-3">
                  <Form.Check type="checkbox" id="Misinformation-checkbox" label="Misinformation" />
                  <Form.Check type="checkbox" id="Disinformation-checkbox" label="Disinformation" />
                  <Form.Check type="checkbox" id="Malinformation-checkbox" label="Malinformation" />
              </div>
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button variant="purp" onClick={() => setSourceopen(!sourceopen)} aria-controls="example-collapse-text" aria-expanded={sourceopen}>Source</Button>
          <Collapse in={sourceopen}>
            <Form>
              <div key='default-checkbox' className="mb-3">
                  <Form.Check type="checkbox" id="Twitter-checkbox" label="Twitter" />
                  <Form.Check type="checkbox" id="Reddit-checkbox" label="Reddit" />
                  <Form.Check type="checkbox" id="Quora-checkbox" label="Quora" />
              </div>
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button variant="purp" onClick={() => setSeverityopen(!severityopen)} aria-controls="example-collapse-text" aria-expanded={severityopen}>Severity</Button>
          <Collapse in={severityopen}>
            <Form>
              <div key='default-checkbox' className="mb-3">
                  <Form.Check type="checkbox" id="High-checkbox" label="High" />
                  <Form.Check type="checkbox" id="Medium-checkbox" label="Medium" />
                  <Form.Check type="checkbox" id="Low-checkbox" label="Low" />
              </div>
            </Form>
          </Collapse>
        </div>
    </>
  );
};

export default Sidenav;
