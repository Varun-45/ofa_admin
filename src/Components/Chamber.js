import React from 'react'
import { db } from "../firebase"
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react'
import "./pending.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react';

const Chamber = () => {
    const [value, setValue] = useState("")
    const [child, setchild] = useState([])
    const [List, setList] = useState([]);
    const [URL, seturl] = useState("");
    useEffect(() => {

        onValue(ref(db, "Users"), snapshot => {
            setList([])
            const data = snapshot.val();

            if (data !== null) {
                Object.values(data).map((name) => {
                    if (name.doctor === "Chamber") {
                        setList(oldArray => [...oldArray, name])
                    }



                })
            }

        });

    }, [])
    console.log(List)
    useEffect(() => {

        onValue(ref(db, "Users"), snapshot => {
            setchild([])
            const data = snapshot.val();

            if (data !== null) {
                Object.values(data).map((name) => {
                    if (name.doctor === "Doctor" && name.handler) {
                        setchild(oldArray => [...oldArray, name])
                    }



                })
            }

        });

    }, [])
    console.log(child)
    return (
        <div>
            <h2 style={{ textAlign: "center" }} >Chambers</h2><table class="responsive-table">

                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" >Imac no.</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>

                        <th scope="col">Location</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        List.map((doc, index) => {


                            return (
                                <>
                                    <tr>
                                        <th scope="row">{doc.name}</th>

                                        <td data-title="Email">{doc.email}</td>
                                        <td data-title="Phone">{doc.phone}</td>

                                        <td data-title="Doctors">

                                            <a > <Accordion defaultIndex={[1]} allowMultiple>
                                                <AccordionItem>
                                                    <h2>
                                                        <AccordionButton>
                                                            <Box as="span" flex='1' textAlign='left'>
                                                                Section 1 title
                                                            </Box>
                                                            <AccordionIcon />
                                                        </AccordionButton>
                                                    </h2>
                                                    <AccordionPanel pb={4}>
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
                                                                    child.map((d, index) => {
                                                                        if (d.verified.verfied === "true" && d.handler === doc.uid) {

                                                                            return (
                                                                                <>
                                                                                    <tr>
                                                                                        <th scope="row">{d.name}</th>
                                                                                        <td data-title='Imac no.'>{d.license}</td>
                                                                                        <td data-title="Email">{d.email}</td>
                                                                                        <td data-title="Phone">{d.phone}</td>
                                                                                        <td data-title="Specialisation">{d.specialist}</td>
                                                                                        <td data-title="Approval">

                                                                                            <a href={"/page/" + d.uid}><Button variant="primary" > View Appointments</Button></a></td>
                                                                                        <td data-title=" Location"> {d.location}</td>
                                                                                    </tr>

                                                                                </>
                                                                            )
                                                                        }

                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>

                                                    </AccordionPanel>
                                                </AccordionItem>


                                            </Accordion></a></td>
                                        <td data-title=" Location"> {doc.location}</td>
                                    </tr>

                                </>
                            )

                        })
                    }
                </tbody>
            </table></div>
    )
}

export default Chamber