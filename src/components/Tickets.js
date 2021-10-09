import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListSubheader, ListItemText, ListItemIcon } from '@mui/material/'

import penguin from '../assets/images/penguin.png';

function createData(id, type, price, days) {
  return { id, type, price, days};
}

const rows = [
  createData(1, 'Regular ticket', '40 PLN', 'Monday - Friday'),
  createData(2, 'Regular ticket', '50 PLN', 'Saturday - Sunday'),
  createData(3, 'Reduced ticket *', '20 PLN', 'Monday - Friday'),
  createData(4, 'Reduced ticket *', '25 PLN', 'Saturday - Sunday'),
  createData(5, 'Student ticket **', '15 PLN', 'Monday - Sunday'),
  createData(6, 'Children(0-3 y) Senior (75+ y) Ticket', '0 PLN', 'Monday - Sunday'),
  createData(7, 'Family Ticket ***', '100 PLN', 'Monday - Friday'),
  createData(8, 'Family Ticket ***', '120 PLN', 'Saturday - Sunday'),
  createData(9, 'Annual regular ticket *', '140 PLN', 'Monday - Sunday'),
  createData(10, 'Annual reduced ticket*, annulal student ticket **', '70 PLN', 'Monday - Sunday'),
];

const Tickets = () => {
  return (
    <div>
      <h1 className="greyTitle">Tickets</h1>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight: "bold", borderBottom:"none"}} align="center">Type of ticket</TableCell>
              <TableCell sx={{fontWeight: "bold", borderBottom:"none"}} align="center">Price</TableCell>
              <TableCell sx={{fontWeight: "bold", borderBottom:"none"}} align="center">Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="center">{row.type}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.days}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
          </TableContainer>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    You can buy tickets:
                </ListSubheader>
            }
            >
            <ListItem>
                <ListItemIcon>
                <img style={{ width: '24px' }} src={penguin} alt="penguin_icon" />
                </ListItemIcon>
                <ListItemText primary="at the ticket office (open since the opening of the ZOO, closed 1 hour before closing)" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                <img style={{ width: '24px' }} src={penguin} alt="penguin_icon" />
                </ListItemIcon>
                <ListItemText primary="at the ticket vending machines, at the front gate" />
              </ListItem>
          </List>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Reduced tickets *
                </ListSubheader>
            }
            >
            <ListItem>
                <ListItemIcon>
                <img style={{ width: '24px' }} src={penguin} alt="penguin_icon" />
                </ListItemIcon>
                <ListItemText primary="children from 3 to 7 years old, upon presentation of a document confirming the child’s age" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                <img style={{ width: '24px' }} src={penguin} alt="penguin_icon" />
                </ListItemIcon>
                <ListItemText primary="school youth upon presentation of a school ID" />
            </ListItem>
            <ListItem>
                <ListItemIcon>
                <img style={{ width: '24px' }} src={penguin} alt="penguin_icon" />
                </ListItemIcon>
                <ListItemText primary="etirees, pensioners and veterans, upon presentation of an ID card" />
            </ListItem>
          </List>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Student tickets **
                </ListSubheader>
            }
            >
            <ListItem>
                <ListItemIcon>
                <img style={{ width: '24px' }} src={penguin} alt="penguin_icon" />
                </ListItemIcon>
                <ListItemText primary="students up to 26 years of age upon presentation of a student ID" />
            </ListItem>
          </List>
          <List
            sx={{ width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Family tickets ***
                </ListSubheader>
            }
            >
            <ListItem>
                <ListItemIcon>
                <img style={{ width: '24px' }} src={penguin} alt="penguin_icon" />
                </ListItemIcon>
                <ListItemText primary="for a group of up to 5 people with at least two children and no more than two guardians or parents." />
            </ListItem>
          </List>

    </div>
  );
};

export default Tickets;