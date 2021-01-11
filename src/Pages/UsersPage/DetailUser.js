import React,{ useState, useEffect} from 'react';
import { Box, Grid, Typography, Container, IconButton, LinearProgress } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InfomationBox from '../../Components/InfomationBox';
import HistoryBox from '../../Components/HistoryBox';
import userApi from '../../api/userApi';
import { Link, useParams, useLocation, useHistory } from 'react-router-dom';

export default function DetailUser (props){
    const historyPage = useHistory();
    const curUser = useLocation().user;
    const [user, setUser] = useState(curUser);
    const { id } = useParams();
    useEffect(()=>{
		const fetchUser = async () => {
            try {
                const response = await userApi.getUserById(id);
				setUser(response);
            } catch(err) {

            }
        }
        fetchUser();
    }, []);


    if(user == null)    return <LinearProgress/>;
    return (	
    <main>
        <div>
          <Container maxWidth="md" >
            <Grid container alignItems='center' justify='center'>
                <Grid item xs={1} >
                    <IconButton onClick={() => historyPage.goBack()} style={{height: '100%'}}>
                        <ArrowBackIcon></ArrowBackIcon>
                    </IconButton>
                </Grid>
                <Grid item xs={11}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Thông tin cá nhân
                    </Typography>
                </Grid>
            </Grid>
          </Container>
        </div>
        <div>
            <Container >
                <Grid container spacing={2} >
                    <Grid item xs={3} >
                        <InfomationBox user={user}/>
                    </Grid>
                    <Grid item xs={9}>
                        <Box display="flex" justifyContent="center" p={3} bgcolor="#a8adaa" style={{marginBottom: '10px'}}>
                            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
                                Lịch sử đấu
                            </Typography>
						</Box>
						<HistoryBox history={user.history} userId={user._id}/>
	        		</Grid>
                </Grid>
            </Container>
        </div>
    </main>);
    
}
