import React,{ useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button} from '@material-ui/core';
import gameApi from '../../api/gameApi';

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
function Games(props){
    const classes = useStyles();
    const [listGames,setListGames] = useState(null);
    useEffect(()=>{
		const fetchUser = async () => {
            try {
                const response = await gameApi.getAll();
				setListGames(response);
            } catch(err) {

            }
        }
        fetchUser();
	}, []);

    console.log(listGames);
    return (
        <div >
            <div>
                <h3>Danh sách các bàn chơi</h3>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Ngày chơi</StyledTableCell>
                        <StyledTableCell align="right">Người chơi 1</StyledTableCell>
                        <StyledTableCell align="right">Người chơi 2</StyledTableCell>
                        <StyledTableCell align="right">Người thắng</StyledTableCell>
                        <StyledTableCell align="right">Chat</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {listGames !== null ? listGames.map((row) => (
                        <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                            {row.date}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.player1.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.player2.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.winner === 1 ? row.player1.name : row.player2.name}</StyledTableCell>
                        <StyledTableCell align="right"><Button color="primary">Xem Chat</Button></StyledTableCell>
                        </StyledTableRow>
                    )) : null}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    );
}

export default Games;