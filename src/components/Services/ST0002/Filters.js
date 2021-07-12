import DateFnsUtils from '@date-io/date-fns';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    DatePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setSearchFilterDateRegister,
    setSearchFilterPersonalNumber,
    setSearchFilterRegion
} from '../../../actions/Services/PDL1/SearchActions';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));


function FilterChoices() {
    /*** Material UI Styles ***/
    const classes = useStyles();

    /*** Redux States ***/
    const dispatch = useDispatch()

    /* Get state using "Selector" from "State" */
    const searchParameters = useSelector(state => state.PDL1["searchParameters"])

    const { page, pageSize, sortColumn, filters } = searchParameters

    /* Filtering */
    const handleFilterPersonalNumber = (event) => {
        
        dispatch(setSearchFilterPersonalNumber(event.target.value));

    }

    const handleFilterRegion = (event) => {
        
        dispatch(setSearchFilterRegion(event.target.value));


    }

    // Date Picker
    const handleFilterdateRegister = (event) => {
        
        dispatch(setSearchFilterDateRegister(event));
    }

    /* Local State */
    const [expanded, setExpanded] = useState(false);

    const handleFilterExpansion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <React.Fragment>
            Advanced Filters
            <hr></hr>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                    autoOk
                    variant="inline"

                    inputVariant="outlined"
                    label="Registration Date (LTE)"

                    value={filters.dateRegister}
                    onChange={handleFilterdateRegister}
                    format="yyyy-MM-dd"
                />
            </MuiPickersUtilsProvider>
            <TextField
                type="number"
                id="outlined-required"
                label="Personal Number"
                defaultValue={filters.personalNumber}
                variant="outlined"
                onChange={handleFilterPersonalNumber}
            />
            <TextField

                id="outlined-required"
                label="Region"
                defaultValue={filters.region}
                variant="outlined"
                onChange={handleFilterRegion}
            />
            <hr></hr>
        </React.Fragment>)
}

export default FilterChoices;