// CreateModule.js
import { useState, useEffect } from "react";
import { Form, Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import CustomNavbar from "./Navbar";

function CreateModule(){
    const[moduleId, setModuleId] = useState("");
    const[moduleName, setModuleName] = useState("");
    const[deliveredTo, setDeliveredTo] = useState([]);
    const[cohorts, setCohorts] = useState([]);
    const[isSubmitted, setIsSubmitted] = useState(false);
    const[caSplit, setCaSplit] = useState(0); 

    useEffect(() => {
        fetch("http://localhost:8000/api/cohort/")
            .then((response) => response.json())
            .then((data) => setCohorts(data))
            .catch((error) => console.error("Error:", error));
    }, []);

    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        event.preventDefault();

        const module = {
            code: moduleId,
            full_name: moduleName,
            delivered_to: deliveredTo.map(id => `http://127.0.0.1:8000/api/cohort/${id}/`),
            ca_split: caSplit, // Include 'ca_split' in the request body
        };
        console.log(moduleName, deliveredTo);
        fetch("http://127.0.0.1:8000/api/module/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(module),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            setModuleId("");
            setModuleName("");
            setIsSubmitted(true);

            navigate('/modules');
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    };

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setDeliveredTo([...deliveredTo, event.target.value]);
        } else {
            setDeliveredTo(deliveredTo.filter(cohort => cohort !== event.target.value));
        }
    };

    return (
        <div>
            <CustomNavbar />
            {isSubmitted ? (
                <p>Module has been submitted!</p>
            ) : (
                <Form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', marginTop: '2rem' }}>
                    <Form.Group controlId="moduleId">
                        <Form.Label>Module Code:</Form.Label>
                        <Form.Control
                            type="text"
                            value={moduleId}
                            onChange={(e) => setModuleId(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="moduleName">
                        <Form.Label>Module Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={moduleName}
                            onChange={(e) => setModuleName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="caSplit">
                        <Form.Label>CA Split:</Form.Label>
                        <Form.Control
                            type="number"
                            value={caSplit}
                            onChange={(e) => setCaSplit(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="deliveredTo">
                        <Form.Label>Delivered To:</Form.Label>
                        {cohorts.map((cohort) => (
                            <Form.Check 
                                key={cohort.id}
                                type="checkbox"
                                value={cohort.id}
                                label={cohort.name}
                                onChange={handleCheckboxChange}
                            />
                        ))}
                    </Form.Group>
                    <Button variant="primary" type="submit">Create Module</Button>
                </Form>
            )}
        </div>
    );
}

export default CreateModule;