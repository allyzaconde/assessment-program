import React from 'react';
import { useContext, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


function Dashboard(){


    useEffect(() => {
        getData();
        // eslint-disable-next-line
      }, []); 
    
      async function getData() {
        await fetch("https://netzwelt-devtest.azurewebsites.net/Territories/All", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
          .then((response) => {
            if(!response.ok){

              return response.text();
            }
            return response.json()
            .then((data) => {
              console.log(data)
            })
            .catch((error) => {
              console.log(error);
            });
          })
      }
    return(
        <>
            <h1>Territories</h1>
            <p>Here are the list of territories</p>
            <Card>
                <Card.Body>
                    <Card.Title>
                        Hello
                    </Card.Title>
                </Card.Body>
            </Card>
            <Accordion defaultActiveKey={['0']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        Item 1
                    </Accordion.Header>
                    <Accordion.Body>
                        hello
                    </Accordion.Body>
                </Accordion.Item>       
                <Accordion.Item eventKey="1">
                    <Accordion.Header>
                        Item 2
                    </Accordion.Header>
                    <Accordion.Body>
                        hey
                    </Accordion.Body>
                </Accordion.Item>         
            </Accordion>
        </>
    )
}

export default Dashboard;