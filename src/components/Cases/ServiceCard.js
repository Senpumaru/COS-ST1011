import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function Service(props) {
    /*** Material UI Styles ***/
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardContent>
                
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Сервис
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    Иммуногистохимия
                </Typography>
                <Typography variant="body2" component="p">
                   Описание. Получение доступа: свяжитесь с ...
                </Typography>
            </CardContent>
           
        </Card>
    )
}

export default Service;
