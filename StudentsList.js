// StudentsList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import CustomNavbar from './Navbar.js';
import { useParams } from 'react-router-dom';

function StudentsList() {
    const [students, setStudents] = useState([]);
    const { cohortFlag } = useParams();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/student/')
            .then(response => response.json())
            .then(data => {
                const filteredStudents = data.filter(student => {
                    return student.cohort.split('/')[5] === cohortFlag;
                });
                setStudents(filteredStudents);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, [cohortFlag]);

    return (
        <div>
            <CustomNavbar />
            <h1 style={{ textAlign: 'center', marginTop: '1rem' }}>Students List</h1>
            {students.map(student => (
                <Card key={student.student_id} style={{ width: '30rem', margin: '0 auto', marginTop: '2rem' }}>
                    <Card.Body>
                        <Card.Title>{student.first_name} {student.last_name}</Card.Title>
                        <Card.Text>
                            <p>ID: {student.student_id}</p>
                            <p>Cohort: {student.cohort.split('/')[5]}</p>
                        </Card.Text>
                        <Link to={`/students/${student.student_id}`}>
                            <Button variant="primary">View Details</Button>
                        </Link>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
}

export default StudentsList;