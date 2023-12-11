import * as React from 'react';
import { Chip } from '@mui/material';
import { Card, ListGroup } from 'react-bootstrap';

interface IDisplayProps {
  samemisinfo: any;
  similarmisinfo: any;
}

// const Display: React.FunctionComponent<IDisplayProps> = ({misinfoId, misinfoTitle, misinfoTopic, misinfoRisk, misinfoDisease, misinfoMetadata}) => {
const Display: React.FunctionComponent<IDisplayProps> = ({samemisinfo, similarmisinfo}) => {

    return(
        <>
          

          {samemisinfo && Object.keys(samemisinfo).map((keyval) => {
            const eachsamemisinfo = samemisinfo[keyval];
            // console.log(eachsamemisinfo)
            return  (

              <Card style={{ margin: '10px' }}>
                
                {eachsamemisinfo.metadata.medicalcondition && <Card.Header as="h5" style={{ color: '#003594' }}><Chip label={eachsamemisinfo.metadata.medicalcondition.join(', ')} /></Card.Header>}
                <Card.Body>
                  <Card.Title>{keyval}</Card.Title>
                </Card.Body>
                <ListGroup variant="flush">
                {Object.keys(similarmisinfo).map((key) => {
                  const eachmisinfo = similarmisinfo[key];                  
                  return (
                    <ListGroup.Item key={key}>
                      {key}
                      {/* Add related statement metadata if available */}
                    </ListGroup.Item>)}
                  )
                }
                </ListGroup>
              </Card>
            );
            }
          )}
        </>
    );
};

export default Display;


     