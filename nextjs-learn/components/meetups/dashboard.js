import react, { useEffect, useState, Fragment } from "react";
import classes from './dashboard.module.css';
import { FaInfo } from 'react-icons/fa';

function Dashboard(props) {
    return (
        <Fragment>
            <div className={classes.stats}>
                <div className={classes.files}>Secure Files <span className={classes.countStyle}>{props.allData.filesCount}</span></div>
                <div className={classes.users}>Total Users <span className={classes.countStyle}>{props.allData.usersCount}</span> </div>
                <div className={classes.groups}>Groups <span className={classes.countStyle}>{props.allData.groupsCount}</span> </div>
            </div>

            <div className={classes['alerts-container']}>
                <h3>Alerts and Notifications</h3>
                <ul className={classes['alert-messages']}>
                    {props.allData.alertsData.map((event, idx) => {
                        return <li key={idx} className={classes.alert}> 
                            <div className={classes.icons}><FaInfo /></div>
                            <div className={classes['alert-message']}> {event.text} </div>
                        </li>
                    })}
                </ul>
            </div>
        </Fragment>
    )
}

export default Dashboard;