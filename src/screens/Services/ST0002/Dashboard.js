import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Alert from '@material-ui/lab/Alert';
import Pagination from '@material-ui/lab/Pagination';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listCases } from '../../../actions/Services/PDL1/CaseActions';
import {
    setSearchPage,
    setSearchPageSize,
    setSearchSort
} from '../../../actions/Services/PDL1/SearchActions';
import CaseForm from '../../../components/Services/ST0002/CaseCreationForm';
import RowExpansion from '../../../components/Services/ST0002/CaseExpansionRow';
import Filters from '../../../components/Services/ST0002/Filters';
import { ST0002_UPDATE_RESET } from '../../../constants/Services/PDL1/CaseConstants';

/*** Material UI Styles ***/
const useRowStyles = makeStyles({
    tableRow: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    table: {
        minWidth: 650,
    },
    formControl: {
        padding: 4,
        minWidth: 100,
    },
});

function CreateForm() {

    const userLogin = useSelector(state => state.User["userLogin"])
    const { userInfo } = userLogin

    if (userInfo) {
        if (
            userInfo.credentials_status === "Registrator" ||
            userInfo.credentials_status === "Pathologist"
        ) {
            return (
                <CaseForm />
            );
        } else {
            return (
                <Alert variant="outlined" severity="info">
                    Case creation <strong>prohibited</strong> with current priviliges
                </Alert>
            )
        }
    } else {
        return (
            <p>Case creation prohibited with these priviliges</p>
        )
    }
}


function CaseTable() {

    /*** Material UI Styles ***/
    const classes = useRowStyles();


    /*** Redux States ***/
    const dispatch = useDispatch()

    const caseList = useSelector(state => state.PDL1["caseList"])
    const { error, loading, cases } = caseList

    return (
        <TableContainer component={Paper}>
            {loading ? <Alert severity="info">Loading cases...</Alert>
                : error ? <Alert severity="error">{error}</Alert>
                    :
                    <Table className={classes.table} size="small" aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />

                                <TableCell align="right">Date registered</TableCell>
                                <TableCell align="right">Personal Number</TableCell>
                                <TableCell align="right">Date report</TableCell>
                                <TableCell style={{
                                    width: 200,
                                    wordWrap: 'break-word'
                                }} align="right" >Interpretation</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>

                            {cases.results && cases.results.map((row) => (
                                <RowExpansion key={row.uuid} row={row} />
                            ))}
                        </TableBody>
                    </Table>}

        </TableContainer>
    )
}

function Dashboard() {
    /*** Material UI Styles ***/
    const classes = useRowStyles();

    /*** Local States ***/

    /*** Redux States ***/
    const dispatch = useDispatch()

    const caseList = useSelector(state => state.PDL1["caseList"])
    const { error, loading, cases } = caseList

    const caseCreate = useSelector(state => state.PDL1["caseCreate"])
    const { success } = caseCreate

    const searchParameters = useSelector(state => state.PDL1["searchParameters"])
    const { page, pageSize, sortColumn, filters } = searchParameters

    /** Search System **/
    /* Pagination */
    const handleChangePage = (event, newPage) => {
        dispatch(setSearchPage(newPage));
    };
    /* Rows per Page */
    const handleChangeRowsPerPage = (event) => {
        dispatch(setSearchPageSize(parseInt(event.target.value, 10)));
    };
    /* Sorting & Ordering */
    const handleChangeSort = (event) => {
        dispatch(setSearchSort(event.target.value));
    };

    /*** React Effects ***/
    useEffect(() => {
        dispatch({ type: ST0002_UPDATE_RESET })
        dispatch(listCases(
            page,
            pageSize,
            sortColumn,
            filters.dateRegister.toISOString().split('T')[0],
            filters.personalNumber,
            filters.region))
    }, [page, pageSize, sortColumn, filters, success])

    return (
        <React.Fragment>
            <h2>Service PDL1</ h2>
            <CreateForm />

            <Grid alignItems="center" container spacing={2}>
                <Grid item xs={6}>
                    <h4>Cases in work</h4>
                </Grid>
                <Grid item xs={6}>
                    <h4>Statistics</h4>
                </Grid>
            </Grid>

            <Filters />

            <Grid justify="space-between" alignItems="center" container spacing={2}>
                <Grid item xs={2}>
                    <FormControl className={classes.formControl} >
                        <InputLabel id="demo-simple-select-label">Page size</InputLabel>
                        <Select
                            align="left"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pageSize}
                            onChange={handleChangeRowsPerPage}
                        >
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={2}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                        <Select
                            labelId="Case-Sorter"
                            id="Case-Sorter"
                            value={sortColumn}
                            onChange={handleChangeSort}
                            label="Sort By"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"date_of_registration"}>Date registered<ArrowUpwardIcon /></MenuItem>
                            <MenuItem value={"-date_of_registration"}>Date registered<ArrowDownwardIcon /></MenuItem>
                            <MenuItem value={"personal_number"}>Personal Number<ArrowUpwardIcon /></MenuItem>
                            <MenuItem value={"-personal_number"}>Personal Number<ArrowDownwardIcon /></MenuItem>
                            <MenuItem value={"region"}>Region<ArrowUpwardIcon /></MenuItem>
                            <MenuItem value={"-region"}>Region<ArrowDownwardIcon /></MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Pagination align="right" count={cases && parseInt(cases.count / pageSize)} page={page} onChange={handleChangePage} color="primary" variant="outlined" shape="rounded" />
                </Grid>

            </Grid>
            <CaseTable />

        </React.Fragment>
    );
}

export default Dashboard;