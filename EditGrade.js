import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import CustomNavbar from './Navbar';

const EditGrade = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    const [module, setModule] = useState('');
    const [caMark, setCaMark] = useState('');
    const [examMark, setExamMark] = useState('');
    const [cohort, setCohort] = useState('');
    const [student, setStudent] = useState('');

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/grade/${id}/`)
            .then(response => response.json())
            .then(data => {
                setModule(data.module.split('/').slice(-2, -1)[0]);
                setCaMark(data.ca_mark);
                setExamMark(data.exam_mark);
                setCohort(data.cohort.split('/').slice(-2, -1)[0]);
                setStudent(data.student.split('/').slice(-2, -1)[0]);
            });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const grade = {
            module: `http://127.0.0.1:8000/api/module/${module}/`,
            ca_mark: caMark,
            exam_mark: examMark,
            cohort: `http://127.0.0.1:8000/api/cohort/${cohort}/`,
            student: `http://127.0.0.1:8000/api/student/${student}/`,
        };

        fetch(`http://127.0.0.1:8000/api/grade/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(grade),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            navigate(`/students/${student}`);
        })
        .catch(error => console.error(error));
    };

    return (
        <div>
            <CustomNavbar />
            <Container className="my-4">
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="module">
                        <Form.Label>Module:</Form.Label>
                        <Form.Control type="text" value={module} onChange={e => setModule(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="caMark">
                        <Form.Label>CA Mark:</Form.Label>
                        <Form.Control type="number" value={caMark} onChange={e => setCaMark(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="examMark">
                        <Form.Label>Exam Mark:</Form.Label>
                        <Form.Control type="number" value={examMark} onChange={e => setExamMark(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="cohort">
                        <Form.Label>Cohort:</Form.Label>
                        <Form.Control type="text" value={cohort} onChange={e => setCohort(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="student">
                        <Form.Label>Student:</Form.Label>
                        <Form.Control type="text" value={student} onChange={e => setStudent(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit">Update Grade</Button>
                </Form>
            </Container>
        </div>
    );
};

export default EditGrade;