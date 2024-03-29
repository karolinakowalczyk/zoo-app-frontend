import React, { useState, useEffect } from "react";
import ReservationsService from "../services/reservations.service";
import AuthService from "../services/auth.service";
import { Alert, TableCell, TableRow, Table, TableBody, TableHead, TableSortLabel, Box, TablePagination, Paper, TableContainer, TextField, Button, Grid } from '@mui/material/';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PropTypes from 'prop-types';
import { visuallyHidden } from '@mui/utils';
import getComparator from "../helpers/getComparator";
import stableSort from "../helpers/stableSort";
import useInfoStyles from "../styles/useInfoStyles";
import displayDate from "../helpers/displayDate";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";

import CloseIcon from '@mui/icons-material/Close';

const headCells = [
  {
    id: 'name',
    label: 'Reservation Name',
  },
  {
    id: 'date',
    label: 'Date',
  },
  {
    id: 'expirationDate',
    label: 'Expiration Date',
  },
];

const TableHeadFunc = (props) => {
  const { order, orderBy,  onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            padding='normal'
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

TableHeadFunc.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const ReservationsList = () => {
  const [reservationsData, setReservationsData] = useState([]);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('reservation');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dateValue, setDateValue] = useState([null, null]);
  const [search, setSearch] = useState({ searchFun: items => { return items; } });

    useEffect(() => {
    ReservationsService.getUserReservations(currentUser.id).then(
      (response) => {
        setReservationsData(response.data);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
          setMessage(resMessage);
          setSuccessful(false); 
      }
    );
  }, [currentUser.id]);
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reservationsData.length) : 0;


  const classes = useInfoStyles();

  const handeSearchReservations = (newValue) => {
    setSearch({
      searchFun: items => {
        if (newValue[0] === null || newValue[1] === null) {
          return items;
        }

        else if (items.filter(x => (new Date(newValue[0]) <= new Date(x.date)) && (new Date(newValue[1]) >= new Date(x.date)) ).length > 0) {
          return items.filter(x => (new Date(newValue[0]) <= new Date(x.date)) && (new Date(newValue[1]) >= new Date(x.date)));
        }
        else {
          return [];
        }
        }
    })
  }
  const clearReservationFilters = () => {
    setDateValue([null, null]);
    setSearch({
      searchFun: items => {
        return items;
        }
    })
  }

  return (
    <div>
      {!successful && (
        <div>
            <Alert severity="error" >{message}</Alert>
        </div>
      )}
      {reservationsData.length > 0 ?  
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <h1 className={classes.greyTitle}>Your reservations</h1>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{mb: '2rem'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Start date"
                endText="End date"
                value={dateValue}
                onChange={(newValue) => {
                  setDateValue(newValue);
                  handeSearchReservations(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} sx={{ ml: 2}}/>
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} sx={{ mr: 2}} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
              <Button onClick={clearReservationFilters} sx={{ border: '1px solid', borderColor: 'secondary.light', m: '1rem', height: '3.5rem'}}>
              <CloseIcon/>
            </Button>
            </Grid>

          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
            >
              <TableHeadFunc
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={reservationsData.length}
              />
              <TableBody>
                {stableSort(search.searchFun(reservationsData), getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((reservation, index) => {
                    return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={reservation.name}
                    >
                      <TableCell
                        component="th"
                        align='center'
                        id={`enhanced-table-checkbox-${index}`}
                        scope="row"
                        padding="none"
                      >
                        {reservation.name}
                      </TableCell>
                        <TableCell align='center'>
                          {displayDate.dateDay(reservation.date)} {displayDate.dateMonth(reservation.date)} {displayDate.dateYear(reservation.date)}
                        </TableCell>
                        <TableCell align='center'>
                          {displayDate.dateDay(reservation.expirationDate)} {displayDate.dateMonth(reservation.expirationDate)} {displayDate.dateYear(reservation.expirationDate)}
                        </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={reservationsData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          </Paper>
          {message && successful && (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    >
                    <SuccessMessage message={message}></SuccessMessage>
                </Grid>
            )}
            {message && !successful && (
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    >
                   <ErrorMessage message={message}></ErrorMessage>
                </Grid>
            )}
      </Box>    
    : <Alert severity="info" >You haven't made your reservations yet</Alert>}      
  </div>
  );
};

export default ReservationsList;