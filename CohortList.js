// CohortList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function CohortList() {
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cohort/')
            .then(response => response.json())
            .then(data => {
                setCohorts(data);
            })
            .catch(error => {
                console.error('Error fetching cohorts:', error);
            });
    }, []);

    return (
        <div>
            <CustomNavbar />
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Cohort List</h1>
            <Container>
                <Row>
                    {cohorts.map(cohort => (
                        <Col md={4} key={cohort.id}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <Card.Title><Link to={`/cohorts/${cohort.id}`}>{cohort.name}</Link></Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Row>
                    <Col className="text-center">
                        <Link to="/create-cohort">
                            <Button variant="primary">Create Cohort</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CohortList;