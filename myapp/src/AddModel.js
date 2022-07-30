import React  from "react";
import { Modal, Button } from 'react-bootstrap';
import * as yup from 'yup'
import { Field, Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';
// import { useParams } from "react-router-dom";

const AddModal = (props) => {
//   const [value,setValue]=React.useState()
   
    const validateSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        gender: yup.string().required('Gender is requied'),
        email: yup.string().email('invalid email').required('email is required'),
        password: yup.string().required('required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        cpassword:  yup.string().when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: yup.string().oneOf(
              [yup.ref("password")],
              "Both password need to be the same"
            )
          })
    });
    debugger;
    console.log(props.data)
    const initialValues = {
        name: '',
        gender: '',
        email: '',
        password: ''
    }
    
    
        const genderOptions = [
        {
            key: 'male',
            value: 'male'
        }, {
            key: 'female',
            value: 'female'
        }
    ];
    const handleSubmit = (values) => {
        console.log(values)
        window.location.reload(false)
        props.onHide()
        axios.post(`http://127.0.0.1:8000/data`,values)
        .then(()=>alert('Added SuccessFully'));
    }
    const handleEdit = (values) => {
        console.log(values)
        window.location.reload(false)
        props.onHide()
        axios.put(`http://127.0.0.1:8000/data/${props.data.id}`,values)
        .then(()=>alert('update SuccessFully'));
    }
    return (<>
        <Formik validationSchema={validateSchema}
            
            initialValues={props.data | initialValues}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                
                <Modal.Header closeButton>
                    <Modal.Title>Add Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form >
                        <label >Enter Your Name</label><br />
                        <input name="name" type="text" />
                        <ErrorMessage className="text-danger" name="name">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                        <br /><label >Enter Gender</label><br />
                        <Field name="gender">
                            {({ field }) => {
                                return genderOptions.map((option) => {
                                    return (
                                        <React.Fragment key={option.key}>
                                            <input
                                                className="align-self-center"
                                                type="radio"
                                                id={option.value}
                                                {...field}
                                                value={option.value}
                                                checked={field.value === option.value}
                                            />
                                            <label className="me-3 ms-2" htmlFor={option.value}>
                                                {option.key}
                                            </label>
                                        </React.Fragment>
                                    );
                                });
                            }}
                        </Field>
                        <ErrorMessage className="text-danger" name="gender">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                        <br /> <label>Enter Email</label><br />
                        <input name='email' type='email' />
                        <ErrorMessage className="text-danger" name="email">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                        <br /><label >Enter Password</label><br />
                        <input name='password' type='password' />
                        <ErrorMessage className="text-danger" name="password">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                        <br /><label >Enter Confirm Password</label><br />
                        <input name='cpassword' type='password' />
                        <ErrorMessage className="text-danger" name="cpassword">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                       <br/> <Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    {props.edit?
                   
                    <Button variant="primary" onClick={handleEdit} >
                    Edit
                 </Button>
                    :
                    <Button variant="primary" onClick={handleSubmit} >
                    Save
                </Button>
                    }
                    </Form>
                </Modal.Body>
            </Modal>
        </Formik>
    </>)
}

export default AddModal;