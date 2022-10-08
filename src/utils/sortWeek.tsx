import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  StatisticsPauseTimerAction,
  StatisticsPomodoroAction,
  StatisticsStopTimerAction,
  StatisticsTotalTime,
  updateStatisticWeek,
} from "../store/StatisticsTimerAction/StatisticsTimerAction";
import { RootState } from "../store/store";
import { getWeekDay } from "./getWeekDay";

export function sortWeek() {
  const dispatch = useDispatch();
  const getChosenWeekAction = useSelector<RootState, Number>((state) => state.chosenWeek);
  const getPomodoro = useSelector<RootState, Array<StatisticsPomodoroAction>>((state) => state.countPomodoro);
  const getPauseTime = useSelector<RootState, Array<StatisticsPauseTimerAction>>((state) => state.pauseTimer);
  const getStopTimer = useSelector<RootState, Array<StatisticsStopTimerAction>>((state) => state.stopTimer);
  const getTotalTime = useSelector<RootState, Array<StatisticsTotalTime>>((state) => state.totalTime);

  useEffect(() => {
    const date = new Date();
    const day = getWeekDay(date);
    let week: Array<any> = [];
    
    const dispatchWeek = () => {
      const pomodoro = getPomodoro.filter((item) => {
        if (week.includes(item.date)) return item;
      });
      const pause = getPauseTime.filter((item) => {
        if (week.includes(item.date)) return item;
      });
      const stop = getStopTimer.filter((item) => {
        if (week.includes(item.date)) return item;
      });
      const total = getTotalTime.filter((item) => {
        if (week.includes(item.date)) {
          return item;
        }
      });
      dispatch(updateStatisticWeek(pause.reverse(), pomodoro.reverse(), stop.reverse(), total.reverse()));
    };

    if (getChosenWeekAction === 0) {
      week.push(date.toJSON().slice(0, 10).split("-").join("."));
      for (let i = 1; i < day; i++) {
        week.push(
          new Date(date.setTime(date.getTime() - 24 * 60 * 60 * 1000))
            .toJSON()
            .slice(0, 10)
            .split("-")
            .join(".")
        );
      }
      dispatchWeek();
    } else if (getChosenWeekAction === 1) {
      const lastWeek = date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * day);
      week.push(new Date(lastWeek).toJSON().slice(0, 10).split("-").join("."));
      for (let i = 1; i < 7; i++) {
        week.push(new Date(lastWeek - 24 * 60 * 60 * 1000 * i).toJSON().slice(0, 10).split("-").join("."));
      }
      dispatchWeek();
    } else if (getChosenWeekAction === 2) {
      const twoWeek = date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * (day + 7));
      week.push(new Date(twoWeek).toJSON().slice(0, 10).split("-").join("."));
      for (let i = 1; i < 7; i++) {
        week.push(new Date(twoWeek - 24 * 60 * 60 * 1000 * i).toJSON().slice(0, 10).split("-").join("."));
      }
      dispatchWeek();
    }
  }, [getChosenWeekAction]);

  return;
}
