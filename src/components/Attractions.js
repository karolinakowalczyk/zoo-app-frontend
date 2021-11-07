import React, { useState, useEffect } from "react";
import AttractionsService from "../services/attractions.service";
import createUUID from "../helpers/createUUID";
import { Button, Alert, TableCell, TableRow, Table, TableBody, TableHead, TableSortLabel, Box, TablePagination, Paper, TableContainer, TextField, InputAdornment } from '@mui/material/';
import AuthService from "../services/auth.service";
import convertMinsToTime from "../helpers/convertMinsToTime";
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import getComparator from "../helpers/getComparator";
import stableSort from "../helpers/stableSort";
import useInfoStyles from "../styles/useInfoStyles";


const headCells = [
  {
    id: 'name',
    label: 'Attraction name',
    sorted: true,
  },
  {
    id: 'hour',
    label: 'Start time',
    sorted: true,
  },
  {
    id: 'duration',
    label: 'Duration (min)',
    sorted: true,
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
            style={{borderBottom:"none"}}
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

const Attractions = (props) => {
  const [attractionsData, setAttractionsData] = useState([]);
  const [successful, setSuccessful] = useState(true);
  const [message, setMessage] = useState("");
  const currentUser = AuthService.getCurrentUser();
  const [addedAttractions, setAddedAttractions] = useState([]);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState({ searchFun: items => { return items; } })

  useEffect(() => {
    AttractionsService.getAttractions().then(
      (response) => {
        setAttractionsData(response.data);
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
  }, []);

  useEffect(() => {
    if (currentUser) {
      props.changeAttractions(addedAttractions);
    }
  }, [addedAttractions, props, currentUser]);

  const addAttraction = (attraction) => {
    const conflictAttractionsList = addedAttractions.filter((attr) => ( ((attraction.hour >= attr.hour) && (attraction.hour <= attr.hour + attr.duration))) || (((attraction.hour + attraction.duration) >= attr.hour) && ((attraction.hour + attraction.duration) <= (attr.hour + attr.duration))) );
    if (conflictAttractionsList.length > 0) {
      setMessage("These event conflict with each other.");
      return
    }
    const actualAttractions = attractionsData.filter((attr) => attr !== attraction);
    setAttractionsData(actualAttractions);
    setAddedAttractions(addedAttractions.concat([attraction]))
    setMessage("");
  }

  const removeAttraction = (attraction) => {
    const actualAddedAttractions = addedAttractions.filter((attr) => attr !== attraction);
    setAddedAttractions(actualAddedAttractions);
    setAttractionsData(attractionsData.concat([attraction]));
    setMessage("");
  };
  
  const displayAddedAttractions = addedAttractions.map((attraction, index) =>
    <TableRow key={index}>
      <TableCell key={attraction.name}>{attraction.name}</TableCell>
      <TableCell key={createUUID(attraction.hour)}>{convertMinsToTime(attraction.hour)}</TableCell>
    <TableCell><Button onClick={() => removeAttraction(attraction)}>Remove</Button></TableCell>
    </TableRow>
  
    
  );

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - attractionsData.length) : 0;

  const handeSearchAttractions = (e) => {
    const currentValue = e.target.value;
    setSearch({
      searchFun: items => {
        if (currentValue === "") {
          return items;
        }
        else {
          return items.filter(x => x.name.toLowerCase().includes(currentValue));
        }
      }
    })
  }
  const classes = useInfoStyles();
  return (
    <div>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <h1 className={classes.greyTitle}>Attractions</h1>
          <div style={{ textAlign: 'center', marginBottom: '1rem'}}>
            <TextField
              id="search-attractions"
              label="Search Attractions by name"
              variant="outlined"
              onChange={handeSearchAttractions}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
         </div>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
          >
            <TableHeadFunc
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={attractionsData.length}
            />
            <TableBody>
              {stableSort(search.searchFun(attractionsData), getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                 .map((attraction, index) => {
                  return (
    
                   <TableRow
                     hover
                     tabIndex={-1}
                     key={attraction.name}
                   >
                     <TableCell
                      component="th"
                      align='center'
                      id={`enhanced-table-checkbox-${index}`}
                      scope="row"
                      padding="none"
                     >
                       {attraction.name}
                     </TableCell>
                      <TableCell align='center'>{convertMinsToTime(attraction.hour)}</TableCell>
                     <TableCell align='center'>{attraction.duration}</TableCell>
                     {currentUser &&
                       <TableCell align='center'><Button onClick={() => addAttraction(attraction)}>Add to plan</Button></TableCell>}
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
          count={attractionsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
      {!successful && (
        <div>
            <Alert severity="error" >{message}</Alert>
        </div>
       )}
      
      {message && (
            <div>
              <Alert severity="error">{message}</Alert>
            </div>
          )}
      {currentUser &&
        <div>
          <h1 className={classes.greyTitle}>Added Attractions</h1>
        {addedAttractions.length > 0 ? <Table>
          <TableBody>
            {displayAddedAttractions}
          </TableBody>
        </Table>
      :<div style={{textAlign: "center"}}><p>You haven't added any attractions yet.</p></div>}
        </div>
      }
    </div>
  );
};

export default Attractions;