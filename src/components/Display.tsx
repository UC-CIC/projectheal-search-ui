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

const Display: React.FunctionComponent<IDisplayProps> = ({samemisinfo, similarmisinfo}) => {

  const getChipColor = (feature: string): string => {
    // console.log(feature)
    const colorMap: Record<string, string> = {
      'medicalcondition': '#86A5BF', 
      'high': '#F95743 ', 
      'intent': '#F99343',
      'low': '#B1F786',
      'medium': '#F1E36B',
      'severity': '#EDB1FA',
      'source': '#A5D7D6',
      'score': '#BD86BF',
    };

    // Return the color based on the feature value or a default color
    return colorMap[feature] || '#808080'; // Default to gray if no mapping is found
  };
  // console.log(samemisinfo)
  // console.log(similarmisinfo)
    return(
        <>
                    
          {samemisinfo && Object.entries(samemisinfo).map(([outerKey, eachsamemisinfo]: [string, EachSamemisinfo]) => {
            return Object.entries(eachsamemisinfo).map(([key, value] : [string, any]) => {

              return  (  
                <Card style={{ margin: '10px' }}  key={key}>
                  <Card.Header as="h5" style={{ color: '#003594' }}>
                    {value.background.intent && <Chip
                      label={value.background.intent}
                      style={{ backgroundColor: getChipColor("intent"), fontWeight: "bold" }}
                    />}
                    {value.background.severity && <Chip
                      label={value.background.severity}
                      style={{ backgroundColor: getChipColor(value.background.severity), fontWeight: "bold" }}
                    />}
                    {value.background.source && <Chip
                      label={value.background.source}
                      style={{ backgroundColor: getChipColor("source"), fontWeight: "bold" }}
                    />}
                    {value.metadata.medicalcondition && <Chip
                      label={value.metadata.medicalcondition.join(', ')}
                      style={{ backgroundColor: getChipColor("medicalcondition"), fontWeight: "bold" }}
                    />}
                    {value.score && <Chip
                      label={`Score: ${value.score}`}
                      style={{ backgroundColor: getChipColor("score"), fontWeight: "bold" }}
                    />}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{key}</Card.Title>
                  </Card.Body>
                  <ListGroup variant="flush">
                  {similarmisinfo && Object.keys(similarmisinfo[outerKey]).map((similarKey) => {
                    // const eachmisinfo = similarmisinfo[similarKey];                  
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


     