import * as React from 'react';

import Card from 'react-bootstrap/Card';

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
              <Card  style={{ margin: '10px' }}>
                <Card.Header as="h5" style={{ color: '#003594' }}>{eachsamemisinfo.metadata.medicalcondition.join(', ')}</Card.Header>
                <Card.Body>
                  <Card.Title>{keyval}</Card.Title>
                </Card.Body>
              </Card>
            );
            }
          )}
          {Object.keys(similarmisinfo).map((key) => {
            const eachmisinfo = similarmisinfo[key];
            // console.log(eachmisinfo)

            return (               
              <Card  style={{ margin: '10px' }} key={key}>
                <Card.Header as="h5" style={{ color: '#003594' }}>{eachmisinfo.metadata.medicalcondition.join(', ')}</Card.Header>
                <Card.Body>
                  <Card.Title>{key}</Card.Title>
                </Card.Body>
              </Card>
            );
          })}
        </>
    );
};

export default Display;


     