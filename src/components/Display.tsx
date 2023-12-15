import * as React from 'react';
import { Chip } from '@mui/material';
import { Card, ListGroup } from 'react-bootstrap';

interface EachSamemisinfo {
  [key: string]: {
    metadata: {
      medicalcondition: string[]
    };
    background: {
      severity: string;
      source: string;
      intent: string;
      topic: string[];
    }
  };
}

interface EachSimilarmisinfo {
  [key: string]: {
    [innerKey: string]: unknown;
  };
}

interface IDisplayProps {
  samemisinfo: Record<string, EachSamemisinfo>;
  similarmisinfo: Record<string, EachSimilarmisinfo>;
}

// interface IDisplayProps {
//   samemisinfo: any;
//   similarmisinfo: any;
// }

// const Display: React.FunctionComponent<IDisplayProps> = ({misinfoId, misinfoTitle, misinfoTopic, misinfoRisk, misinfoDisease, misinfoMetadata}) => {
const Display: React.FunctionComponent<IDisplayProps> = ({samemisinfo, similarmisinfo}) => {
  console.log(samemisinfo)
  console.log(similarmisinfo)
    return(
        <>
                    
          {samemisinfo && Object.entries(samemisinfo).map(([outerKey, eachsamemisinfo]: [string, EachSamemisinfo]) => {
            // const eachsamemisinfo = samemisinfo[keyval];
            return Object.entries(eachsamemisinfo).map(([key, value] : [string, any]) => {

              return  (  
                <Card style={{ margin: '10px' }}  key={key}>
                    {value.metadata.medicalcondition && <Card.Header as="h5" style={{ color: '#003594' }}><Chip label={value.metadata.medicalcondition.join(', ')} /></Card.Header>}
                  <Card.Body>
                    <Card.Title>{key}</Card.Title>
                  </Card.Body>
                  <ListGroup variant="flush">
                  {Object.keys(similarmisinfo[outerKey]).map((similarKey) => {
                    const eachmisinfo = similarmisinfo[similarKey];                  
                    return (
                      <ListGroup.Item key={similarKey}>
                        {similarKey}
                      </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                </Card>
              );
            });
          })}
        </>
    );
};

export default Display;


     