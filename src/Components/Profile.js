import React from 'react'
import { db } from "../firebase"
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react'
import "./pending.css"
import "./profile.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { Text } from '@chakra-ui/react';
const Profile = () => {
    let { id } = useParams();
    console.log(id);
    const [sub, setSub] = useState("");
    const [List, setList] = useState([]);
    const [Data, setData] = useState([]);
    useEffect(() => {

        onValue(ref(db, "Users"), snapshot => {
            setList([])
            const data = snapshot.val();

            if (data !== null) {
                Object.values(data).map((name) => {

                    setList(oldArray => [...oldArray, name])


                })
            }

        });

    }, [])
    console.log(List);
    const writeToDatabase = () => {
        if (sub === "") {
            window.alert("Please enter a valid reason")

        }
        else if (sub !== '') {
            remove(ref(db, `/Doctor/${id}`))
            remove(ref(db, `/Users/${id}`))

            List.map((doc, index) => {
                if (doc.uid === id) {
                    set(ref(db, `/removedDoctors/${doc.name}`), {
                        sub,
                        license: doc.license,
                        name: doc.name
                    })
                }

            });
            window.alert("User removed");
            window.location.replace("/")

        }

        setSub("");


    }

    const update = () => {
        set(ref(db, `/Users/${id}/verified/`), {
            verfied: "true"
        })
        set(ref(db, `/Users/${id}/Status/`), {
            status: true
        })


    }

    const on = () => {

        update(ref(db, `/Users/${id}/Status/`), {
            status: true
        })
        console.log("hi")

    }
    const off = () => {

        set(ref(db, `/Users/${id}/Status/`), {
            status: false
        })
        console.log("hu")

    }
    return (



        <div class="student-profile py-4">
            <div>
                <div class="row">
                    <div class="col-lg-4">

                    </div>
                </div>
                {
                    List.map((doc, index) => {

                        if (doc.uid === id) {
                            if (!doc.DoctorsAppointments) {
                                return (
                                    <>
                                        <div class="container" key={index}>
                                            <div class="card-header bg-transparent text-center">

                                                <h3>{doc.name}  <Button type='button' variant={doc.Status.status ? "success" : "danger"} onClick={doc.Status.status ? off : on} >{doc.Status.status ? "On" : "Off"}</Button></h3>


                                            </div>
                                            <div class="card shadow-sm" style={{ marginTop: "5px" }}>
                                                <div class="card-header bg-transparent border-0">
                                                    <h3 class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
                                                </div>
                                                <div class="card-body pt-0">
                                                    <table class="table table-bordered">
                                                        <tr>
                                                            <th width="30%">Imac no.</th>
                                                            <td width="2%">:</td>
                                                            <td>{doc.license}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="30%">Email </th>
                                                            <td width="2%">:</td>
                                                            <td>{doc.email}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="30%">Phone</th>
                                                            <td width="2%">:</td>
                                                            <td>{doc.phone}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="30%">Specialisation</th>
                                                            <td width="2%">:</td>
                                                            <td>{doc.specialist}</td>
                                                        </tr>
                                                        <tr>
                                                            <th width="30%">Location</th>
                                                            <td width="2%">:</td>
                                                            <td> {doc.location}</td>
                                                        </tr>

                                                    </table>
                                                </div>
                                            </div>
                                            <div class="text-center ">
                                                No appointments availavable
                                            </div>
                                            <div>

                                            </div>



                                        </div>
                                        <section >

                                            <div class="container my-5 py-40 text-dark">
                                                <div class="row d-flex justify-content-center">
                                                    <div class="col-md-10 col-lg-8 col-xl-6">
                                                        <div class="card">
                                                            <div class="card-body p-4"><h3 class="text-center">Approval/Removal</h3>
                                                                <div class="d-flex flex-start w-100">

                                                                    <div class="w-100">

                                                                        <div class="form-outline">
                                                                            <textarea class="form-control" id="textAreaExample" rows="4" placeholder='please Enter a  reason to remove the doctor' onChange={(e) => setSub(e.target.value)} value={sub} ></textarea>
                                                                        </div>
                                                                        <div class="d-flex justify-content-between mt-3">
                                                                            <Button variant="danger" onClick={writeToDatabase}>
                                                                                Remove User
                                                                            </Button>

                                                                            <Button variant="success" onClick={update} name="submit" type="submit" id="contact-submit" data-submit="...Sending" >Approve</Button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </>

                                )
                            }


                            else if (doc.DoctorsAppointments) {

                                if (doc.uid === id) {
                                    return (
                                        <div>
                                            <div class="container" key={index}>
                                                <div class="card-header bg-transparent text-center">

                                                    <h3>{doc.name} <Button type='button' variant={doc.Status.status ? "success" : "danger"} onClick={doc.Status.status ? off : on} >{doc.Status.status ? "ON" : "Off"}</Button></h3>


                                                </div>
                                                <div class="card shadow-sm" style={{ marginTop: "5px" }}>
                                                    <div class="card-header bg-transparent border-0">
                                                        <h3 class="mb-0"><i class="far fa-clone pr-1"></i>General Information</h3>
                                                    </div>
                                                    <div class="card-body pt-0">
                                                        <table class="table table-bordered">
                                                            <tr>
                                                                <th width="30%">Imac no.</th>
                                                                <td width="2%">:</td>
                                                                <td>{doc.license}</td>
                                                            </tr>
                                                            <tr>
                                                                <th width="30%">Email </th>
                                                                <td width="2%">:</td>
                                                                <td>{doc.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <th width="30%">Phone</th>
                                                                <td width="2%">:</td>
                                                                <td>{doc.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <th width="30%">Specialisation</th>
                                                                <td width="2%">:</td>
                                                                <td>{doc.specialist}</td>
                                                            </tr>
                                                            <tr>
                                                                <th width="30%">Location</th>
                                                                <td width="2%">:</td>
                                                                <td> {doc.location}</td>
                                                            </tr>

                                                        </table>
                                                    </div>
                                                </div>
                                                <div>
                                                </div>

                                            </div>
                                            <table class="responsive-table" style={{ marginTop: "15px" }}>
                                                <Text size="5xl" textAlign="center" ><b>Booked Appointments</b></Text>
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Name</th>
                                                        <th scope="col" >Disease</th>
                                                        <th scope="col">Date</th>
                                                        <th scope="col">Condition</th>
                                                        <th scope="col">Phone</th>
                                                        <th scope="col"> Time slot</th>
                                                        <th scope="col">Prescreption</th>
                                                        <th scope="col">Points</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        Object.values((Object.values(doc.DoctorsAppointments).map((d, index) => {
                                                            return Object.values(d).map((a, index) => {
                                                                console.log(a.Date)
                                                                return (
                                                                    <>
                                                                        <tr>
                                                                            <th scope='row'>{a.PatientName}</th>
                                                                            <td data-title='Disease'>{a.Disease}</td>
                                                                            <td data-title='Date'>{a.Date}</td>
                                                                            <td data-title='Condition'>{a.PatientCondition}</td>
                                                                            <td data-title='Phone'>{a.PatientPhone}</td>
                                                                            <td data-title='Time'>{a.Time}</td>
                                                                            <td data-title='Prescription'><a href={a.Prescription} > Click here</a></td>

                                                                        </tr>

                                                                    </>
                                                                )

                                                            })

                                                        })))




                                                    }
                                                </tbody>
                                            </table>

                                            <section >

                                                <div class="container my-5 py-40 text-dark">
                                                    <div class="row d-flex justify-content-center">
                                                        <div class="col-md-10 col-lg-8 col-xl-6">
                                                            <div class="card">
                                                                <div class="card-body p-4"><h3 class="text-center">Approval/Removal</h3>
                                                                    <div class="d-flex flex-start w-100">

                                                                        <div class="w-100">

                                                                            <div class="form-outline">
                                                                                <textarea class="form-control" id="textAreaExample" rows="4" placeholder='please Enter a  reason to remove the doctor' onChange={(e) => setSub(e.target.value)} value={sub} ></textarea>
                                                                            </div>
                                                                            <div class="d-flex justify-content-between mt-3">
                                                                                <Button variant="danger" onClick={writeToDatabase}>
                                                                                    Remove User
                                                                                </Button>

                                                                                <Button variant="success" onClick={update} name="submit" type="submit" id="contact-submit" data-submit="...Sending" >Approve</Button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>

                                    )
                                }


                            }

                        }

                    })
                }


            </div>

        </div >


    )
}

export default Profile