import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStatisticsPauseTimer,
  addStatisticsStopTimer,
  addTotalTime,
  StatisticsPauseTimerAction,
  StatisticsStopTimerAction,
  StatisticsTotalTime,
  updateStatisticsPauseTimer,
  updateStatisticsStopTimer,
  updateTotalTime,
} from "../../../../store/StatisticsTimerAction/StatisticsTimerAction";
import { RootState } from "../../../../store/store";
import {
  ReturnTimerTodoList,
  stopTimerTodoList,
  ToDoListAction,
  updateTimerTodoList,
  upTimerTodoList,
} from "../../../../store/ToDo/ToDoAction";
import { currentDate } from "../../../../utils/currentDate";
import { getTime } from "../../../../utils/getTime";
import { AddTaskIcon } from "../../../Icons";
import styles from "./timerpomodoro.css";

export function TimerPomodoro() {
  const dispatch = useDispatch();
  const [isSkipTimer, setIsSkipTimer] = useState(false);
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [getPause, setGetPause] = useState(false);
  const [getStop, setGetStop] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const ArrayToDoList = useSelector<RootState, Array<ToDoListAction>>((state) => state.todoList);
  const getPauseTime = useSelector<RootState, Array<StatisticsPauseTimerAction>>((state) => state.pauseTimer);
  const getStopTimer = useSelector<RootState, Array<StatisticsStopTimerAction>>((state) => state.stopTimer);
  const getTotalTime = useSelector<RootState, Array<StatisticsTotalTime>>((state) => state.totalTime);

  let num = ArrayToDoList.length - 1;
  let numPause = getPauseTime.length - 1;
  let numStop = getStopTimer.length - 1;
  let numTotalTime = getTotalTime.length - 1;

  useEffect(() => {
    if (ArrayToDoList.length === 0) return;
    const time = ArrayToDoList[num].timer - 1;

    const startTimer = setInterval(() => {
      if (getTotalTime[0].date === currentDate()) {
        dispatch(updateTotalTime(getTotalTime[0].totalTime + 1, currentDate()));
      } else {
        dispatch(addTotalTime(0, currentDate()));
      }

      dispatch(
        updateTimerTodoList(
          ArrayToDoList[num].id,
          ArrayToDoList[num].textTitle,
          time,
          ArrayToDoList[num].numberTimers
        )
      );
    }, 1000);

    if (start) {
      setPause(true);
      setBtnDisabled(false);
    } else {
      setPause(false);
    }

    if (ArrayToDoList[num].timer === 0) {
      dispatch(
        ReturnTimerTodoList(
          ArrayToDoList[num].id,
          ArrayToDoList[num].textTitle,
          1500,
          ArrayToDoList[num].numberTimers
        )
      );
    }

    if (ArrayToDoList[num].timer === 0 || start === false) {
      clearInterval(startTimer);
    }

    return () => {
      clearInterval(startTimer);
    };
  }, [start, pause, isSkipTimer, ArrayToDoList]);

  useEffect(() => {
    if (ArrayToDoList.length === 0) return;

    const start = setInterval(() => {
      if (getPauseTime[0].date === currentDate()) {
        dispatch(updateStatisticsPauseTimer(getPauseTime[0].pauseTimer + 1, currentDate()));
      }
    }, 1000);

    if (!getPause) {
      clearInterval(start);
    }

    return () => {
      clearInterval(start);
    };
  }, [getPause, getPauseTime[0].pauseTimer]);

  useEffect(() => {
    if (getStop) {
      if (getStopTimer[0].date !== currentDate()) {
        dispatch(addStatisticsStopTimer(0, currentDate()));
      }

      if (getStopTimer[0].date === currentDate()) {
        dispatch(updateStatisticsStopTimer(getStopTimer[0].stopTimer + 1, currentDate()));
      }
    }
  }, [getStop]);

  const setViewTimer = () => {
    const time = getTime(ArrayToDoList[num].timer);
    return `${time.stringMinutes}:${time.stringSeconds}`;
  };

  const onClickUp = () => {
    dispatch(
      upTimerTodoList(
        ArrayToDoList[num].id,
        ArrayToDoList[num].textTitle,
        ArrayToDoList[num].timer,
        ArrayToDoList[num].numberTimers + 1
      )
    );
  };

  async function StopTimer() {
    await setGetStop(true);
    await setStart(false);
    await setBtnDisabled(true);
    await dispatch(
      stopTimerTodoList(
        ArrayToDoList[num].id,
        ArrayToDoList[num].textTitle,
        0,
        ArrayToDoList[num].numberTimers,
        true
      )
    );
  }

  function SkipTimer() {
    setIsSkipTimer(true);
    setBtnDisabled(true);
    dispatch(
      stopTimerTodoList(
        ArrayToDoList[num].id,
        ArrayToDoList[num].textTitle,
        0,
        ArrayToDoList[num].numberTimers,
        false
      )
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperHeader}>
        <p className={styles.headerTitle}>
          {ArrayToDoList.length > 0 ? ArrayToDoList[num].textTitle : "Make up a site"}
        </p>
        <p className={styles.headerInfo}>Pomodoro 1</p>
      </div>
      <div className={styles.wrapperTimer}>
        <div className={styles.containerTime}>
          <h2 className={styles.timerTitle}>{ArrayToDoList.length > 0 ? setViewTimer() : "25:00"}</h2>
          <button onClick={onClickUp}>
            <AddTaskIcon />
          </button>
        </div>
        <p className={styles.timerTask}>
          {ArrayToDoList.length > 0 ? `Task ${ArrayToDoList[num].numberTimers} -` : "Task 1 -"}
          <span className={styles.gistTask}>
            {ArrayToDoList.length > 0 ? " " + ArrayToDoList[num].textTitle : " Make up a site"}
          </span>
        </p>
        <div className={styles.btn}>
          {!pause ? (
            <button
              className={styles.btnStart}
              onClick={() => {
                setStart(true);
                setIsSkipTimer(false);
                setGetPause(false);
                setGetStop(false);
              }}
            >
              {isSkipTimer && !start && !pause ? "Continue" : "Start"}
            </button>
          ) : (
            <button
              className={styles.btnStart}
              onClick={() => {
                setStart(false);
                setPause(false);
                setIsSkipTimer(true);
                setGetPause(true);
              }}
            >
              Pause
            </button>
          )}
          {!start && !pause && !btnDisabled ? (
            <button
              className={styles.btnSkip}
              onClick={() => {
                SkipTimer();
              }}
            >
              Completed
            </button>
          ) : (
            <button
              className={styles.btnStop}
              onClick={() => {
                StopTimer();
              }}
              disabled={btnDisabled}
            >
              Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
