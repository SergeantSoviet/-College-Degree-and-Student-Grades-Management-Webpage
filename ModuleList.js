// ModuleList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function ModuleList() {
    const [modules, setModules] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/module/')
            .then(response => response.json())
            .then(data => {
                setModules(data);
            })
            .catch(error => {
                console.error('Error fetching modules:', error);
            });
    }, []);

    return (
        <div>
            <CustomNavbar />
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Module List</h1>
            <Container>
                <Row>
                    {modules.map(module => (
                        <Col md={4} key={module.code}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title><Link to={`/modules/${module.code}`}>{module.full_name}</Link></Card.Title>
                                    <Card.Text>Delivered to: {module.delivered_to.map(url => url.split('/').slice(-2, -1)).join(', ')}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col className="text-center">
                        <Link to="/create-module">
                            <Button variant="primary">Create Module</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ModuleList;