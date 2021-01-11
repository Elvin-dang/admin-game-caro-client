import React,{ useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Input, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import userApi from '../../api/userApi';
import swal from 'sweetalert';

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
function Users(props){
    const classes = useStyles();
    const [isSearch,setIsSearch] = useState(false);
    const [typeSearch,setTypeSearch] = useState('');
    const [keySearch,setKeySearch] = useState('');
    const [listUsers,setListUsers] = useState(null);
    const [listUsersSearched,setListUsersSearched] = useState(null);
    useEffect(()=>{
		const fetchUser = async () => {
            try {
                const response = await userApi.getAll();
				setListUsers(response);
            } catch(err) {

            }
        }
        fetchUser();
	}, [listUsers]);
    
    const handleKeySearchChange = (event) =>{
        setKeySearch(event.target.value);
    };

    const handleTypeSearchChange = (event) => {
        setTypeSearch(event.target.value);
      };

    const handleSearch = () =>{
        if(typeSearch===''){
            swal("Vui lòng chọn loại từ khóa muốn tìm!");
        }
        if(typeSearch!=='' && keySearch!=='')
        {
            setIsSearch(true);
            let listSearch=[];
            if(typeSearch === 'name')
            {
                for(let a = 0 ; a<listUsers.length;a++)
                {
                    if(listUsers[a].name.toLowerCase().indexOf(keySearch.toLowerCase())>=0)
                    listSearch.push(listUsers[a]);
                }
            }
            if(typeSearch === 'email')
            {
                for(let a = 0 ; a<listUsers.length;a++)
                {
                    if(listUsers[a].email.toLowerCase().indexOf(keySearch.toLowerCase())>=0)
                    listSearch.push(listUsers[a]);
                }
            }
            setListUsersSearched(listSearch);
        }
    }

    const handleUnSearch = () =>{
        setIsSearch(false);
    }

    const activeUser = async (id) => {
        try {
            const response = await userApi.active(id);
            if(response.result === true){
                swal("Thành công!",'Đã mở khóa người chơi!','success');
            }else{
                swal("Lỗi!",'Đã có lỗi xảy ra!','error');
            }
        } catch(err) {
            swal("Lỗi!",'Đã có lỗi xảy ra!','error');
        }
    }

    const blockUser = async (id) => {
        try {
            const response = await userApi.block(id);

            if(response.result === true){
                swal("Thành công!",'Đã khóa người chơi!','success');
            }else{
                swal("Lỗi!",'Đã có lỗi xảy ra!','error');
            }
        } catch(err) {
            swal("Lỗi!",'Đã có lỗi xảy ra!','error');
        }
    }

    const activeUndefineUser = async (id) => {
        try {
            const response = await userApi.activeUndefine(id);
            if(response.result === true){
                swal("Thành công!",'Đã mở khóa người chơi!','success');
            }else{
                swal("Lỗi!",'Đã có lỗi xảy ra!','error');
            }
        } catch(err) {
            swal("Lỗi!",'Đã có lỗi xảy ra!','error');
        }
    }

    const blockUndefineUser = async (id) => {
        try {
            const response = await userApi.blockUndefine(id);

            if(response.result === true){
                swal("Thành công!",'Đã khóa người chơi!','success');
            }else{
                swal("Lỗi!",'Đã có lỗi xảy ra!','error');
            }
        } catch(err) {
            swal("Lỗi!",'Đã có lỗi xảy ra!','error');
        }
    }

    const handleChangeActiveStatus = (id,status) =>{
        if(status === '1')
        {
            blockUndefineUser(id);
        }
        else if (status === '2')
        {
            blockUser(id);
        }
        else if (status === '3')
        {
            activeUser(id);
        }
        else if (status === '4')
        {
            activeUndefineUser(id);
        }
    }

    if(listUsers === null) return <div className={classes.root}><CircularProgress /></div>
    return (
        <div >
            <div>
                <h3>Danh sách người chơi</h3>
            </div>
            <Input style={{margin:'10px'}} placeholder="Nhập từ khóa cần tìm theo" onChange={handleKeySearchChange}></Input>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeSearch}
                label="Chọn loại từ khóa"
                onChange={handleTypeSearchChange}>
                <MenuItem value='name'>Tên</MenuItem>
                <MenuItem value='email'>Email</MenuItem>
            </Select>
            <Button color="primary" onClick={()=> handleSearch()}>Tìm</Button>   
            <Button  onClick={()=> handleUnSearch()}>Hủy</Button>                 
          <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Tên</StyledTableCell>
                        <StyledTableCell align="right">Loại tài khoản</StyledTableCell>
                        <StyledTableCell align="right">Email</StyledTableCell>
                        <StyledTableCell align="right">Số game</StyledTableCell>
                        <StyledTableCell align="right">Rank</StyledTableCell>
                        <StyledTableCell align="right">Elo</StyledTableCell>
                        <StyledTableCell align="right">Trạng thái</StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                    </TableRow>
                    </TableHead>
                    {isSearch === false ?
                    <TableBody>
                    {listUsers !== null ? listUsers.map((row) => (
                        <StyledTableRow key={row._id}>
                        <StyledTableCell component="th" scope="row">
                            <Link to={{ pathname: `/user/${row._id}`, user: row }}>{row.name}</Link>
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.accessType}</StyledTableCell>
                        <StyledTableCell align="right">{row.email}</StyledTableCell>
                        <StyledTableCell align="right">{row.game.total}</StyledTableCell>
                        <StyledTableCell align="right">{row.rank}</StyledTableCell>
                        <StyledTableCell align="right">{row.elo}</StyledTableCell>
                        <StyledTableCell align="right" style={{color:row.active === '1' ? "yellow" : (row.active === '2'  ? "green" : "red")}}>{row.active === '1' ? "Chưa kích hoạt" : (row.active === '2'  ? "Đã kích hoạt" : "Đã khóa")}</StyledTableCell>
                        <StyledTableCell align="right"><Button color="primary" onClick={()=> handleChangeActiveStatus(row._id,row.active)} style={{color:row.active === '1' ? "red" : (row.active === '2'  ? "red" : "green")}}>{row.active === '1' ? "Khóa" : (row.active === '2'  ? "Khóa" : "Mở khóa")}</Button></StyledTableCell>
                        </StyledTableRow>
                    )) : null}
                    </TableBody>    : 
                    <TableBody>
                    {listUsersSearched !== null ? listUsersSearched.map((row) => (
                        <StyledTableRow key={row._id}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.accessType}</StyledTableCell>
                            <StyledTableCell align="right">{row.email}</StyledTableCell>
                            <StyledTableCell align="right">{row.game.total}</StyledTableCell>
                            <StyledTableCell align="right">{row.rank}</StyledTableCell>
                            <StyledTableCell align="right">{row.elo}</StyledTableCell>
                            <StyledTableCell align="right" style={{color:row.active === '1' ? "yellow" : (row.active === '2'  ? "green" : "red")}}>{row.active === '1' ? "Chưa kích hoạt" : (row.active === '2'  ? "Đã kích hoạt" : "Đã khóa")}</StyledTableCell>
                            <StyledTableCell align="right"><Button color="primary" onClick={()=> handleChangeActiveStatus(row._id,row.active)} style={{color:row.active === '1' ? "red" : (row.active === '2'  ? "red" : "green")}}>{row.active === '1' ? "Khóa" : (row.active === '2'  ? "Khóa" : "Mở khóa")}</Button></StyledTableCell>
                        </StyledTableRow>
                    )) : null}
                    </TableBody> 
                    }
                </Table>
                </TableContainer>
        </div>
    );
}

export default Users