import * as React from 'react';

import Card from 'react-bootstrap/Card';

interface IHomeProps {
  misinfoId: string;
  misinfoTitle: string;
  misinfoTopic: string;
  misinfoRisk: string;
  misinfoDisease: string;
  misinfoMetadata: string;
}

const Home: React.FunctionComponent<IHomeProps> = ({misinfoId, misinfoTitle, misinfoTopic, misinfoRisk, misinfoDisease, misinfoMetadata}) => {

    // useEffect(() => {
    //   if (data) {
    //     console.log("API call result:", data);
    //   }
    // }, [data]);

    return(
        <>
        <Card>
          <Card.Header as="h5">{misinfoMetadata}</Card.Header>
          <Card.Body>
            <Card.Title>{misinfoTitle}</Card.Title>
            <Card.Text>
              {misinfoTopic}
            </Card.Text>
          </Card.Body>
        </Card>
        
        {/* {JSON.stringify(data)} */}
        </>
    );
};

export default Home;


     