import React from 'react'
import { db } from "../firebase"
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react'
import "./pending.css"
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Users = () => {
    const [List, setList] = useState([]);
    const [app, setapp] = useState([]);
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {

        onValue(ref(db, "Users"), snapshot => {
            setList([])
            const data = snapshot.val();

            if (data !== null) {
                Object.values(data).map((name) => {
                    if (name.doctor === "Patient") {
                        setList(oldArray => [...oldArray, name])
                    }



                })
            }

        });

    }, [])
    console.log(List);


    return (
        <div>   <h2 style={{ textAlign: "center" }} >Patients Onboard</h2>
            <table class="responsive-table">

                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" >Age</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Profile</th>
                        <th scope="col"> Appointments</th>

                        <th scope="col">Prescription</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        List.map((doc, index) => {


                            return (
                                <>
                                    <tr>
                                        <th scope="row" id={doc.name}>{doc.name}</th>
                                        <td data-title='Age'>{doc.age}</td>
                                        <td data-title="Email">{doc.email}</td>
                                        <td data-title="Phone">{doc.phone}</td>
                                        <td data-title="Profile"> <a href={doc.imgUrl}> Click here</a></td>

                                        <td data-title="Approval">

                                            {doc.PatientsAppointments !== undefined &&
                                                <a ><Button variant="primary" onClick={handleShow} >  View Appointments</Button></a>}
                                            {doc.PatientsAppointments === undefined &&
                                                <>NO Appointments</>}
                                        </td>
                                        {doc.PatientsAppointments !== undefined &&
                                            <Modal show={show} onHide={handleClose}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Appointments</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body> <table class="responsive-table">

                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Doctor's Name</th>
                                                            <th scope="col" >Date</th>
                                                            <th scope="col">Time</th>

                                                        </tr></thead>
                                                    {

                                                        Object.values((Object.values(doc.PatientsAppointments).map((d, index) => {
                                                            return Object.values(d).map((a, index) => {
                                                                return (
                                                                    <tr>
                                                                        <td><a href={"/page/" + a.DoctorUID}>{a.DoctorName}</a></td>
                                                                        <td >{a.Date}</td>
                                                                        <td >{a.Time}</td>
                                                                    </tr>
                                                                )
                                                            }
                                                            )
                                                        })
                                                        ))


                                                    }

                                                </table></Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={handleClose}>
                                                        Close
                                                    </Button>

                                                </Modal.Footer>
                                            </Modal>}
                                        <td data-title=" Prescription"> <a href={doc.prescription !== "false" ? doc.prescription : "#"} >{doc.prescription !== "false" ? "Click here" : "Not uploaded"}</a></td>
                                    </tr>

                                </>
                            )
                        })
                    }
                </tbody>
            </table></div>
    )
}

export default Users