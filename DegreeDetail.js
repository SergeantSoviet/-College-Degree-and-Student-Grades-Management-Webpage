// DegreeDetail.js
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, ListGroup, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function DegreeDetail() {
    const { shortcode } = useParams();
    const [degree, setDegree] = useState(null);
    const [cohorts, setCohorts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/degree/${shortcode}`)
            .then(response => response.json())
            .then(data => {
                setDegree(data);
            });

        fetch(`http://127.0.0.1:8000/api/cohort/?degree=${shortcode}`)
            .then(response => response.json())
            .then(data => {
                setCohorts(data);
            });
    }, [shortcode]);

    return (
        <div>
            <CustomNavbar />
            {degree && (
                <Card style={{ width: '18rem', margin: '0 auto', marginTop: '2rem' }}>
                    <Card.Body>
                        <Card.Title>{degree.full_name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{degree.shortcode}</Card.Subtitle>
                        <Card.Text>
                            <h4>Cohorts:</h4>
                            <ListGroup variant="flush">
                                {cohorts.map(cohort => <ListGroup.Item key={cohort.id}>{cohort.name}</ListGroup.Item>)}
                            </ListGroup>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <Link to="/degree-list">
                    <Button variant="primary">Back to Degrees</Button>
                </Link>
            </div>
        </div>
    );
}

export default DegreeDetail;