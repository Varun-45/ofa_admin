import React from 'react'
import { db } from "../firebase"
import { set, ref, onValue, remove, update } from "firebase/database";
import { useEffect, useState, useRef } from 'react'
import "./pending.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const Removed = () => {
    const [sub, setSub] = useState("");
    const [List, setList] = useState([]);
    const [Data, setData] = useState([]);
    useEffect(() => {

        onValue(ref(db, "removedDoctors"), snapshot => {
            setList([])
            const data = snapshot.val();

            if (data !== null) {
                Object.values(data).map((name) => {

                    setList(oldArray => [...oldArray, name])


                })
            }

        });

    }, [])
    console.log(List)
    return (
        <>
            <h2 className='text-center my-3'>Removed Users</h2>
            <Accordion defaultActiveKey="0" className='container my-3'>
                {
                    List.map((doc, index) => {
                        return (

                            <Accordion.Item eventKey="1" className='my-2'>
                                <Accordion.Header>{doc.name + "#" + doc.license}</Accordion.Header>
                                <Accordion.Body>
                                    {doc.sub}
                                </Accordion.Body>
                            </Accordion.Item>

                        )

                    })}
            </Accordion></>
    )
}

export default Removed