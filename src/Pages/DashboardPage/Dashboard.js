import React, { useState, useEffect }from 'react';
import {Button,Card,CardContent,Grid,Typography,Paper } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, LinearProgress } from '@material-ui/core';
import userApi from '../../api/userApi';
import gameApi from '../../api/gameApi';
import { Link } from 'react-router-dom';

import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
  } from '@devexpress/dx-react-chart-material-ui';
  
  import { Animation } from '@devexpress/dx-react-chart';

  
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
});

const date = new Date();

const get7days = () =>{
    let days = [];
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() - 1);
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() - 1);
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() - 1);
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() - 1);
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() - 1);
    days.push(date.toISOString().split('T')[0]);
    date.setDate(date.getDate() - 1);
    days.push(date.toISOString().split('T')[0]);
    return days;
}
const days=get7days();
function Dashboard(props){
    const classes = useStyles();

    const [listUsers,setListUsers] = useState([]);
    const [listGames,setListGames] = useState([]);
    const [topPlayers,setTopPlayers] = useState([]);

    let dataChart = [];
    let actived = 0;
    let disactived = 0;
    let blocked = 0;
    useEffect(()=>{
        fetchUsers();
        fetchGames();
        fetchTopPlayers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userApi.getAll();
            setListUsers(response);
        } catch(err) {

        }
    }
    const fetchGames = async () => {
        try {
            const response = await gameApi.getAll();
            setListGames(response);
        } catch(err) {

        }
    }

    const fetchTopPlayers = async () => {
        try {
            const response = await userApi.getTopPlayers();
            setTopPlayers(response);
        } catch(err) {

        }
    }

    if(listGames.length > 0)
    {
        let value = [0,0,0,0,0,0,0];
        for(let a = 0 ; a < listGames.length ; a++)
        {
            let flag = days.indexOf(listGames[a].date.toString().split('T')[0]);
            if(flag >= 0)
            {
                value[flag] ++;
            }
        }
        for(let b=0;b<7;b++)
        {
            dataChart.push({"day":days[b],"games":value[b]});
        }
    }

    if(listUsers.length>0)
    {
        for(let a = 0 ; a < listUsers.length ; a++)
            {
                if(listUsers[a].active === '1')
                disactived++;
                else if(listUsers[a].active === '2')
                actived++;
                else if(listUsers[a].active === '3' || listUsers[a].active === '4')
                blocked++;
            }
    }
    return (
        <div >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container pacing={2} style = {{marginTop:'10px',marginBottom:'10px',display: 'inline'}}>
                            <Button href='/register' variant="contained" color="primary" style={{float:'right'}}>
                            Tạo tài khoản Admin
                            </Button>  
                        </Grid>
                        <h3  style={{margin:'20px'}}> Tổng quan </h3>
                        <Grid container justify="center" spacing={2} style = {{marginTop:'10px',marginBottom:'40px'}}>
                            <Card style={{width:'250px',height:'150px',marginRight:'20px',backgroundImage:'linear-gradient(to left bottom,#FCDDC0, #FF9B40)',borderRadius:'10px'}}>
                                <CardContent>
                                    <Typography  color="textSecondary" gutterBottom align="center">
                                    Tổng số người dùng
                                    </Typography>
                                    <Typography variant="h5" component="h2" align="center">
                                    {listUsers!== undefined ? listUsers.length : 0}
                                    </Typography>
                                    <img src = "chart-img.svg" alt="" />
                                </CardContent>
                            </Card>
                            <Card style={{width:'250px',height:'150px',marginRight:'20px',backgroundImage:'linear-gradient(to left bottom,#A0F6BD, #2EB85C)',borderRadius:'10px'}}>
                                <CardContent>
                                    <Typography  color="textSecondary" gutterBottom align="center">
                                    Người dùng đã kích hoạt
                                    </Typography>
                                    <Typography variant="h5" component="h2" align="center">
                                    {actived}
                                    </Typography>
                                    <img src = "chart-img.svg" alt="" />
                                </CardContent>
                            </Card>
                            <Card style={{width:'250px',height:'150px',marginRight:'20px',backgroundImage:'linear-gradient(to left bottom,#E2D5ED, #79818D)',borderRadius:'10px'}}>
                                <CardContent>
                                    <Typography  color="textSecondary" gutterBottom align="center">
                                    Người dùng chưa kích hoạt
                                    </Typography>
                                    <Typography variant="h5" component="h2" align="center">
                                    {disactived}
                                    </Typography>
                                    <img src = "chart-img.svg" alt="" />
                                </CardContent>
                            </Card>
                            <Card style={{width:'250px',height:'150px',marginRight:'20px',backgroundImage:'linear-gradient(to left bottom,#F68888, #E55353)',borderRadius:'10px'}}>
                                <CardContent>
                                    <Typography  color="textSecondary" gutterBottom align="center">
                                    Người dùng đã khóa
                                    </Typography>
                                    <Typography variant="h5" component="h2" align="center">
                                    {blocked}
                                    </Typography>
                                    <img src = "chart-img.svg" alt="" />
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid container pacing={2} style = {{marginTop:'20px',marginBottom:'10px',display: 'inline'}}>
                            <h3  style={{margin:'20px'}}> Số game trong tuần </h3>
                            <Paper>
                                {listGames.length === 0 && <LinearProgress />}
                                <Chart
                                data={dataChart}>
                                <ArgumentAxis />
                                <ValueAxis/>
                                <BarSeries
                                    valueField="games"
                                    argumentField="day"/>
                                <Animation />
                                </Chart>
                            </Paper>  
                        </Grid>
                        <Grid container pacing={2} style = {{marginTop:'20px',marginBottom:'10px',display: 'inline'}}>
                            <h3  style={{margin:'20px',marginTop:'40px'}}> Top Người chơi </h3>
                            {topPlayers.length === 0 && <LinearProgress />}
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell>ID</StyledTableCell>
                                        <StyledTableCell align="right">Tên</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {topPlayers !== null ? topPlayers.map((row) => (
                                        <StyledTableRow key={row._id}>
                                        <StyledTableCell component="th" scope="row">
                                            <Link to={{ pathname: `/user/${row._id}` }}>{row._id}</Link>
                                        </StyledTableCell>
                                        <StyledTableCell align="right"><Link to={{ pathname: `/user/${row._id}` }}>{row.name}</Link></StyledTableCell>
                                        </StyledTableRow>
                                    )) : null}
                                    </TableBody>   
                                </Table>
                                </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
        </div>
    );
}

export default Dashboard;