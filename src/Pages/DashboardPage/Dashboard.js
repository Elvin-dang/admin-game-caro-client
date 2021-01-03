import React, { useState, useEffect }from 'react';
import {Button} from '@material-ui/core'
import userApi from '../../api/userApi';




function Dashboard(props){
    const [currentUser,setCurrentUser] = useState({});
    useEffect(()=>{
		const fetchUser = async () => {
            try {
                const response = await userApi.getCurUser();
				setCurrentUser(response);
            } catch(err) {

            }
        }
        fetchUser();
	}, []);
    console.log(currentUser);
    return (
        <div >
            <div className='col-md-6'>
                <h1>Hi! {currentUser.name}</h1>
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