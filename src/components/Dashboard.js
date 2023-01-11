import React from 'react';
import { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

function Dashboard(){
    const [data, setData] = useState('');

    useEffect(() => {
        getData();
        // eslint-disable-next-line
      }, []); 
    
      async function getData() {
        await fetch("http://localhost:8000/", 
        {
          method: "GET",
          headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            if(!response.ok){
                return response.text();
            }
            return response.json()
                .then((data) => {
                    setData(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
      }

    function sorter(data){
        let sorted;
            if(data){
                sorted = data.data.sort((p1, p2) => (p1.id > p2.id) ? 1 : (p1.id < p2.id) ? -1 : 0);
            }
        return sorted;
    }
    
    function RenderAccordion(data) {
        if(data){
            const RecursiveAccordion = ({ items, recurse = false}) => {
                return(
                    <Accordion className='p-3' key={items.id}>
                        {items.map((item, index) => {
                            var children = data.filter((a) => {
                                return a.parent === item.id;
                            })
        
                            var hasChildren = children.length > 0;
        
                            if(item.parent === null){
                                return(
                                    <div key={index}>
                                        {hasChildren &&(
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header>
                                                    {item.name}
                                                </Accordion.Header>
                                                {hasChildren &&(
                                                    <Accordion.Body>
                                                        <RecursiveAccordion items={children} recurse={true}/>
                                                    </Accordion.Body>
                                                )}
                                            </Accordion.Item>
                                        )}
                                        {!hasChildren && (
                                            <Card>
                                                <Card.Header>
                                                    {item.name}
                                                </Card.Header>
                                            </Card>
                                        )}
                                    </div>
                                );
                            }
                            if(recurse){   
                                return(
                                    <div key={index}>
                                        {hasChildren && (
                                            <Accordion.Item eventKey={index}>
                                                <Accordion.Header>
                                                    {item.name}
                                                </Accordion.Header>
                                                {hasChildren &&(
                                                    <Accordion.Body>
                                                        <RecursiveAccordion items={children} recurse={true}/>
                                                    </Accordion.Body>
                                                )}
                                            </Accordion.Item>
                                        )}
                                        {!hasChildren && (
                                            <Card>
                                                <Card.Header>
                                                    {item.name}
                                                </Card.Header>
                                            </Card>
                                        )}
                                    </div>
                                );
                            }
                            return null
                        })}
                    </Accordion>
                );
            };
            return <RecursiveAccordion items={data} recurse={false} />;
        }
    }
    
    return(
        <div className="p-5">
            <h1>Territories</h1>
            <p>Here are the list of territories</p>
            <Accordion style={{width: "50%"}} defaultActiveKey={['0']} alwaysOpen>
            </Accordion>
            <div style={{width: "80%"}}>
                {RenderAccordion(sorter(data))}
            </div>
        </div>
    )
}

export default Dashboard;