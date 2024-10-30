// StudentSearch.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function StudentSearch() {
    const [studentIds, setStudentIds] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/student/')
            .then(response => response.json())
            .then(data => {
                const ids = data.map(student => student.student_id);
                setStudentIds(ids);
            })
            .catch(error => console.error('Error fetching student IDs:', error));
    }, []);

    function handleChange(event) {
        setSelectedId(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (selectedId) {
            navigate(`/students/${selectedId}`);
        }
    }

    return (
        <div>
            <CustomNavbar />
            <Container className="my-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="studentId">
                        <Form.Label>Student ID:</Form.Label>
                        <Form.Control as="select" value={selectedId} onChange={handleChange}>
                            <option value="">Select a student ID</option>
                            {studentIds.map(id => (
                                <option key={id} value={id}>{id}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
                <Link to="/new-student" className="mt-3">
                    <Button variant="secondary">Create Student</Button>
                </Link>
            </Container>
        </div>
    );
}

export default StudentSearch;