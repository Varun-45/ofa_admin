import React from 'react'
import { db } from "../firebase"
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react'
import "./pending.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Docs = () => {
    const [value, setValue] = useState("")
    const [List, setList] = useState([]);
    const [URL, seturl] = useState("");
    useEffect(() => {

        onValue(ref(db, "Users"), snapshot => {
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
    console.log(List)

    return (

        <div style={{ position: "relative" }}>
            <div className='header'>
                <h2 style={{ textAlign: "center" }} >Doctor's  Onboard</h2>
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
                        <th scope="col"> Appointments</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        List.map((doc, index) => {
                            if (doc.verified.verfied === "true") {

                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{doc.name}</th>
                                            <td data-title='Imac no.'>{doc.license}</td>
                                            <td data-title="Email">{doc.email}</td>
                                            <td data-title="Phone">{doc.phone}</td>
                                            <td data-title="Specialisation">{doc.specialist}</td>
                                            <td data-title="Approval">

                                                <a href={"/page/" + doc.uid}><Button variant="primary" > View Appointments</Button></a></td>
                                            <td data-title=" Location"> {doc.location}</td>

                                        </tr>

                                    </>
                                )
                            }
                        })
                    }
                </tbody>
            </table>
        </div >

    )
}

export default Docs