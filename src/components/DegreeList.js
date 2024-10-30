// DegreeList.js
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function DegreeList() {
  const [degrees, setDegrees] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/degree/')
      .then(response => response.json())
      .then(data => {
        setDegrees(data);
      });
  }, []);

  return (
    <div>
      <CustomNavbar />
      <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Degree List</h1>
      <Container>
        <Row>
          {degrees.map(degree => (
            <Col md={4} key={degree.shortcode}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title><Link to={`/degree/${degree.shortcode}`}>{degree.full_name}</Link></Card.Title>
                  <Card.Text>{degree.shortcode}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="text-center">
            <Link to="/create-degree">
              <Button variant="primary">Create a new degree</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DegreeList;