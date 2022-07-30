import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import AddModal from "./AddModel";
// import UpdateModal from "./UpdateModel";
import axios from 'axios';
// import { useNavigate } from "react-router-dom";
const Home = () => {
    // const navigation=useNavigate();
    const [data, setData] = useState();
    const [data1, setData1] = useState([]);
    const [edit, setEdit] = useState(false);
    const [modalShow, setModalShow] = React.useState(false);
    // const [modalShow2, setModalShow2] = React.useState(false);
    const getData = () => {
        axios.get(`http://127.0.0.1:8000/data`)
        .then(response => setData1(response.data));
    }
    useEffect(() => {
        getData()
    }, []);

    const getDelete = (id) => {
        return (() => {
            window.location.reload(false)
            axios.delete(`http://127.0.0.1:8000/data/` + id)
                .then(() => (alert('deleted')))
        })
    }
    const onEdithandler = (value) => {
        debugger;
        const fornt=data1.find(user=>user.id===value)
        setEdit(true)
        setModalShow(true)
        // console.log(fornt)
        const dealData={
            id: fornt.id,
            name: fornt.name,
            email:fornt.email,
            gender:fornt.gender,
            password:fornt.password
        }
        setData(dealData)
    }
    return (<>

        <h1 >Detail Page</h1>
        <br />
        <Button variant="primary" onClick={() => {setModalShow(true)
        setEdit(false)}
        }>
            Add Detail
        </Button><br />

        <AddModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            edit={edit }
        />

        <br />
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data1.map(value => {
                    return (
                        <tr key={value.id}>
                            <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>{value.gender}</td>
                            <td>{value.email}</td>
                            <td>{value.password}</td>
                            <td>
                                <Button variant="success"
                                    onClick={() => {
                                        onEdithandler(value.id)
                                    }} >Edit</Button>
                                <AddModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    data={data}
                                    edit={edit}
                                   
                                />
                                <Button variant="danger" onClick={getDelete(value.id)}>Delete</Button>

                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </>)
}

export default Home;