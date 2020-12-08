import React , { useState, useEffect }from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import swal from "sweetalert";
import config from '../../Helpers/Config';

const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('email is required'),
    password: Yup.string().required('Password is required'),
    checkpassword: Yup.string().required('Confirm password is required').oneOf(
        [Yup.ref("password"),null],
        "Both password need to be the same"
    ),
});

function RegistrationPage(props){   

    const submitForm = (values, history) => {
        fetch(`${config.apiTestLocal}` + "api/admin/signup",{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( {
              name: values.name,
              email: values.email,
              password: values.password})
        })
          .then(res => {
            if (res.status === 200) {
              swal("Success!", "New Account created", "success").then(value => {
                history.push("/");
              });
            } else if (res.status === 403) {
              swal("Error!","Email already exist!","error");
            }
          })
          .catch(error => {
            console.log(error);
            swal("Error!", "Unexpected error", "error");
          });
      };

    const showForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group has-feedback">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name}
                className="form-control"
                placeholder="Name"
                className={
                  errors.name && touched.name
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
            </div>
            <div className="form-group has-feedback">
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={values.email}
                className="form-control"
                placeholder="Email"
                className={
                  errors.email && touched.email
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {errors.email && touched.email ? (
                <small id="passwordHelp" class="text-danger">
                  {errors.email}
                </small>
              ) : null}
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
                className="form-control"
                placeholder="Password"
                className={
                  errors.password && touched.password
                    ? "form-control is-invalid"
                    : "form-control"
                }
              />
              {errors.password && touched.password ? (
                <small id="passwordHelp" class="text-danger">
                  {errors.password}
                </small>
              ) : null}
            </div>
            <div className="form-group has-feedback">
              <input
                type="password"
                name="checkpassword"
                onChange={handleChange}
                className={
                  errors.checkpassword && touched.checkpassword
                    ? "form-control is-invalid"
                    : "form-control"
                }
                placeholder="Confirm Password"
              />
              {errors.checkpassword && touched.checkpassword ? (
                <small id="passwordHelp" class="text-danger">
                  {errors.checkpassword}
                </small>
              ) : null}
            </div>
            <div className="row">
              <div className="col-md-12">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-primary btn-block btn-flat"
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        );
      };


    return (
      <div  className="col-md-6 offset-md-3">
        <div className="register-box">
          <div style={{display: 'flex', justifyContent:'center', alignItems:'center', fontSize:30}}>
              <b>Register</b>
          </div>
          <div className="card">
            <div className="card-body register-card-body">
  
              <Formik
                initialValues={{
                  name: "",
                  email:"",
                  password: "",
                }}
                onSubmit={(values, { setSubmitting }) => {
                  const valueNewUser = {name: values.name,
                  email:values.email,
                  password: values.password};
                  submitForm(valueNewUser, props.history);
                  setSubmitting(false);
                }}
                validationSchema={SignupSchema}
              >
                {props => showForm(props)}
              </Formik>
            </div>
          </div>
        </div>
        </div>
      );
}

export default RegistrationPage;