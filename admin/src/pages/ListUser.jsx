import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styled from "styled-components";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUser } from '../redux/callAPI';
import { Link } from 'react-router-dom';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

const Button = styled.button`
    padding: 4px 6px;
    width: 50%;
    margin-top: 6px;
    border: none;
    border-radius:2px;
    background-color: ${ ( props => {
        if ( props.type === "update" ) {
            return "#ffff4f";
        } else if ( props.type === "delete" ) {
            return "#ff5a5a";
        }
    } ) };
    
    & a {
        text-decoration: none;
    }

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
    
`;

const ButtonCreate = styled.button`
    margin: 20px 8px;
    padding: 8px 16px;
    border: none;
    background-color: #60c5ff;
    color: white;
    cursor: pointer;
`;

const ListUser = () => {
    const dispatch = useDispatch();
    const { listUser } = useSelector( state => state.users );

    useEffect( () => {
        ( localStorage.getItem( "accessToken" ) && !listUser.length ) && getUser( dispatch );
    }, [ dispatch, listUser ] )

    const hanldeDelete = ( id ) => {
        deleteUser( dispatch, id );
    }

    return (
        <>
            <Link to="/app/user">
                <ButtonCreate>Create new user</ButtonCreate>
            </Link>
            <TableContainer component={ Paper }>
                <Table sx={ { minWidth: 650 } } aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>FirstName</TableCell>
                            <TableCell align="left">LastName</TableCell>
                            <TableCell align="left">UserName</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">isAdmin</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { listUser.map( ( user ) => (
                            <TableRow
                                key={ user._id }
                                sx={ { '&:last-child td, &:last-child th': { border: 0 } } }
                            >
                                <TableCell component="th" scope="row">
                                    { user.firstname }
                                </TableCell>
                                <TableCell align="left">{ user.lastname }</TableCell>
                                <TableCell align="left">{ user.username }</TableCell>
                                <TableCell align="left">{ user.email }</TableCell>
                                <TableCell align="left">{ user.isAdmin ? "Yes" : "No" }</TableCell>
                                <TableCell align="right">
                                    <Wrapper>
                                        <Button type="update">
                                            <Link to={ `/app/user/${ user._id }` }>
                                                Update
                                            </Link>
                                        </Button>
                                        <Button type="delete" onClick={ () => hanldeDelete( user._id ) }>
                                            Delete
                                        </Button>
                                    </Wrapper>
                                </TableCell>
                            </TableRow>
                        ) ) }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ListUser;