import React from 'react'
import { db } from "../firebase"
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react'
import "./pending.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const Home = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState("")
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [List, setList] = useState([]);
    const [sub, setsub] = useState(" ");
    useEffect(() => {

        onValue(ref(db, "/Users"), snapshot => {
            setList([])
            const data = snapshot.val();

            if (data !== null) {
                Object.values(data).map((name) => {
                    if (name.doctor === "Doctor") {
                        setList(oldArray => [...oldArray, name])
                    }






                })
            }

        });

    }, [])
    console.log(List);
    // const writeToDatabase = () => {
    //     if (sub === "") {


    //     }
    //     else {


    //         set(ref(db, `/removedDoctors/`), {
    //             sub

    //         });
    //         console.log("hi")
    //         setsub("");


    //     }

    // }

    return (
        <div>
            <div className='header'>
                <h2 style={{ textAlign: "center" }} >Pending Requests</h2>
                <div class="searchInput">
                    <input type="text" placeholder="Search with a keyword...
                                " onChange={(e) => setValue(e.target.value)} value={value} />

                    <div class="resultBox">
                        {

                            List.map((doc, index) => {
                                if (doc.location) {
                                    if ((value != "") && (doc.name.toUpperCase().includes(value.toUpperCase()) || doc.location.toUpperCase().includes(value.toUpperCase()) || doc.specialist.includes(value))) {


                                        return (
                                            <>
                                                <a href={"/page/" + doc.uid} style={{ color: "Black", textDecoration: "none" }}>  <li>{doc.name},{doc.location}  <span style={{ marginLeft: "2rem" }}> </span ></li></a>
                                                <hr /></>
                                        )
                                    }
                                }
                                else {
                                    if ((value != "") && (doc.name.toUpperCase().includes(value.toUpperCase()) || doc.specialist.includes(value))) {


                                        return (
                                            <>
                                                <a href={"/page/" + doc.uid} style={{ color: "Black", textDecoration: "none" }}>  <li>{doc.name},{doc.location}  <span style={{ marginLeft: "2rem" }}> </span ></li></a>
                                                <hr /></>
                                        )
                                    }
                                }
                            })
                        }

                    </div>

                </div>
            </div>

            <table class="responsive-table">

                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" >Imac no.</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Specialisation</th>
                        <th scope="col"> Approval</th>

                        <th scope="col">Location</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        List.map((doc, index) => {
                            console.log(index)
                            if (doc.verified.verfied === "false") {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{doc.name}</th>
                                            <td data-title='Imac no.'>{doc.license}</td>
                                            <td data-title="Email">{doc.email}</td>
                                            <td data-title="Phone">{doc.phone}</td>
                                            <td data-title="Specialisation">{doc.specialist}</td>
                                            {
                                                console.log(doc.uid)
                                            }

                                            <td onClick={handleShow}><a href={"/page/" + doc.uid}><Button variant="primary"  >View Details</Button></a></td>
                                            <td data-title=" Location"> {doc.location}</td>
                                        </tr>

                                    </>
                                )
                            }
                        })

                    }
                </tbody>
            </table>
        </div>
    )
}

export default Home