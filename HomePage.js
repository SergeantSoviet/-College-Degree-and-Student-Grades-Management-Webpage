// HomePage.js
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
    const homeStyle = {
        backgroundImage: `url(/dcu_logo_stacked_slate_yellow.png)`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100vh'
    };

    const buttonStyle = {
        flexGrow: 1,
        margin: '26px 0', 
        padding: '26px 0', 
        width: '100%',
    };

    return (
        <Container fluid>
            <Row>
                <Col md={6} style={homeStyle} className="d-none d-md-block"></Col>
                <Col md={6} className="d-flex flex-column justify-content-around h-100">
                    <h1 className="text-center mb-4">React Project by Lukas Sarkauskas</h1>
                    <Link to="/degree-list" className="text-white text-decoration-none">
                        <Button variant="primary" size="lg" style={buttonStyle}>Degrees</Button>
                    </Link>
                    <Link to="/cohorts" className="text-white text-decoration-none">
                        <Button variant="primary" size="lg" style={buttonStyle}>Cohorts</Button>
                    </Link>
                    <Link to="/modules" className="text-white text-decoration-none">
                        <Button variant="primary" size="lg" style={buttonStyle}>Modules</Button>
                    </Link>
                    <Link to="/students/search" className="text-white text-decoration-none">
                        <Button variant="primary" size="lg" style={buttonStyle}>Students</Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default HomePage;