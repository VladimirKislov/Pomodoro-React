import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ToDoListAction } from "../../../store/ToDo/ToDoAction";
import { getTime } from "../../../utils/getTime";
import { ListForm } from "./ListForm";
import { ListItem } from "./ListItem";
import styles from "./todolist.css";

export function ToDoList() {
  const ArrayToDoList = useSelector<RootState, Array<ToDoListAction>>((state) => state.todoList);
  const [totalTimerCount, setTotalTimerCount] = useState(0);

  let count = 0;

  useEffect(() => {
    if (ArrayToDoList.length === 0) return;
    const arrTime = ArrayToDoList.map((e) => {
      return e.timer * e.numberTimers;
    });
    setTotalTimerCount(arrTime.reduce((acc, num) => acc + num, 0));
  }, [ArrayToDoList]);

  const viewTime = () => {
    if (getTime(totalTimerCount).hours > 0) {
      return `${getTime(totalTimerCount).stringHour} hours and ${getTime(totalTimerCount).stringMinutes} minutes`;
    } else {
      return `${getTime(totalTimerCount).stringMinutes} minutes`;
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Hooray! Now you can start working:</h2>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span className={styles.dot}>•</span>Select a category and write the name of the current task
        </li>
        <li className={styles.listItem}>
          <span className={styles.dot}>•</span>Start the timer ("pomodoro")
        </li>
        <li className={styles.listItem}>
          <span className={styles.dot}>•</span>Work until the tomato rings
        </li>
        <li className={styles.listItem}>
          <span className={styles.dot}>•</span>Take a short break (3-5 minutes)
        </li>
        <li className={styles.listItem}>
          <span className={styles.dot}>•</span>
          Keep working Pomodoro after Pomodoro until the task is completed. Every 4 "tomatoes" take a long
          break (15-30 minutes).
        </li>
      </ul>

      <ListForm />

      {ArrayToDoList.length > 0 && (
        <div className={styles.ToDoListItem}>
          {ArrayToDoList.map((item: any) => (
            <ListItem
              key={item.id}
              id={item.id}
              title={item.textTitle}
              timer={item.timer}
              count={(count += 1)}
              numberTimers={item.numberTimers}
            />
          ))}
        </div>
      )}

      <p className={styles.totalTime}>{totalTimerCount !== 0 ? `${viewTime()}` : ""}</p>
    </div>
  );
}
