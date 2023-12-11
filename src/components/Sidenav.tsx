import React, { createContext, useContext, ReactNode } from 'react';
import { useState, useEffect } from 'react';
import {useQuery} from 'react-query';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

const options = [
  {
    name: 'Disable backdrop',
    scroll: true,
    backdrop: false,
  }];

interface SidenavProps {
  onFilterValuesChange: (newFilterValues: Record<string, string | string[] | null>) => void;

}

  
const xtoken = process.env.REACT_APP_GET_API_TOKEN + '';
const aossSearchAllEndpoint = process.env.REACT_APP_SEARCH_ALL_API_ENDPOINT + '';
const uniqueMedicalConditionsSet = new Set();
const uniqueTopicsSet = new Set();

const getAll = async () => {
  const apiSearchAllUrl = aossSearchAllEndpoint;
  const settings = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'x-api-key': xtoken,
    },
  }
  const response = await fetch(apiSearchAllUrl, settings);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};


const Sidenav: React.FunctionComponent<SidenavProps> = ({onFilterValuesChange}) => {

  const [topicopen, setTopicopen] = useState(false);
  const [diseaseopen, setDiseaseopen] = useState(false);
  const [intentopen, setIntentopen] = useState(false);  
  const [sourceopen, setSourceopen] = useState(false);
  const [severityopen, setSeverityopen] = useState(false);
  const [selectedMedicalConditions, setSelectedMedicalConditions] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const [checkboxState, setCheckboxState] = useState({
    misinformation: false,
    disinformation: false,
    malinformation: false,
    quora: false,
    twitter: false,
    reddit: false,
  });
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const handleseverityRadioChange = (value: string) => {
    setSelectedSeverity(value);
  };

  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const handleIntentRadioChange = (value: string) => {
    setSelectedIntent(value);
  };

  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const handleSourceRadioChange = (value: string) => {
    setSelectedSource(value);
  };


  const {data, error, isLoading} = useQuery('allResults', getAll);
  
  useEffect(() => {
    if (data) {
      console.log("API call result:", data);
      console.log(data["All results"]["hits"]["hits"])

      const hits = data["All results"]["hits"]["hits"];

      hits.forEach((eachRes: any) => {
        const medicalConditions = eachRes["_source"]["metadata"]["medicalcondition"];
        if (Array.isArray(medicalConditions)) {
          medicalConditions.forEach((condition) => {
            uniqueMedicalConditionsSet.add(condition);
          });
        }
        const topics = eachRes["_source"]["background"]["topic"];
        if (Array.isArray(topics)) {
          topics.forEach((topic) => {
            uniqueTopicsSet.add(topic);
          });
        }
      });
    }
    else  {
      console.log("No");
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleMedicalCheckboxChange = (condition: string) => {
    setSelectedMedicalConditions((prevSelected: string[]) => prevSelected.includes(condition)
        ? prevSelected.filter((c) => c !== condition)
        : [...prevSelected, condition]
    );
  };

  const handleTopicCheckboxChange = (condition: string) => {
    setSelectedTopics((prevSelected: string[]) => prevSelected.includes(condition)
        ? prevSelected.filter((c) => c !== condition)
        : [...prevSelected, condition]
    );
  };
  const handleFilterClick = () => {
    const filtersObject: Record<string, string | string[] | null> = {
      'medicalConditions': selectedMedicalConditions,
      'intent': selectedIntent,
      'source': selectedSource,
      'severity': selectedSeverity,
      'topics': selectedTopics
    };
  
    // console.log(filtersObject);
    onFilterValuesChange(filtersObject);
  };

  const handleClearFilterClick = () => {
    setSelectedIntent(null)
    setSelectedSource(null)
    setSelectedSeverity(null)
    setSelectedMedicalConditions([])
    setSelectedTopics([])

  };


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
              {Array.from(uniqueTopicsSet).map((topic) => (
                <Form.Check key={topic as React.Key} type="checkbox" id={`${topic}-checkbox`}
                  label={topic as string} checked={selectedTopics.includes(topic as string)}
                  onChange={() => handleTopicCheckboxChange(topic as string)}
                />
              ))}
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button  variant="purp" onClick={() => setDiseaseopen(!diseaseopen)} aria-controls="example-collapse-text" aria-expanded={diseaseopen}>Disease</Button>
          <Collapse in={diseaseopen}> 
            <Form>
              {Array.from(uniqueMedicalConditionsSet).map((condition) => (
                <Form.Check key={condition as React.Key} type="checkbox" id={`${condition}-checkbox`}
                  label={condition as string} checked={selectedMedicalConditions.includes(condition as string)}
                  onChange={() => handleMedicalCheckboxChange(condition as string)}
                />
              ))}
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button  variant="purp" onClick={() => setIntentopen(!intentopen)} aria-controls="example-collapse-text" aria-expanded={intentopen}>Intent</Button>
          <Collapse in={intentopen}>
            <Form>
              <div key='default-radio' className="mb-3">
                  <Form.Check type="radio" id="Misinformation-radio" label="Misinformation" checked={selectedIntent === 'misinformation'} onChange={() => handleIntentRadioChange('misinformation')} />
                  <Form.Check type="radio" id="Disinformation-radio" label="Disinformation" checked={selectedIntent === 'disinformation'} onChange={() => handleIntentRadioChange('disinformation')} />
                  <Form.Check type="radio" id="Malinformation-radio" label="Malinformation" checked={selectedIntent === 'malinformation'} onChange={() => handleIntentRadioChange('malinformation')} />
              </div>
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button variant="purp" onClick={() => setSourceopen(!sourceopen)} aria-controls="example-collapse-text" aria-expanded={sourceopen}>Source</Button>
          <Collapse in={sourceopen}>
            <Form>
              <div key='source-radio' className="mb-3">
                  <Form.Check type="radio" id="Twitter-radio" label="Twitter" checked={selectedSource === 'twitter'} onChange={() => handleSourceRadioChange('twitter')} />
                  <Form.Check type="radio" id="Reddit-radio" label="Reddit" checked={selectedSource === 'reddit'} onChange={() => handleSourceRadioChange('reddit')} />
                  <Form.Check type="radio" id="Quora-radio" label="Quora" checked={selectedSource === 'quora'} onChange={() => handleSourceRadioChange('quora')} />
              </div>
            </Form>
          </Collapse>
        </div>
        <div style={{margin: "2px"}}>
          <Button variant="purp" onClick={() => setSeverityopen(!severityopen)} aria-controls="example-collapse-text" aria-expanded={severityopen}>Severity</Button>
          <Collapse in={severityopen}>
            <Form>
              <div key='severity-radio' className="mb-3">
                  <Form.Check type="radio" id="High-radio" label="High" checked={selectedSeverity === 'high'} onChange={() => handleseverityRadioChange('high')} />
                  <Form.Check type="radio" id="Medium-radio" label="Medium" checked={selectedSeverity === 'medium'} onChange={() => handleseverityRadioChange('medium')} />
                  <Form.Check type="radio" id="Low-radio" label="Low" checked={selectedSeverity === 'low'} onChange={() => handleseverityRadioChange('low')} />
              </div>
            </Form>
          </Collapse>
        </div>
        <div>
          <Button variant="secondary" style={{width: '50%'}} onClick={handleFilterClick}>Apply filters</Button>
          <Button variant="secondary" style={{width: '50%'}} onClick={handleClearFilterClick}>Clear Filters</Button>
        </div>
    </>
  );
};

export default Sidenav;
