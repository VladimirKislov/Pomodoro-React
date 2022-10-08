import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import {
  downTimerTodoList,
  ToDoListAction,
  updatePauseTimerShort,
  upTimerTodoList,
} from "../../../store/ToDo/ToDoAction";
import { getTime } from "../../../utils/getTime";
import { useTheme } from "../../Hooks/useTheme";
import { SettingIcon } from "../../Icons";
import styles from "./darktheme.css";

export function DarkTheme() {
  const dispatch = useDispatch();
  const { theme, setTheme } = useTheme();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIncPomodoroDis, setIsIncPomodoroDis] = useState(false);
  const [isDecPomodoroDis, setIsDecPomodoroDis] = useState(false);
  const [isIncPauseDis, setIsIncPauseDis] = useState(false);
  const [isDecPauseDis, setIsDecPauseDis] = useState(false);
  const refDropdown = useRef<HTMLDivElement>(null);
  const ArrayToDoList = useSelector<RootState, Array<ToDoListAction>>((state) => state.todoList);
  const timerBreak = useSelector<RootState, number>((state) => state.timerBreak);

  let num = ArrayToDoList.length - 1;

  const handleLightThemeClick = () => {
    setTheme("light");
  };
  const handleDarkThemeClick = () => {
    setTheme("dark");
  };

  useEffect(() => {
    const handelClick = (event: MouseEvent) => {
      if (isDropdownOpen) {
        if (event.target instanceof Node && !refDropdown.current?.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener("click", handelClick);
    return () => {
      document.removeEventListener("click", handelClick);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    if (ArrayToDoList.length > 0) {
      if (ArrayToDoList[num].timer === 1800) {
        setIsIncPomodoroDis(true);
      } else {
        setIsIncPomodoroDis(false);
      }

      if (ArrayToDoList[num].timer === 600) {
        setIsDecPomodoroDis(true);
      } else {
        setIsDecPomodoroDis(false);
      }
    }
  }, [ArrayToDoList]);

  useEffect(() => {
    if (timerBreak === 600) {
      setIsIncPauseDis(true);
    } else {
      setIsIncPauseDis(false);
    }

    if (timerBreak === 60) {
      setIsDecPauseDis(true);
    } else {
      setIsDecPauseDis(false);
    }
  }, [timerBreak]);

  const incTimerTodoList = () => {
    dispatch(
      upTimerTodoList(
        ArrayToDoList[num].id,
        ArrayToDoList[num].textTitle,
        ArrayToDoList[num].timer + 60,
        ArrayToDoList[num].numberTimers
      )
    );
  };

  const decTimerTodoList = () => {
    dispatch(
      downTimerTodoList(
        ArrayToDoList[num].id,
        ArrayToDoList[num].textTitle,
        ArrayToDoList[num].timer - 60,
        ArrayToDoList[num].numberTimers
      )
    );
  };

  const incPauseDis = () => {
    dispatch(updatePauseTimerShort(timerBreak + 60));
  };

  const decPauseDis = () => {
    dispatch(updatePauseTimerShort(timerBreak - 60));
  };

  return (
    <>
      <div className={styles.btn} onClick={() => setIsDropdownOpen(true)}>
        <SettingIcon />
      </div>

      {isDropdownOpen && (
        <div ref={refDropdown} className={styles.dropdownContainer}>
          <div className={styles.imgWrapper}>
            <img className={styles.img} src="https://i.ibb.co/54ZFhMM/Marie-Jensen.png" alt="Marie-Jensen" />
            <h2 className={styles.titleImg}>Marie Jensen</h2>
          </div>
          <h2 className={styles.titleTheme}>Сhange Theme:</h2>
          <div className={styles.btnContainer}>
            <button
              className={styles.light}
              onClick={() => {
                handleLightThemeClick();
              }}
            >
              Light
            </button>
            <button
              className={styles.dark}
              onClick={() => {
                handleDarkThemeClick();
              }}
            >
              Dark
            </button>
          </div>

          <div className={styles.timeWrapper}>
            <h2 className={styles.timePomodoroTitle}>Change Pomodoro duration:</h2>
            <p className={styles.timePomodoroText}>
              {ArrayToDoList.length > 0
                ? `${getTime(ArrayToDoList[num].timer).stringMinutes}:${
                    getTime(ArrayToDoList[num].timer).stringSeconds
                  } `
                : "25:00"}
            </p>
            <div className={styles.timePomodoroWrapper}>
              <button
                className={styles.timePomodoroUp}
                onClick={() => {
                  incTimerTodoList();
                }}
                disabled={isIncPomodoroDis}
              >
                Increase
              </button>
              <button
                className={styles.timePomodoroDown}
                onClick={() => {
                  decTimerTodoList();
                }}
                disabled={isDecPomodoroDis}
              >
                Decrease
              </button>
            </div>
          </div>

          <div className={styles.pauseWrapper}>
            <h2 className={styles.pauseWrapperTitle}>Change short Pause duration:</h2>
            <p className={styles.pauseWrapperText}>{`${getTime(timerBreak).stringMinutes}:${
              getTime(timerBreak).stringSeconds
            }`}</p>
            <div className={styles.pauseWrapperBtnContainerOne}>
              <button
                className={styles.pauseWrapperBtn}
                onClick={() => {
                  incPauseDis();
                }}
                disabled={isIncPauseDis}
              >
                Increase
              </button>
              <button
                className={styles.pauseWrapperBtn}
                onClick={() => {
                  decPauseDis();
                }}
                disabled={isDecPauseDis}
              >
                Decrease
              </button>
            </div>
            {/* <h2 className={styles.pauseWrapperTitle}>Change long Pause duration:</h2>
            <p className={styles.pauseWrapperText}>15:00</p>
            <div className={styles.pauseWrapperBtnContainer}>
              <button className={styles.pauseWrapperBtn}>Increase</button>
              <button className={styles.pauseWrapperBtn}>Decrease</button>
            </div> */}
          </div>

          {/* <div className={styles.pauseWrapper}>
            <h2 className={styles.pauseWrapperTitle}>Change the frequency of long Pause:</h2>
            <p className={styles.pauseWrapperText}>4</p>
            <div className={styles.pauseWrapperBtnContainer}>
              <button className={styles.pauseWrapperBtn}>Increase</button>
              <button className={styles.pauseWrapperBtn}>Decrease</button>
            </div>
          </div> */}

          {/* <div className={styles.checkboxGroup}>
            <h2 className={styles.pauseWrapperTitle}>Notifications:</h2>
          </div> */}
        </div>
      )}
    </>
  );
}
