import DateFnsUtils from '@date-io/date-fns';
import { CardHeader, Divider, FormControl, Grid, InputLabel, makeStyles, MenuItem, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Alert from '@material-ui/lab/Alert';
import {
    DatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { caseDeleteAction, caseDetailsAction, caseUpdateAction } from '../../../../actions/Services/PDL1/CaseActions';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(0),
        minWidth: 200,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function CasePDL1({
    history,
    match // Page parameters
}) {
    const classes = useStyles();
    const caseUUID = match.params.id

    /*** Local States ***/
    // Registration Data
    const [dateRegistration, setDateRegistration] = useState(new Date())
    const [personalNumber, setPersonalNumber] = useState('')
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [dateBirth, setDateBirth] = useState(null)
    
    const [institution, setInstitution] = useState("")
    const [blockNumber, setBlockNumber] = useState("")
    const [blockAmount, setBlockAmount] = useState("")
    const [slideNumber, setSlideNumber] = useState("")
    const [slideAmount, setSlideAmount] = useState("")
    const [diagnosis, setDiagnosis] = useState("")
    const [doctorSender, setDoctorSender] = useState("")
    // Report Data
    const [dateResponse, setDateResponse] = useState(new Date())
    const [doctorReporter, setDoctorReporter] = useState("")
    const [cancerCellPerc, setCancerCellPerc] = useState("")
    const [immuneCellPerc, setImmuneCellPerc] = useState("")
    const [clinInter, setClinInter] = useState("")

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
    const DOCTOR_REPORT_CHOICE = [
        {
            value:"Не указан",
            label:"Не указан",
        },
        {
            value:"Давыдов Д.А.",
            label:"Давыдов Д.А.",
        },
        {
            value:"Киселев П.Г.",
            label:"Киселев П.Г.",
        },
    ]
    const INTERPRETATION_CHOICES = [
        {
            value: 'Нет заключения',
            label: 'Нет заключения',
        },
        {
            value: 'PD-L1 positive',
            label: 'PD-L1 позитивный',
        },
        {
            value: 'PD-L1 negative',
            label: 'PD-L1 негативный',
        },

    ];
    /*** Redux States ***/

    const dispatch = useDispatch()

    const caseDetails = useSelector(state => state.PDL1["caseDetails"])
    const { loadingDetails, errorDetails, instance } = caseDetails


    const caseUpdate = useSelector(state => state.PDL1["caseUpdate"])
    const { loadingUpdate, errorUpdate, successUpdate } = caseUpdate

    useEffect(() => {
        if (!instance || instance.uuid !== caseUUID) {
            dispatch(caseDetailsAction(match.params.id))

        } else {
            // Registration Data
            setDateRegistration(instance.date_of_registration)
            setPersonalNumber(instance.personal_number)
            setFirstName(instance.first_name)
            setLastName(instance.last_name)
            setMiddleName(instance.middle_name)
            setDateBirth(instance.date_of_birth)
            setInstitution(instance.institution)
            setBlockNumber(instance.block_number.toString())
            setBlockAmount(instance.block_amount)
            setSlideNumber(instance.slide_number.toString())
            setSlideAmount(instance.slide_amount)
            setDiagnosis(instance.diagnosis)
            setDoctorSender(instance.doctor_sender)
            // Report Data
            setDateResponse(instance.date_of_response)
            setDoctorReporter(instance.doctor_reporter)
            setCancerCellPerc(instance.cancer_cell_percentage)
            setImmuneCellPerc(instance.immune_cell_percentage)
            setClinInter(instance.clin_interpretation)

        }
    }, [history, instance, dispatch])

    /** PUT to Backend **/
    const handleUpdateCase = (event) => {
        event.preventDefault()
        if (typeof dateRegistration == "string" || dateRegistration == null) {
            var dateRegistrationF = dateRegistration
        } else {
            var dateRegistrationF = dateRegistration.toISOString().split('T')[0]
        }
        if (typeof dateBirth == "string" || dateBirth == null) {
            var dateBirthF = dateBirth
        } else {
            var dateBirthF = dateBirth.toISOString().split('T')[0]
        }
        if (typeof dateResponse == "string" || dateRegistration == null) {
            var dateResponseF = dateResponse
        } else {
            var dateResponseF = dateResponse.toISOString().split('T')[0]
        }

        dispatch(caseUpdateAction({
            // Registration Data
            "uuid": instance.uuid,
            'date_of_registration': dateRegistrationF,
            'personal_number': personalNumber,
            "last_name": lastName,
            "first_name": firstName,
            "middle_name": middleName,
            "date_of_birth": dateBirthF,
            'institution': institution,
            'block_number': blockNumber.split(","),
            'block_amount': blockAmount,
            'slide_number': slideNumber.split(","),
            'slide_amount': slideAmount,
            'diagnosis': diagnosis,
            'doctor_sender': doctorSender,
            // Report Data
            'date_of_response': dateResponseF,
            "doctor_reporter": doctorReporter,
            "cancer_cell_percentage": cancerCellPerc,
            "immune_cell_percentage": immuneCellPerc,
            'clin_interpretation': clinInter,

        }))
    }
    /** DELETE to Backend **/
    const handleDeleteCase = (event) => {
        if (window.confirm("Are you sure you want to delete this case?")) {
            dispatch(caseDeleteAction(instance.uuid))
            history.push("/ServicePDL1")
        }
    }


    const handleCasePDF = (event) => {
        window.open(`http://127.0.0.1:8000/api/servicePDL1/cases/${instance.uuid}/pdf/`,)
    }

    return (

        <form onSubmit={handleUpdateCase} autoComplete="off">

            {loadingUpdate ? <Alert severity="info">Processing...</Alert> :

                loadingDetails ? <Alert severity="info">Loading case...</Alert> :
                    <Card>
                        <CardHeader subheader="The information can be edited" title="Case" />
                        <Divider />
                        <CardContent>

                            <Grid container spacing={2}>
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
                                        helperText="Please specify the personal number"
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
                                <Grid item md={4} xs={12}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            autoOk
                                            variant="inline"
                                            fullWidth
                                            inputVariant="outlined"
                                            label="Date of birth"
                                            value={dateBirth}
                                            onChange={setDateBirth}
                                            format="yyyy-MM-dd"
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item md={4} s={6} xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        helperText=""
                                        label="Block №"
                                        name="blockNumber"
                                        value={blockNumber}
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => setBlockNumber(event.target.value)}
                                    />

                                </Grid>
                                <Grid item md={2} xs={2}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        helperText=""
                                        label="Block #"
                                        name="blockAmount"
                                        value={blockAmount}
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => setBlockAmount(event.target.value)}
                                    />

                                </Grid>
                                <Grid item md={4} s={6} xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        helperText=""
                                        label="Slide №"
                                        name="slideNumber"
                                        value={slideNumber}
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => setSlideNumber(event.target.value)}
                                    />

                                </Grid>
                                <Grid item md={2} xs={2}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        helperText=""
                                        label="Slide #"
                                        name="slideAmount"
                                        value={slideAmount}
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => setSlideAmount(event.target.value)}
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

                                
                                <Grid item md={4} s={4} xs={6}>

                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DatePicker
                                            autoOk
                                            variant="inline"
                                            fullWidth
                                            inputVariant="outlined"
                                            label="Response Date"
                                            value={dateResponse}
                                            onChange={setDateResponse}
                                            format="yyyy-MM-dd"
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item md={6} s={6} xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        select
                                        label="Doctor reporter"
                                        id=""
                                        value={doctorReporter}

                                        label="Reporting doctor"
                                        variant="outlined"

                                        onChange={(event) => setDoctorReporter(event.target.value)}
                                    >
                                        {DOCTOR_REPORT_CHOICE.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                
                                            
                                <Grid item md={3} xs={3}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        helperText=""
                                        label="Cancer cell %"
                                        name="cancerCellPerc"
                                        value={cancerCellPerc}
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => setCancerCellPerc(event.target.value)}
                                    />

                                </Grid>
                                <Grid item md={3} xs={3}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="number"
                                        helperText=""
                                        label="Immune cell %"
                                        name="immuneCellPerc"
                                        value={immuneCellPerc}
                                        color="primary"
                                        variant="outlined"
                                        onChange={(event) => setImmuneCellPerc(event.target.value)}
                                    />

                                </Grid>

                                <Grid item md={4} s={4} xs={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        select
                                        label="Clinical Interpretation"
                                        id="demo-simple-select-outlined"
                                        value={clinInter}

                                        label="Clinical Interpretation"
                                        variant="outlined"

                                        onChange={(event) => setClinInter(event.target.value)}
                                    >
                                        {INTERPRETATION_CHOICES.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>
                        </CardContent>
                        {errorUpdate && <Alert severity="error">{errorUpdate}</Alert>}
                        {successUpdate && <Alert severity="success">Update succesfull!</Alert>}
                        <Divider />
                        <Grid container spacing={1}>
                            <Grid item >
                                <Button
                                    disabled={
                                        dateResponse === null ||
                                        doctorReporter === "Не указано" ||
                                        clinInter === "Не указано"
                                    }
                                    variant="outlined"
                                    type="submit"
                                    color="primary">
                                    Update case
            </Button>
                            </Grid>
                            <Grid item >

                                <Button
                                    color="primary"
                                    onClick={handleDeleteCase}
                                    variant="outlined">
                                    Delete case
            </Button>
                            </Grid>
                            <Grid item >
                                <Button
                                    color="primary"
                                    onClick={handleCasePDF}
                                    variant="outlined">
                                    PDF
            </Button>
                            </Grid>
                        </Grid>
                    </Card>}
        </form>
    );
}

export default CasePDL1
