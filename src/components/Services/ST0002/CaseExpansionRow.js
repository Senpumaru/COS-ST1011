import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { caseDetailsAction } from '../../../actions/Services/PDL1/CaseActions';
import { CASE_DETAILS_RESET } from '../../../constants/Services/PDL1/CaseConstants';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import Alert from '@material-ui/lab/Alert';
import { Grid } from '@material-ui/core';

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

        minWidth: 100,
    },
});






function RowExpansion(props) {
    /*** Material UI Styles ***/
    const classes = useRowStyles();

    /*** Redux States ***/

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.User["userLogin"])
    const { userInfo } = userLogin

    const caseDetails = useSelector(state => state.PDL1["caseDetails"])
    const { loadingDetails, errorDetails, instance } = caseDetails

    /*** Row components ***/
    /* Row Expansion */
    const { row } = props;
    // Local State
    const [openRow, setOpenRow] = useState(false);

    const caseExpand = (event) => {
        setOpenRow(!openRow)
        if (openRow === false) {

            if (row.uuid != instance.uuid) {
                dispatch(caseDetailsAction(row.uuid))
            }
        }
    }

    const handleCasePDF = (event) => {
        window.open(`http://127.0.0.1:8000/api/servicePDL1/cases/${row.uuid}/pdf/`,

        )
    }


    return (
        <React.Fragment>
            <TableRow className={classes.tableRow} id={row.uuid}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={caseExpand}>
                        {openRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>

                <TableCell align="right">{row.date_of_registration}</TableCell>
                <TableCell align="right">{row.personal_number}</TableCell>
                <TableCell align="right">{row.date_of_response}</TableCell>
                <TableCell align="right">{row.clin_interpretation}</TableCell>
                <TableCell align="right">
                    {userInfo && userInfo.credentials_status === "Pathologist" && (
                        <IconButton component={Link} to={`/Service/PDL1/${row.uuid}`}><EditIcon /></IconButton>)
                    }
                    {row && row.clin_interpretation != "Не указано" && (
                    <IconButton onClick={handleCasePDF}><PictureAsPdfIcon /></IconButton>)
                    }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRow} timeout="auto" unmountOnExit>

                        {loadingDetails ? <Alert severity="info">Loading additional data...</Alert>
                            : errorDetails ? <Alert severity="error">{errorDetails}</Alert>
                                : instance.block_number &&
                                <Box margin={1}>
                                    <Typography variant="h6" gutterBottom component="div">
                                        Personal number: {instance.personal_number}
                                    </Typography>
                                    <Grid item container spacing={2}>
                                        <Grid item md={8} xs={12}>
                                            Block numbers: {instance.block_number.toString()}
                                        </Grid>
                                        <Grid item md={4} xs={6}>
                                            Block amount: {instance.block_amount}
                                        </Grid>
                                        <Grid item md={8} xs={12}>
                                            Slide numbers: {instance.slide_number.toString()}
                                        </Grid>
                                        <Grid item md={4} xs={6}>
                                            Slide amount: {instance.slide_amount}
                                        </Grid>

                                        
                                        <br />
                                        Conclusion: {instance.clin_interpretation}
                                        <br />
                                        Other additional data...
                                        
                                    </Grid>
                                </Box>}
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

export default RowExpansion;