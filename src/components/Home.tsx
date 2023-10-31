import * as React from 'react';
import {useState, useEffect} from "react";
import {useQuery} from 'react-query';

const apiServerUrl = process.env.REACT_APP_HELLO_API_ENDPOINT + '';
const xtoken = process.env.REACT_APP_GET_API_TOKEN + '';

interface IHomeProps {
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {

    const fetchData = async () => {
      const settings = {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'x-api-key': xtoken,
        },
      }
      const response = await fetch(apiServerUrl,settings);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    };

    const { data, isLoading, error } = useQuery("myData", fetchData, {
      enabled: true, 
    });


    // useEffect(() => {
    //   if (data) {
    //     console.log("API call result:", data);
    //   }
    // }, [data]);

    return(
        <>
        {JSON.stringify(data)}
        </>
    );
};

export default Home;


     