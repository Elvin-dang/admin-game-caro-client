import React,{ useState, useEffect, useRef } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, CircularProgress} from '@material-ui/core';
import gameApi from '../../api/gameApi';
import MyDialog from '../../Components/MyDialog';
import Moment from 'react-moment';

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
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
});
function Games(props){
    const classes = useStyles();
    const [listGames,setListGames] = useState(null);
    const [openChat, setOpenChat] = useState(false);
    const [messOnDialog, setMessOnDialog] = useState(null);
    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (openChat) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [openChat]);
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
    const handleClickOpenChat = (row) => () => {
      setMessOnDialog(row);
      setOpenChat(true);
    };
    const handleClose = () => {
        setOpenChat(false);
    };
    if(listGames === null) return <div className={classes.root}><CircularProgress /></div>
    return (
        <div >
          <MyDialog openChat={openChat} game={messOnDialog} handleClose={handleClose} descriptionElementRef={descriptionElementRef} />
            <div>
                <h3>Danh sách các trận đấu</h3>
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
                            <Moment format="ddd DD/MM/YYYY hh:mm:ss">{row.date}</Moment>
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.player1.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.player2.name}</StyledTableCell>
                        <StyledTableCell align="right">{row.winner === 1 ? row.player1.name : row.player2.name}</StyledTableCell>
                        <StyledTableCell align="right"><Button onClick={handleClickOpenChat(row)} color="primary">Xem Chat</Button></StyledTableCell>
                        </StyledTableRow>
                    )) : null}
                    </TableBody>
                </Table>
                </TableContainer>
        </div>
    );
}

export default Games;