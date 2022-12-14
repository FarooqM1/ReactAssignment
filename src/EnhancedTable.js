import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useState, useEffect } from "react"
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import Moment from 'react-moment';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import { margin } from '@mui/system';



function createData(created_At, totalinstall, ios_install, android_install, totaluninstall, ios_uninstall, adnroid_uninstall, totalchurn, ios_churn, android_churn
) {
  return {
    created_At, totalinstall, ios_install, android_install, totaluninstall, ios_uninstall, adnroid_uninstall, totalchurn, ios_churn, android_churn
  };
}

var rows = [];

var initialData = [];

function descendingComparator(a, b, orderBy) {


  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'Date',
    numeric: false,
    disablePadding: true,
    label: 'Date',
  },
  {
    id: 'Day Install',
    numeric: true,
    disablePadding: false,
    label: 'Day Install',
  },
  {
    id: 'platform',
    numeric: true,
    disablePadding: false,
    label: 'platform',
  },
  {
    id: 'Day Uninstall',
    numeric: true,
    disablePadding: false,
    label: 'Day Uninstall',
  },
  {
    id: 'Platform',
    numeric: true,
    disablePadding: false,
    label: 'Platform',
  },
  {
    id: 'Churn Rate',
    numeric: true,
    disablePadding: false,
    label: 'Churn Rate',
  },
  {
    id: 'Churn Platform',
    numeric: true,
    disablePadding: false,
    label: 'Churn Platform',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{ backgroundColor: "#271C1C" }}>
      <TableRow>

        {headCells.map((headCell) => (
          <TableCell
            style={{ padding: '10px', color: "white" }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >

        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

var [loaded, setLoaded] = new Array;

var [rowsSorted , setRowsSorted] = new Array;

export default function EnhancedTable() {

   [loaded, setLoaded] = useState(false);
   [rowsSorted , setRowsSorted] = useState(0);

   

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-06-01&todate=2022-07-01")
      .then(function (response) {
        return response.json()
      })
      .then(function (product) {
        console.log(product.data)
        console.log(rows)
        console.log("Length::" + product.data.length)
        var abss= [];
        product.data.data.map(item => abss.push(createData(item.created_At, item.totalinstall, item.ios_install, item.android_install, item.totaluninstall, item.ios_uninstall, item.android_uninstall, item.totalchurn, item.ios_churn, item.android_churn)))
        console.log(rows)
        rows = abss
        initialData = abss;
        setLoaded(true)
      })

  }


  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


    const[showDate , setShowDate] = useState(false);

    function showDatePicker(){
     if(showDate){
        setShowDate(false)
        rows = initialData
        setRowsSorted(rowsSorted+1)
      }else{
        setShowDate(true)
      }
    }

  return (
    
   <div >
     
    { showDate ? <div > <DateRangeView /> <button onClick={showDatePicker} style={{float:"right",border:'1px solid white',width:"150px",padding:"5px 20px",marginBottom:"10px",backgroundColor:'#283046',color:"white" ,cursor:"pointer"}}> Hide Date Picker </button> </div> :
     <Grid onClick = {showDatePicker} style={{border:'1px solid white',width:"150px",padding:"5px 20px",marginBottom:"20px",backgroundColor:'#283046',color:"white" ,cursor:"pointer"}}> Select Duration</Grid>
     }
     {loaded ?
     
      <Box sx={{ width: '100%' }}> 
        <Paper sx={{ width: '100%', mb: 2 }}>

          <TableContainer>
            <Table

              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead />
              <TableBody style={{ backgroundColor: "#283046" }}>

                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.name);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.name)}
                        tabIndex={+1}
                        key={row.name}
                        selected={isItemSelected}
                      >
                        <TableCell style={{ padding: '10px', color: "white" }}
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          <Moment format="YYYY-MMM-DD">
                            {row.created_At}
                          </Moment>
                        </TableCell>

                        <TableCell style={{ color: "white" }} align="right">{row.totalinstall} </TableCell>
                        <TableCell style={{ color: "white" }} align="right"><AndroidIcon style={{ fontSize: "18px" }} /> {row.ios_install}  <br />  <AppleIcon style={{ fontSize: "18px" }} />  {row.android_install}</TableCell>
                        <TableCell style={{ color: "white" }} align="right">{row.totaluninstall}</TableCell>
                        <TableCell style={{ color: "white" }} align="right"> <AndroidIcon style={{ fontSize: "18px" }} />{row.adnroid_uninstall} <br /> <AppleIcon style={{ fontSize: "18px" }} />{row.ios_uninstall} </TableCell>
                        <TableCell style={{ color: "white" }} align="right">{row.totalchurn}</TableCell>
                        <TableCell style={{ color: "white" }} align="right"> <AndroidIcon style={{ fontSize: "18px" }} />{row.android_churn} <br /> <AppleIcon style={{ fontSize: "18px" }} />{row.ios_churn} </TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

      </Box> : <div> </div> }
   </div> 
  );
}


var  [value, setValue] = new Array();

export function DateRangeView() {
    [value, setValue] = React.useState([null, null]);
 
   return (
     <LocalizationProvider
       dateAdapter={AdapterDateFns}
       localeText={{ start: 'From', end: 'To' }}
     >
       <DateRangePicker
         value={value}
         onChange={(newValue) => {
           setValue(newValue);
           sortRows(newValue)
         }}
         renderInput={(startProps, endProps) => (
           <React.Fragment>
             <TextField {...startProps} />
             <Box sx={{ mx: 2 }}> to </Box>
             <TextField {...endProps} />
           </React.Fragment>
         )}
       />
     </LocalizationProvider>
   );
 }

 function sortRows(newValue){
  rows = initialData
  console.log("inside sortRows " +newValue[0]+ " sdfas " + newValue[1])
 
  if(newValue[0] != null && newValue[1] != null){
    console.log(newValue[0].toLocaleDateString());
    
    var abc = rows.filter( row => {
      console.log(new Date(row.created_At))
      return new Date(row.created_At) > new Date(newValue[0])  &&  new Date(row.created_At) < new Date(newValue[1]);
    })

    console.log("filtered rows :  " +rows.length)
    rows = abc;
    setRowsSorted(rowsSorted+1)
    
    console.log("filtered rowsasdas :  " +rows.length)

  }
 }
 