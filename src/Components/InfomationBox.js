import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Avatar, Box, Grid, Typography, Divider } from '@material-ui/core';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
    root:{
        padding:'10px'
    },
	infomation: {
		display: 'flex',
		padding: theme.spacing(2),
	}
}));
export default function Profile(props) {
    const { user } = props;
    const classes = useStyles();
    
    return(
    <Box bgcolor="grey.200" borderRadius="borderRadius" boxShadow={2} className={classes.root}>
        <Box bgcolor="cyan" borderRadius="borderRadius" boxShadow={2}  >
            <Box display="flex" justifyContent="center" p={3} >
                <Avatar alt="avatar" src={user.avatar} />
            </Box>
            <Box display="flex" justifyContent="center" p={1} >
                <h2>{user.name}</h2>
            </Box>
        </Box>
        <Divider />
        <Paper class={classes.infomation}>
            <Grid  container spacing={1} >
                <Grid item xs={12} >
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Email:</Typography>
                    <Typography variant="h6" gutterBottom>{user.email}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Ngày tạo:</Typography>
                    <Typography variant="h6" gutterBottom>
                        <Moment format="DD/MM/YYYY">
                            {user.date}
                        </Moment>
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Rank:</Typography>
                    <Typography variant="h6" gutterBottom>{user.rank}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Elo:</Typography>
                    <Typography variant="h6" gutterBottom>{user.elo}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Tỉ lệ thắng:</Typography>
                    <Typography variant="h6" gutterBottom>{(user.game.total === 0 ? "0 %" : (Math.round(user.game.win * 100)/user.game.total).toFixed(2) + " %")}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Tổng game đã chơi:</Typography>	
                    <Typography variant="h6" gutterBottom>{user.game.total}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" style={{fontWeight: 'bold'}}>Số trận (thắng/thua/hòa):</Typography>	
                    <Typography variant="h6" gutterBottom>{user.game.win} / {user.game.lose } / {user.game.draw}</Typography>
                </Grid>
            </Grid>
        </Paper>
    </Box>
    )
}
