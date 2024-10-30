// CohortDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function CohortDetail() {
    const { cohortFlag } = useParams();
    const [cohort, setCohort] = useState({});

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/cohort/${cohortFlag}/`)
            .then(response => response.json())
            .then(data => {
                setCohort(data);
            })
            .catch(error => {
                console.error('Error fetching cohort:', error);
            });
    }, [cohortFlag]);

    return (
        <div>
            <CustomNavbar />
            {cohort && (
                <Card style={{ width: '30rem', margin: '0 auto', marginTop: '2rem' }}>
                    <Card.Body>
                        <Card.Title>{cohort.name}</Card.Title>
                        <Card.Text>
                            Year: {cohort.year}
                        </Card.Text>
                        <Card.Text>
                            Degree: {cohort.degree ? cohort.degree.split('/')[5] : 'Loading...'}
                        </Card.Text>
                        <Card.Text>
                            ID: {cohort.id}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/cohorts">
                    <Button variant="primary">Back to Cohorts</Button>
                </Link>
                <Link to={`/students/list/${cohortFlag}`}>
                    <Button variant="primary" style={{ marginLeft: '1rem' }}>See All Students</Button>
                </Link>
            </div>
        </div>
    );
}

export default CohortDetail;