import React from "react";
import "./OpeningHours.css";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: '50%',
    margin: 'auto',
    "@media (max-width: 48rem)": {
      width: '100%',
    },
  },
  tableHeadCell: {
    fontWeight: "bold",
  },
   
}));

function createData(id, month, days, entry, sightseeing) {
  return { id, month, days, entry, sightseeing};
}

const rows = [
  createData(1, 'January, February'	, 'Monday-Sunday', '10.00 am – 2.00 pm', '3.00 pm'),
  createData(2, 'March, April', 'Monday-Friday', '9.00 am – 3.00 pm', '4.00 pm'),
  createData(3, 'March, April', 'Saturday-Sunday', '8.00 am – 4.00 pm', '5.00 pm'),
  createData(4, 'May, June, July, August, September', 'Monday-Friday', '8.00 am – 6.00 pm', '7.00 pm'),
  createData(5, 'May, June, July, August, September', 'Saturday-Sunday', '8.00 am – 7.00 pm', '8.00 pm'),
  createData(6, 'October', 'Monday-Sunday', '10.00 am – 4.00 pm', '5.00 pm'),
  createData(7, 'November, December', 'Monday-Sunday', '10.00 am – 2.00 pm', '3.00 pm'),
];

const OpeningHours = () => {
  const classes = useStyles();
  return (
    <div>
      <h1 className="greyTitle">Opening hours</h1>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadCell} align="center">Month</TableCell>
              <TableCell className={classes.tableHeadCell} align="center">Days</TableCell>
              <TableCell className={classes.tableHeadCell} align="center">Entry</TableCell>
              <TableCell className={classes.tableHeadCell} align="center">Open Till</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.month}</TableCell>
                <TableCell align="center">{row.days}</TableCell>
                <TableCell align="center">{row.entry}</TableCell>
                <TableCell align="center">{row.sightseeing}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OpeningHours;