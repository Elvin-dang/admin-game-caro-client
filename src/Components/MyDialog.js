
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button, Dialog, DialogTitle, DialogActions, DialogContent, Typography } from '@material-ui/core';
import Message from './MessageItem';

const useStyles = makeStyles({
    messList: {
      flexGrow: 1,
      minWidth: '500px',
      minHeight: '200px',
      overflow: 'auto',
    },
});

function MyDialog(props){
    const classes = useStyles();
    const { openChat, game, handleClose, descriptionElementRef } = props;
    
    if(game === null) return <p></p>;
    return(<Dialog
    open={openChat}
    onClose={handleClose}
    scroll='paper'
    aria-labelledby="scroll-dialog-title"
    aria-describedby="scroll-dialog-description"
    ><DialogTitle id="scroll-dialog-title">Nội dung chat</DialogTitle>
        <DialogContent dividers={true}>
            <div
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            >
            <div className={classes.messList}>
            {game.chat.length ? game.chat.map((item, index) =>
                <Message key={index} message={item}/>
            ) : <Typography variant="h5" align="center">Không có gì để hiện thị</Typography>}
            </div>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
            Hủy
            </Button>
        </DialogActions>
    </Dialog>)
}
export default MyDialog;