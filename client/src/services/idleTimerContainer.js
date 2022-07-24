import React from "react";
import { IdleTimer } from "./idleTimer";

function IdleTimerContainer() {
    const millisecond =1;
    const second = millisecond*1000;
    const minute = second*60;
    const hour = minute*60;

    return (
            <IdleTimer timeout={4*hour}></IdleTimer>
    )
}

export default IdleTimerContainer;