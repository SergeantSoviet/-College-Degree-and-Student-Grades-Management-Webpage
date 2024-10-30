// StudentDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Container } from 'react-bootstrap';
import CustomNavbar from './Navbar';

function StudentDetail() {
    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [grades, setGrades] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/student/${id}/`)
            .then(response => response.json())
            .then(data => {
                setStudent(data);
            });

        fetch(`http://127.0.0.1:8000/api/grade/?student=${id}`)
            .then(response => response.json())
            .then(data => {
                setGrades(data);
            });
    }, [id]);

    return (
        <div>
            <CustomNavbar />
            <Container className="my-4">
                <h1 className="text-center">{student.first_name} {student.last_name}</h1>
                <h2 className="text-center my-4">Modules</h2>
                {grades.map(grade => (
                    <Card className="mb-4" key={grade.id}>
                        <Card.Body>
                            <Card.Title>Module: {grade.module.split('/').slice(-2, -1)}</Card.Title>
                            <Card.Text>
                                <p>CA Mark: {grade.ca_mark}</p>
                                <p>Exam Mark: {grade.exam_mark}</p>
                                <p>Cohort: {grade.cohort.split('/').slice(-2, -1)}</p>
                                <p>Total Grade: {grade.total_grade}</p>
                            </Card.Text>
                            <Link to={`/editgrade/${grade.id}`}>
                                <Button variant="primary">Edit Grade</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </Container>
        </div>
    );
}

export default StudentDetail;