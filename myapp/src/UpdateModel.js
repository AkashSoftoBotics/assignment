import React from "react";
import { Modal, Button } from 'react-bootstrap';
import * as yup from 'yup'
import { Field, Formik, Form, ErrorMessage } from 'formik';
import axios from 'axios';

const UpdateModal=(props)=>{
   
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



const genderOptions = [
    {
        key: 'male',
        value: 'male'
    }, {
        key: 'female',
        value: 'female'
    }
];

const putData=(id)=>{
    axios.put(`http://127.0.0.1:8000/data`+id)
    .then(res=>console.log(res.data));
}
const handleSubmit = (values) => {
    console.log(values)
   putData(values.id)
    props.onHide()
}
const loadedValues={
    name: data2?.name,
    gender: data2?.gender,
    email: data2?.email,
    password: data2?.password
}

  return(<>
  <Formik validationSchema={validateSchema}
            onSubmit={handleSubmit}
            initialValues={loadedValues}
        >
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form >
                    <label >your Id </label><br />
                        <Field name="id" value={props.id}/><br/>
                        <label >Update Your Name</label><br />
                        <Field name="name" />
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
                        <br /> <label>Update Email</label><br />
                        <Field 
                        name='email' 
                        type='email' 
                        />
                        <ErrorMessage 
                        className="text-danger" 
                        name="email">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                        <br /><label >Update Password</label><br />
                        <Field 
                            name='password' 
                            type='password' 
                          />
                        <ErrorMessage className="text-danger" name="password">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                        <br /><label >Enter Confirm Password</label><br />
                        <Field 
                        name='cpassword' 
                        type='password' 
                      />
                        <ErrorMessage className="text-danger" name="cpassword">
                            {(error) => <div className="text-danger">{error}</div>}
                        </ErrorMessage>
                        <br/><Button variant="secondary" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' >
                        Save
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Formik>
  </>)
}
export default UpdateModal;