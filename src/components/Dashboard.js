import React from 'react';
import { useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';

function Dashboard(){

    const test = [{"id":"101","name":"Manila","parent":"1"},{"id":"1","name":"Metro Manila","parent":null},{"id":"10101","name":"Malate","parent":"101"},{"id":"10102","name":"Ermita","parent":"101"},{"id":"10103","name":"Binondo","parent":"101"},{"id":"102","name":"Makati","parent":"1"},{"id":"10201","name":"Poblacion","parent":"102"},{"id":"10202","name":"Bel-Air","parent":"102"},{"id":"10203","name":"San Lorenzo","parent":"102"},{"id":"10204","name":"Urdaneta","parent":"102"},{"id":"103","name":"Marikina","parent":"1"},{"id":"10301","name":"Sto Nino","parent":"103"},{"id":"10302","name":"Malanday","parent":"103"},{"id":"10303","name":"Concepcion I","parent":"103"},{"id":"2","name":"CALABARZON","parent":null},{"id":"201","name":"Laguna","parent":"2"},{"id":"20101","name":"Calamba","parent":"201"},{"id":"20102","name":"Sta. Rosa","parent":"201"},{"id":"202","name":"Cavite","parent":"2"},{"id":"20201","name":"Kawit","parent":"202"},{"id":"203","name":"Batangas","parent":"2"},{"id":"20301","name":"Lipa","parent":"203"},{"id":"20302","name":"Tanauan","parent":"203"},{"id":"3","name":"Central Luzon","parent":null},{"id":"301","name":"Bulacan","parent":"3"},{"id":"302","name":"Nueva Ecija","parent":"3"},{"id":"303","name":"Tarlac","parent":"3"},{"id":"304","name":"Pampanga","parent":"3"}];
    let sorted = test.sort((p1, p2) => (p1.id > p2.id) ? 1 : (p1.id < p2.id) ? -1 : 0);

    useEffect(() => {
        // getData();
        // eslint-disable-next-line
      }, []); 
    
      async function getData() {
        
        await fetch("https://netzwelt-devtest.azurewebsites.net/Territories/All", 
        {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          },
        })
        
          .then((response) => {
            if(!response.ok){
                console.log(response)
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
    
      function RenderAccordion() {
        const RecursiveAccordion = ({ items, recurse = false}) => {
            return(
                <Accordion className='p-3' key={items.id}>
                    {items.map((item, index) => {
                        var children = sorted.filter((a) => {
                            return a.parent === item.id;
                        })
    
                        var hasChildren = children.length > 0;
    
                        if(item.parent === null){
                            return(
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>
                                        {item.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {hasChildren &&(
                                            <div>
                                                <RecursiveAccordion items={children} recurse={true}/>
                                            </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>

                            );
                        }
                        if(recurse){   
                            return(
                                <Accordion.Item eventKey={index}>
                                    <Accordion.Header>
                                        {item.name}
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {hasChildren &&(
                                            <div>
                                                <RecursiveAccordion items={children} recurse={true}/>
                                            </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            );
                        }
                    })}
                </Accordion>
            );
        };
        return <RecursiveAccordion items={sorted} recurse={false} />;
      }
    
    return(
        <div className="p-5">
            <h1>Territories</h1>
            <p>Here are the list of territories</p>
            <Accordion style={{width: "50%"}} defaultActiveKey={['0']} alwaysOpen>
            </Accordion>
            <div style={{width: "80%"}}>
                {RenderAccordion()}
            </div>
            
        </div>
    )
}

export default Dashboard;