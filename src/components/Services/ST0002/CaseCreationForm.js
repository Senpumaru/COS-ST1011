import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Portal from '@material-ui/core/Portal';
import TextField from '@material-ui/core/TextField';
import React, { useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCase } from '../../../actions/Services/PDL1/CaseActions';
import Grid from '@material-ui/core/Grid';
import {
    DatePicker,
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Alert from '@material-ui/lab/Alert';
import { MenuItem } from '@material-ui/core';

const INSTITUTION_CHOICES = [
    {
        value: "УЗ «Брестский областной онкологический диспансер»",
        label: "УЗ «Брестский областной онкологический диспансер»",
    },
    {
        value: "УЗ «Гомельский областной клинический онкологический диспансер»",
        label: "УЗ «Гомельский областной клинический онкологический диспансер»",
    },
    {
        value: "УЗ «Витебский областной клинический онкологический диспансер»",
        label: "УЗ «Витебский областной клинический онкологический диспансер»",
    },
    {
        value: "УЗ «Могилёвский областной онкологический диспансер»",
        label: "УЗ «Могилёвский областной онкологический диспансер»",
    },
    {
        value: "УЗ «Гродненский областной онкологический диспансер»",
        label: "УЗ «Гродненский областной онкологический диспансер»",
    },
    {
        value: "УЗ «Минский городской клинический онкологический диспансер»",
        label: "УЗ «Минский городской клинический онкологический диспансер»",
    },
    {
        value: "УЗ «Барановичский онкологический диспансер»",
        label: "УЗ «Барановичский онкологический диспансер»",
    },
    {
        value: "УЗ «Бобруйский межрайонный онкологический диспансер»",
        label: "УЗ «Бобруйский межрайонный онкологический диспансер»",
    },
]

function FormCreation() {
    /*** Redux States ***/
    const dispatch = useDispatch()

    const caseCreate = useSelector(state => state.PDL1["caseCreate"])
    const { error, loading, success, instance } = caseCreate

    /*** Local States ***/
    const [dateRegistration, setDateRegistration] = useState(new Date())
    const [personalNumber, setPersonalNumber] = useState('')

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [institution, setInstitution] = useState("")

    const [blockNumberList, setBlockNumberList] = useState([{ blockNumber: "" }])
    const [blockAmount, setBlockAmount] = useState("")
    const [slideNumberList, setSlideNumberList] = useState([{ slideNumber: "" }])
    const [slideAmount, setSlideAmount] = useState("")
    const [diagnosis, setDiagnosis] = useState("")
    const [doctorSender, setDoctorSender] = useState("")

    /** Create Case System (CRUD) **/
    // Open form
    const [show, setShow] = React.useState(false);
    const container = React.useRef(null);

    const handleShowCaseForm = () => {
        setShow(!show);
    };
    // Add Block numbers
    const handleBlockListChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...blockNumberList];
        list[index][name] = value;
        setBlockNumberList(list);
    };
    const handleAddBlock = () => {
        setBlockNumberList([...blockNumberList, { blockNumber: "" }]);
    };
    const handleRemoveBlock = index => {
        const list = [...blockNumberList];
        list.splice(index, 1);
        setBlockNumberList(list);
    };

    // Add Slide numbers
    const handleSlideListChange = (event, index) => {
        const { name, value } = event.target;
        const list = [...slideNumberList];
        list[index][name] = value;
        setSlideNumberList(list);
    };
    const handleAddSlide = () => {
        setSlideNumberList([...slideNumberList, { slideNumber: "" }]);
    };
    const handleRemoveSlide = index => {
        const list = [...slideNumberList];
        list.splice(index, 1);
        setSlideNumberList(list);
    };


    const handleSubmit = (event) => {

        event.preventDefault()
        dispatch(createCase({
            "personal_number": personalNumber,
            "date_of_registration": dateRegistration.toISOString().split('T')[0],
            "institution": institution,
            "first_name": firstName,
            "last_name": lastName,
            "middle_name": middleName,
            
            "block_number": blockNumberList,
            "block_amount": blockAmount,
            "slide_number": slideNumberList,
            "slide_amount": slideAmount,
            "diagnosis": diagnosis,
            "doctor_sender": doctorSender,
        }))
    }


    return (
        <div>
            <Button color="primary" variant="outlined" type="button" onClick={handleShowCaseForm}>
                {show ? 'Close Form' : 'Create Case'}
            </Button>
            <div>

                {show ? (
                    <Portal container={container.current}>
                        <Card>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <CardContent>

                                    <Grid container spacing={2} direction="column">
                                        <Grid item xs={12} container>
                                            <Grid item xs={2}>
                                                In Development
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <hr></hr>
                                    <Grid item xs={12} container spacing={2}>
                                        <Grid item xs={8} container spacing={2}>
                                            <Grid item md={4} xs={12}>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <DatePicker
                                                        autoOk
                                                        variant="inline"
                                                        fullWidth
                                                        inputVariant="outlined"
                                                        label="Registration Date"
                                                        value={dateRegistration}
                                                        onChange={setDateRegistration}
                                                        format="yyyy-MM-dd"
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    // helperText=""
                                                    label="Personal Number"
                                                    name="personalNumber"
                                                    value={personalNumber}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setPersonalNumber(event.target.value)}
                                                />

                                            </Grid>
                                            <Grid item md={4} s={4} xs={6}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    select
                                                    label="Institution choices"
                                                    id="institutionChoices-id"
                                                    value={institution}

                                                    label="Institution"
                                                    variant="outlined"

                                                    onChange={(event) => setInstitution(event.target.value)}
                                                >
                                                    {INSTITUTION_CHOICES.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    // helperText=""
                                                    label="First name"
                                                    name="firstName"
                                                    value={firstName}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setFirstName(event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    helperText=""
                                                    label="Last name"
                                                    name="lastName"
                                                    value={lastName}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setLastName(event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    helperText=""
                                                    label="Middle name"
                                                    name="middleName"
                                                    value={middleName}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setMiddleName(event.target.value)}
                                                />
                                            </Grid>
                                            <Grid item md={6} xs={12}>
                                                <TextField

                                                    fullWidth
                                                    helperText="Please specify the  diagnosis"
                                                    label=" Diagnosis"
                                                    name="diagnosis"
                                                    value={diagnosis}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setDiagnosis(event.target.value)}
                                                />

                                            </Grid>
                                            <Grid item md={6} s={12} xs={12}>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    helperText=""
                                                    label="Doctor (Sender)"
                                                    name="doctorSender"
                                                    value={doctorSender}
                                                    color="primary"
                                                    variant="outlined"
                                                    onChange={(event) => setDoctorSender(event.target.value)}
                                                />

                                            </Grid>
                                        </Grid>
                                        <Grid justify="flex-start" item xs={4} container spacing={2}>
                                            <Grid justify="flex-start" item xs={12} container spacing={2}>
                                                <Grid item md={6} xs={6}>
                                                    Block numbers
                                                    </Grid>
                                                <Grid item md={6} xs={6}>
                                                    Slide numbers
                                                    </Grid>
                                                <Grid justify="flex-start" item md={6} xs={6}>
                                                    {blockNumberList.map((x, index) => {
                                                        return (
                                                            <React.Fragment>
                                                                <TextField
                                                                    required
                                                                    className="ml10"
                                                                    name="blockNumber"
                                                                    value={x.blockNumber}
                                                                    onChange={event => handleBlockListChange(event, index)}

                                                                />
                                                                <div className="btn-box">
                                                                    {blockNumberList.length !== 1 && <Button className="mr10" onClick={() => handleRemoveBlock(index)}>Remove</Button>}
                                                                    {blockNumberList.length - 1 === index && <Button onClick={() => handleAddBlock(index)}>Add</Button>}
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Grid>

                                                <Grid justify="flex-start" item md={6} xs={6}>
                                                    {slideNumberList.map((x, index) => {
                                                        return (
                                                            <React.Fragment>
                                                                <TextField
                                                                    required
                                                                    className="ml10"
                                                                    name="slideNumber"
                                                                    value={x.slideNumber}
                                                                    onChange={event => handleSlideListChange(event, index)}
                                                                />
                                                                <div className="btn-box">
                                                                    {slideNumberList.length !== 1 && <Button className="mr10" onClick={() => handleRemoveSlide(index)}>Remove</Button>}
                                                                    {slideNumberList.length - 1 === index && <Button onClick={() => handleAddSlide(index)}>Add</Button>}
                                                                </div>
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        helperText=""
                                                        label="Block #"
                                                        name="blockAmount"
                                                        value={blockAmount}
                                                        color="primary"
                                                        variant="outlined"
                                                        onChange={(event) => setBlockAmount(event.target.value)}
                                                    />
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <TextField
                                                        required
                                                        fullWidth
                                                        helperText=""
                                                        label="Slide #"
                                                        name="slideAmount"
                                                        value={slideAmount}
                                                        color="primary"
                                                        variant="outlined"
                                                        onChange={(event) => setSlideAmount(event.target.value)}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                    </Grid>
                                    <hr></hr>

                                    {error && <Alert severity="error">{error}</Alert>}
                                    {loading && <Alert severity="info">Processing...</Alert>}
                                    {success && <Alert severity="success">Registration succesfull!</Alert>}
                                </CardContent>
                                <CardActions>
                                    <Button type='submit' variant="outlined" color='primary'>
                                        Submit
                                </Button>

                                </CardActions>
                            </form>
                        </Card>

                    </Portal>
                ) : null}
            </div>
            <div ref={container} />
        </div>
    )
}

export default FormCreation;
