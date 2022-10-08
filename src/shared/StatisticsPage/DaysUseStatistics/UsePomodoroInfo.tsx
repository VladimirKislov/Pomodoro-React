import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  StatisticsPauseTimerAction,
  StatisticsPomodoroAction,
  StatisticsStopTimerAction,
  StatisticsTotalTime,
} from "../../../store/StatisticsTimerAction/StatisticsTimerAction";
import { RootState } from "../../../store/store";
import { getTime } from "../../../utils/getTime";
import { Chart } from "../../Chart";
import { PomodoroStopIcon, PomodoroTimeIcon } from "../../Icons";
import { FocusIcon } from "../../Icons/FocusIcon";
import styles from "./usepomodoroinfo.css";

export function UsePomodoroInfo() {
  const getClickChart = useSelector<RootState, string>((state) => state.dateClickChart);
  const getPomodoro = useSelector<RootState, Array<StatisticsPomodoroAction>>((state) => state.countPomodoro);
  const getPauseTime = useSelector<RootState, Array<StatisticsPauseTimerAction>>((state) => state.pauseTimer);
  const getStopTimer = useSelector<RootState, Array<StatisticsStopTimerAction>>((state) => state.stopTimer);
  const getTotalTime = useSelector<RootState, Array<StatisticsTotalTime>>((state) => state.totalTime);

  const [countTime, setCountTime] = useState(0);
  const [countStop, setCountStop] = useState(0);
  const [countPause, setCountPause] = useState(0);
  const [countPomodoro, setCountPomodoro] = useState(0);
  const [getDayWeek, setGetDayWeek] = useState("");

  useEffect(() => {
    if (getClickChart !== "") {
      const time = getTotalTime.filter((item) => item.date === getClickChart);
      const stop = getStopTimer.filter((item) => item.date === getClickChart);
      const pause = getPauseTime.filter((item) => item.date === getClickChart);
      const pomodoro = getPomodoro.filter((item) => item.date === getClickChart);

      if (time.length > 0) setCountTime(time[0].totalTime);
      if (stop.length > 0) setCountStop(stop[0].stopTimer);
      if (pause.length > 0) setCountPause(pause[0].pauseTimer);
      if (pomodoro.length > 0) setCountPomodoro(pomodoro[0].countPomodoro);
    }
  }, [getClickChart]);

  useEffect(() => {
    if (new Date(getClickChart).getDay() !== NaN) {
      switch (new Date(getClickChart).getDay()) {
        case 0:
          setGetDayWeek("Sunday");
          break;
        case 1:
          setGetDayWeek("Monday");
          break;
        case 2:
          setGetDayWeek("Tuesday");
          break;
        case 3:
          setGetDayWeek("Wednesday");
          break;
        case 4:
          setGetDayWeek("Thursday");
          break;
        case 5:
          setGetDayWeek("Friday");
          break;
        case 6:
          setGetDayWeek("Saturday");
          break;
        default:
          setGetDayWeek("Monday");
      }
    }
  }, [getClickChart]);

  return (
    <div className={styles.container}>
      <div className={styles.day}>
        <h2 className={styles.dayTitle}>{getDayWeek}</h2>
        <p className={styles.dayText}>
          {getClickChart !== "" ? "You have been working on tasks for " : "No data"}
          {getClickChart !== "" ? (
            <span className={styles.dayTextMin}>
              {countTime > 3600
                ? `${getTime(countTime).stringHour} hours and ${getTime(countTime).stringMinutes} minutes`
                : `${getTime(countTime).stringMinutes} minutes`}
            </span>
          ) : (
            ""
          )}
        </p>
      </div>

      <div className={styles.chart}>
        <div className={styles.chartContainer}>
          <Chart />
        </div>
        <div className={styles.chartDays}>
          <h3 className={styles.chartDaysTitle}>Mon</h3>
          <h3 className={styles.chartDaysTitle}>Tue</h3>
          <h3 className={styles.chartDaysTitle}>Wed</h3>
          <h3 className={styles.chartDaysTitle}>Thu</h3>
          <h3 className={styles.chartDaysTitle}>Fri</h3>
          <h3 className={styles.chartDaysTitle}>Sat</h3>
          <h3 className={styles.chartDaysTitle}>Sun</h3>
        </div>
      </div>

      <div className={styles.pomodoroCount}>
        {getClickChart !== "" ? (
          <div className={styles.pomodoroImgTwo}>
            <div className={styles.pomodoroImgTwoLogo}>
              <p className={styles.pomodoroImgTwoTextLogo}>{`x ${countPomodoro}`}</p>
            </div>
            <p className={styles.pomodoroImgTwoText}>{`${countPomodoro} pomodoro`}</p>
          </div>
        ) : (
          <div className={styles.pomodoroImgTwo}>
            <div className={styles.pomodoroImgTwoDefaultLogo}>LOGO</div>
          </div>
        )}
      </div>

      <div className={styles.pomodoroInfo}>
        <div className={styles.pomodoroInfoWrapper}>
          <div>
            <h3 className={styles.pomodoroInfoTitle}>Focus</h3>
            <p className={styles.pomodoroInfoText}>0%</p>
          </div>
          <div className={styles.pomodoroInfoFocus}>
            <FocusIcon />
          </div>
        </div>

        <div className={styles.pomodoroInfoWrapper}>
          <div>
            <h3 className={styles.pomodoroInfoTitle}>Pause time</h3>
            <p className={styles.pomodoroInfoText}>
              {getClickChart !== ""
                ? countPause > 3600
                  ? `${getTime(countPause).stringHour}h ${getTime(countPause).stringMinutes}m`
                  : `${getTime(countPause).stringMinutes}m`
                : "0m"}
            </p>
          </div>
          <div className={styles.pomodoroInfoTime}>
            <PomodoroTimeIcon />
          </div>
        </div>

        <div className={styles.pomodoroInfoWrapper}>
          <div>
            <h3 className={styles.pomodoroInfoTitle}>Stops</h3>
            <p className={styles.pomodoroInfoText}>{getClickChart !== "" ? `${countStop}` : 0}</p>
          </div>
          <div className={styles.pomodoroInfoStop}>
            <PomodoroStopIcon />
          </div>
        </div>
      </div>
    </div>
  );
}
