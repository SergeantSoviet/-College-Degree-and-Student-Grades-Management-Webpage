// ModuleDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function ModuleDetail() {
    const { code } = useParams();
    const [module, setModule] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/module/${code}/`)
            .then(response => response.json())
            .then(data => {
                setModule(data);
            })
            .catch(error => {
                console.error('Error fetching module:', error);
                setError(error);
            });
    }, [code]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!module) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <CustomNavbar />
            {module && (
                <Card style={{ width: '30rem', margin: '0 auto', marginTop: '2rem' }}>
                    <Card.Body>
                        <Card.Title>{module.full_name}</Card.Title>
                        <Card.Text>
                            <p>Code: {module.code}</p>
                            <p>Delivered to: {module.delivered_to.map(url => {
                                const cohort = url.split('/').slice(-2, -1)[0];
                                return <Link key={cohort} to={`/cohorts/${cohort}/modules`}>{cohort}</Link>;
                            }).reduce((prev, curr, index) => {
                                return index !== 0 ? [prev, ', ', curr] : [curr];
                            }, [])}</p>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/modules">
                    <Button variant="primary">Back to Modules</Button>
                </Link>
            </div>
        </div>
    );
}

export default ModuleDetail;