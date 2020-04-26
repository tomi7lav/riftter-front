import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


const getCities = () => {
    return fetch('http://localhost:3000/users').then((response) => {
        console.log({ response })
        return response.json();
    })
    .then((data) => {
        console.log({ dataaa: data })
        return data;
    });
}

const Users = ({ userId = 'Tommy' }) => {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        getCities().then(result => {
            console.log({ result })
            setCities(result.users);
        });
    }, [userId]);

    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Cities</TableCell>
                    <TableCell align="right">Low</TableCell>
                    <TableCell align="right">High</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {cities.map((city, index) => (
                <TableRow key={`${city.city}-${index}`}>
                    <TableCell component="th" scope="row">{city.city}</TableCell>
                    <TableCell component="th" scope="row">{city.temp_lo}</TableCell>
                    <TableCell align="right">{city.temp_hi}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    ); 
}



export default Users;