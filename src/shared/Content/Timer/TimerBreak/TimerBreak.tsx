import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { updateTimerBreak } from "../../../../store/TimerBreakAction/TimerBreakAction";
import { ToDoListAction, upTimerTodoList } from "../../../../store/ToDo/ToDoAction";
import styles from "./timerbreak.css";

export function TimerBreak() {
  const ArrayToDoList = useSelector<RootState, Array<ToDoListAction>>((state) => state.todoList);
  const TimerBreakAction = useSelector<RootState, number>((state) => state.timerBreak);

  const dispatch = useDispatch();
  const [num, setNum] = useState(0);
  const [isPause, setIsPause] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (ArrayToDoList.length > 0) {
      setNum(ArrayToDoList.length - 1);
    }

    const startTimerBreak = setInterval(() => {
      const time = TimerBreakAction - 1;
      dispatch(updateTimerBreak(time));
    }, 10);

    if (TimerBreakAction !== 0) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    if (TimerBreakAction === 0 || isPause) {
      clearInterval(startTimerBreak);
    }

    return () => {
      clearInterval(startTimerBreak);
    };
  }, [ArrayToDoList, TimerBreakAction, isPause]);

  function setViewTimer() {
    let hour = String(Math.floor(TimerBreakAction / 60));
    let min = String(TimerBreakAction % 60);
    if (String(hour).length <= 1) hour = "0" + hour;
    if (String(min).length <= 1) min = "0" + min;
    return {
      hour,
      min,
    };
  }

  const onClickUp = () => {
    dispatch(
      upTimerTodoList(
        ArrayToDoList[num].id,
        ArrayToDoList[num].textTitle,
        ArrayToDoList[num].timer,
        ArrayToDoList[num].numberTimers
      )
    );
  };

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
          <h2 className={styles.timerTitle}>{`${setViewTimer().hour}:${setViewTimer().min}`}</h2>
          <button onClick={onClickUp}>
            <svg
              className={styles.addTask}
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <circle cx="25" cy="25" r="25" fill="#C4C4C4" />
              <path
                d="M26.2756 26.1321V33H23.7244V26.1321H17V23.7029H23.7244V17H26.2756V23.7029H33V26.1321H26.2756Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <p className={styles.timerTask}>
          {ArrayToDoList.length > 0 ? `Task ${ArrayToDoList[num].numberTimers} -` : "Task 1 -"}
          <span className={styles.gistTask}>
            {ArrayToDoList.length > 0 ? " " + ArrayToDoList[num].textTitle : " Make up a site"}
          </span>
        </p>
        <div className={styles.btn}>
          {!isPause ? (
            <button
              className={styles.btnStart}
              onClick={() => {
                setIsPause(true);
              }}
              disabled={isDisabled}
            >
              Pause
            </button>
          ) : (
            <button
              className={styles.btnStart}
              onClick={() => {
                setIsPause(false);
              }}
            >
              Continue
            </button>
          )}

          <button className={styles.btnSkip} onClick={() => {}}>
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}
