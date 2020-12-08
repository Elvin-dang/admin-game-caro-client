import React from 'react';
import {Button} from '@material-ui/core'

function Dashboard(props){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return (
        <div>
            <div className='col-md-6'>
                <h1>Hi {currentUser.firstName}!</h1>
                <p>Welcome to Admin Page</p>
                <p>DACK - WEB NANG CAO!</p>
                <Button href='/register' variant="contained" color="primary">
                Tạo tài khoản mới
                </Button>
            </div>
        </div>
    );
}

export default Dashboard;