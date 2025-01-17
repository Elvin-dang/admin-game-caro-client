import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { Card, Button, Avatar, Box, CssBaseline, Grid, Typography, Container, TextField, GridList, CardContent, GridListTile } from '@material-ui/core';
import HistoryItem from './HistoryItem'
const useStyles = makeStyles((theme) => ({
}));

export default function HistoryBox(props) { 
    const { history, userId } = props;
    const classes = useStyles();
    
    if(history.length === 0) return <Typography align="center" variant="h4">Chưa có trận đấu nào</Typography>

	return (
        <Box width="100%" >
            {history.reverse().map((item, index) =>
                <HistoryItem key={index} index={index} item={item} userId={userId}/>
            )}
        </Box>
    );
}