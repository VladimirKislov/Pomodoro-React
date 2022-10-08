import React, { useEffect } from "react";
import { TimerBreak } from "./TimerBreak";
import { TimerPomodoro } from "./TimerPomodoro";
import styles from "./timer.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { DeleteTodoList, downTimerTodoList, ToDoListAction } from "../../../store/ToDo/ToDoAction";
import { returnTimerBreak, updateCountTimer } from "../../../store/TimerBreakAction/TimerBreakAction";
import { useDispatch } from "react-redux";
import {
  addStatisticsPomodoro,
  addStatisticsStopTimer,
  StatisticsPomodoroAction,
  updateStatisticsPomodoro,
  updateStatisticsStopTimer,
} from "../../../store/StatisticsTimerAction/StatisticsTimerAction";
import { currentDate } from "../../../utils/currentDate";

export function Timer() {
  const ArrayToDoList = useSelector<RootState, Array<ToDoListAction>>((state) => state.todoList);
  const TimerBreakAction = useSelector<RootState, number>((state) => state.timerBreak);
  const CountTimerAction = useSelector<RootState, number>((state) => state.countTimer);
  const CountPomodoro = useSelector<RootState, Array<StatisticsPomodoroAction>>(
    (state) => state.countPomodoro
  );
  const dispatch = useDispatch();

  let num = ArrayToDoList.length - 1;
  let numPomodoro = CountPomodoro.length - 1;

  useEffect(() => {
    if (ArrayToDoList.length > 0)
      if (ArrayToDoList[num].timer !== 0 && TimerBreakAction === 0) {
        if (CountTimerAction % 4 === 0) {
          dispatch(returnTimerBreak(900));
        } else {
          dispatch(returnTimerBreak(300));
        }
      }
  }, [ArrayToDoList, TimerBreakAction]);

  useEffect(() => {
    if (TimerBreakAction < 1) {
      dispatch(updateCountTimer(CountTimerAction + 1));
    }
  }, [TimerBreakAction]);

  useEffect(() => {
    if (ArrayToDoList.length > 0)
      if (ArrayToDoList[num].numberTimers > 0 && CountTimerAction > 0) {
        dispatch(
          downTimerTodoList(
            ArrayToDoList[num].id,
            ArrayToDoList[num].textTitle,
            ArrayToDoList[num].timer,
            ArrayToDoList[num].numberTimers
          )
        );
      }
  }, [CountTimerAction]);

  useEffect(() => {
    // if (
    //   ArrayToDoList.length > 0 &&
    //   ArrayToDoList[num].numberTimers > 0 &&
    //   ArrayToDoList[num].timer === 0 &&
    //   ArrayToDoList[num].isBreak === false
    // ) {
    //   if (CountPomodoro[0].date !== currentDate()) {
    //     dispatch(addStatisticsPomodoro(0, currentDate()));
    //   }
    // }

    if (
      ArrayToDoList.length > 0 &&
      ArrayToDoList[num].numberTimers > 0 &&
      ArrayToDoList[num].timer === 0 &&
      TimerBreakAction === 0 &&
      ArrayToDoList[num].isBreak === false
    ) {
      if (CountPomodoro[0].date === currentDate()) {
        dispatch(updateStatisticsPomodoro(CountPomodoro[0].countPomodoro + 1, currentDate()));
      }
    }
  }, [TimerBreakAction]);

  useEffect(() => {
    if (
      ArrayToDoList.length > 0 &&
      ArrayToDoList[num].numberTimers === 0 &&
      ArrayToDoList[num].timer > 0 &&
      TimerBreakAction > 0 &&
      CountTimerAction > 0
    ) {
      dispatch(updateCountTimer(0));
      dispatch(returnTimerBreak(300));
      dispatch(DeleteTodoList(ArrayToDoList[num].id));
    }
    if (ArrayToDoList.length > 0) ArrayToDoList[num].isBreak;
    
  }, [TimerBreakAction]);

  return (
    <div className={styles.container}>
      {ArrayToDoList.length > 0 && ArrayToDoList[num].timer === 0 && TimerBreakAction !== 0 ? (
        <TimerBreak />
      ) : (
        <TimerPomodoro />
      )}
    </div>
  );
}
