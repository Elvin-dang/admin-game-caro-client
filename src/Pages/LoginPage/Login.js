import React from 'react';
import { Formik, Field, Form  } from 'formik';
import {Card,Grid} from '@material-ui/core'
import * as Yup from 'yup';
import caroImg from '../../Assets/caroImg.jpg'
import  authenticationService  from '../../Services/Authentication_service';

function LoginPage(props){   
    if (authenticationService.currentUserValue) { 
        props.history.push('/');
    }

    return (
        <div style={{marginTop:'10%',marginLeft:'8%'}}>
            <Grid container  direction="row"  justify="center"  alignItems="center" style={{textAlign: 'center'}}>
                <Card style={{height:'350px',width:'350px',textAlign: 'center',borderTopLeftRadius:'25px',borderBottomLeftRadius:'25px',padding:'25px'}}>
                    <h2 style={{marginBottom:'20px'}}>Đăng nhập</h2>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string().required('Email is required'),
                            password: Yup.string().required('Password is required')
                        })}
                        onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                            setStatus();
                            authenticationService.login(email, password)
                                .then(
                                    user => {
                                        const { from } = props.location.state || { from: { pathname: "/" } };
                                        props.history.push(from);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                        }}
                        render={({ errors, status, touched, isSubmitting }) => (
                            <Form>
                                <div className="form-group">
                                    <Field placeholder="Email"name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                </div>
                                <div className="form-group">
                                    <Field placeholder="Password" name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Login</button>
                                    {isSubmitting &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                </div>
                                {status &&
                                    <div className={'alert alert-danger'}>Email hoặc pasword không đúng</div>
                                }
                            </Form>
                        )}
                    />
                </Card>
                <Card style={{height:'350px',width:'350px',textAlign: 'center',borderTopRightRadius:'25px',borderBottomRightRadius:'25px',padding:'25px'}}>
                    <h2>Super Admin</h2>
                    <img src={caroImg} style={{width:'80%',height:'80%'}}/>
                </Card>
            </Grid>
        </div>
    )
}

export default LoginPage;