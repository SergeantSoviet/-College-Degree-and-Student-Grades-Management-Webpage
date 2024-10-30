// CohortModules.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function CohortModules() {
    const { cohortFlag } = useParams();
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/?delivered_to=${cohortFlag}`)
            .then(response => response.json())
            .then(data => {
                setModules(data);
            })
            .catch(error => {
                console.error('Error fetching modules:', error);
            });
    }, [cohortFlag]);

    return (
        <div>
            <CustomNavbar />
            <Container>
                <h1 className="text-center my-4">Modules for {cohortFlag}</h1>
                {modules.map(module => (
                    <Card className="mb-4" key={module.code}>
                        <Card.Body>
                            <Card.Title>{module.full_name}</Card.Title>
                            <Card.Text>
                                <p>Code: {module.code}</p>
                                <p>CA Split: {module.ca_split}</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
}

export default CohortModules;