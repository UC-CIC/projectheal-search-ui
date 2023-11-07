import * as React from 'react';

import Card from 'react-bootstrap/Card';

interface IHomeProps {
  misinfo: any;
}

// const Home: React.FunctionComponent<IHomeProps> = ({misinfoId, misinfoTitle, misinfoTopic, misinfoRisk, misinfoDisease, misinfoMetadata}) => {
const Home: React.FunctionComponent<IHomeProps> = ({misinfo}) => {

  console.log(misinfo)

    return(
        <>
          {Object.keys(misinfo).map((key) => {
            const eachmisinfo = misinfo[key];
            console.log(eachmisinfo)

            return (
              <Card key={key}>
                <Card.Header as="h5" style={{ color: '#003594' }}>{eachmisinfo.metadata.medicalcondition.join(', ')}</Card.Header>
                <Card.Body>
                  <Card.Title>{key}</Card.Title>
                  {/* <Card.Text>
                    {eachmisinfo.metadata.medicalcondition.join(', ')}
                  </Card.Text> */}
                </Card.Body>
              </Card>
            );
          })}
        </>
    );
};

export default Home;


     