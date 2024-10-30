// CreateCohort.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap';
import CustomNavbar from "./Navbar";

function CreateCohort(){
    const[cohortId, setCohortId] = useState("");
    const[cohortYear, setCohortYear] = useState("");
    const[cohortDegree, setCohortDegree] = useState("");
    const[degrees, setDegrees] = useState([]);
  
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8000/api/degree/")
            .then((response) => response.json())
            .then((data) => setDegrees(data))
            .catch((error) => console.error("Error:", error));
    }, []);
  
    const handleSubmit = (event) => {
        event.preventDefault();
  
        const degreeUrl = `http://127.0.0.1:8000/api/degree/${cohortDegree}/`;
        const selectedDegree = degrees.find(degree => degree.shortcode === cohortDegree);

        if (!selectedDegree) {
            console.error('Degree not found:', cohortDegree);
            return;
        }
  
        const cohortName = `${cohortYear} ${selectedDegree.full_name}`;
  
        const cohort = {
            id: cohortId,
            year: parseInt(cohortYear),
            degree: degreeUrl,
            name: cohortName,
        };
  
        fetch("http://127.0.0.1:8000/api/cohort/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(cohort),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            setCohortId("");
            setCohortYear("");
            setCohortDegree("");
            navigate("/cohorts");
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    return (
        <div>
            <CustomNavbar />
            <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', marginTop: '2rem' }}>
                <Form.Group controlId="cohortId">
                    <Form.Label>Cohort Shortcode:</Form.Label>
                    <Form.Control
                        type="text"
                        value={cohortId}
                        onChange={(e) => setCohortId(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="cohortYear">
                    <Form.Label>Cohort Year:</Form.Label>
                    <Form.Control
                        type="number"
                        value={cohortYear}
                        onChange={(e) => setCohortYear(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="cohortDegree">
                    <Form.Label>Cohort Degree:</Form.Label>
                    <Form.Control
                        as="select"
                        value={cohortDegree}
                        onChange={(e) => setCohortDegree(e.target.value)}
                    >
                        {degrees.map((degree) => (
                            <option key={degree.shortcode} value={degree.shortcode}>
                                {degree.full_name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Create Cohort</Button>
            </Form>
        </div>
    );
}

export default CreateCohort;