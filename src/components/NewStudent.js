import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CustomNavbar from './Navbar';

function NewStudent() {
    const [studentId, setStudentId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cohort, setCohort] = useState('');
    const [cohorts, setCohorts] = useState([]);
    const navigate = useNavigate(); // get the navigate function

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/cohort')
            .then(response => response.json())
            .then(data => setCohorts(data));
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const student = {
            student_id: studentId,
            first_name: firstName,
            last_name: lastName,
            cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
        };

        fetch('http://127.0.0.1:8000/api/student/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(student),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate('/students/search');
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <CustomNavbar />
            <Container className="my-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="studentId">
                        <Form.Label>Student ID:</Form.Label>
                        <Form.Control type="text" value={studentId} onChange={e => setStudentId(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="cohort">
                        <Form.Label>Cohort:</Form.Label>
                        <Form.Control as="select" value={cohort} onChange={e => setCohort(e.target.value)}>
                            {cohorts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Container>
        </div>
    );
}

export default NewStudent;