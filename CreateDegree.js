// CreateDegree.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function CreateDegree() {
    const [fullName, setFullName] = useState('');
    const [shortcode, setShortcode] = useState('');
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        fetch('http://127.0.0.1:8000/api/degree/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name: fullName,
                shortcode: shortcode
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/degree-list');
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    };

    return (
        <div>
            <CustomNavbar />
            <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', marginTop: '2rem' }}>
                <Form.Group controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={fullName} onChange={e => setFullName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="shortcode">
                    <Form.Label>Shortcode</Form.Label>
                    <Form.Control type="text" value={shortcode} onChange={e => setShortcode(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Create</Button>
            </Form>
        </div>
    );
}

export default CreateDegree;