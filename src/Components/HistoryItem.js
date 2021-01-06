import React,{ useState, useEffect, useRef } from 'react';
import Moment from 'react-moment';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Grid, Typography, Container, CardContent, CardActions, CardHeader, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Message from './MessageItem';
const useStyles = makeStyles((theme) => ({
    backgroundWin: {
        backgroundColor: 'cyan'
    },
    bold: {
        fontWeight: 'bold'
    },
    cardItem_win: {
        width: '100%',
        marginBottom: '10px',
        backgroundColor: '#3af082'
    },
    cardItem_lose: {
        width: '100%',
        marginBottom: '10px',
        backgroundColor: '#ed2b5b'
    },
    cardItem_draw: {
        width: '100%',
        marginBottom: '10px',
        backgroundColor: '#d1cdce'
    },
    messList: {
        flexGrow: 1,
        minWidth: '500px',
        minHeight: '200px',
        overflow: 'auto',
    },
}));

export default function HistoryItem(props) {
    const { item, index, userId } = props;
    const classes = useStyles();
    const [openChat, setOpenChat] = useState(false);
    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (openChat) {
          const { current: descriptionElement } = descriptionElementRef;
          if (descriptionElement !== null) {
            descriptionElement.focus();
          }
        }
      }, [openChat]);


    const handleClickOpenChat = () => () => {
        setOpenChat(true);
    };
    const handleClose = () => {
        setOpenChat(false);
    };

    const playerPosition = userId === item.player1.id ? 1 : 2;
    let matchResult = 0; // 0 hòa - 1 win - 2 thua

    if(item.winner === 0) matchResult = 0;
    else if(playerPosition === item.winner) matchResult = 1;
    else matchResult = 2;
    
    const conditionRenderWinner = () =>{
        switch(matchResult) {
            case 0:
                return <Typography align="center" variant="h4" style={{color: '#8c898a'}} gutterBottom>Hòa</Typography>;
            case 1:
                return <Typography align="center" variant="h4" style={{color: '#2bba64' }} gutterBottom>
                            Chiến thắng
                </Typography>
            case 2:
                return <Typography align="center" variant="h4" style={{color: '#911332'}} gutterBottom>
                            Thua cuộc
                </Typography>
        }
    }
    const conditionRenderClass = () =>{
        switch(matchResult) {
            case 0:
                return classes.cardItem_draw
            case 1:
                return classes.cardItem_win
            case 2:
                return classes.cardItem_lose
        }
    }
    return (
        <div>
        <Dialog
        open={openChat}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        ><DialogTitle id="scroll-dialog-title">Chat history</DialogTitle>
            <DialogContent dividers={true}>
                <div
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                >
                <div className={classes.messList}>
                {item.chat.length ? item.chat.map((item, index) =>
                    <Message key={index} message={item}/>
                ) : <h2>Không có gì để hiện thị</h2>}
                </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
            </DialogActions>
        </Dialog>
        <Card className={conditionRenderClass()} variant="outlined">
            <CardContent>
                <Typography align="left" variant="caption" gutterBottom>
                    #{index + 1}
                </Typography>
                {conditionRenderWinner()}
                <Grid container>
                    <Grid item xs={4}>
                        <Typography align="center" variant="h6">Người chơi</Typography>
                        <Typography align="center" className={playerPosition === 1 ? classes.bold : null}>Người chơi X: {item.player1.name}</Typography>
                        <Typography align="center" className={playerPosition === 2 ? classes.bold : null}>Người chời O: {item.player2.name}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="center" variant="h6">Thời gian</Typography>
                        <Typography align="center">
                            <Moment format="hh:mm">
                                {item.date}
                            </Moment>
                        </Typography>
                        <Typography align="center">
                            <Moment format="DD/MM/YYYY">
                                {item.date}
                            </Moment>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography align="center" variant="h6">Số nước đi</Typography>
                        <Typography align="center">{item.move[0] ? item.move[0].history.length - 1 : "0"}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Button onClick={handleClickOpenChat()} fullWidth style={{backgroundColor: '#8c898a'}} variant="contained">Xem nội dung chat</Button>
            </CardActions>
        </Card>
    </div>
    )
}
