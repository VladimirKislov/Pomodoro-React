import { ActionCreator, AnyAction } from "redux";

const ADD_PAUSE_TIMER = "ADD_PAUSE_TIMER";
const UPDATE_PAUSE_TIMER = "UPDATE_PAUSE_TIMER";
const ADD_STOP_TIMER = "ADD_STOP_TIMER";
const UPDATE_STOP_TIMER = "UPDATE_STOP_TIMER";
const ADD_POMODORO = "ADD_POMODORO";
const UPDATE_POMODORO = "UPDATE_POMODORO";
const ADD_TOTAL_TIME = "ADD_TOTAL_TIME";
const UPDATE_TOTAL_TIME = "UPDATE_TOTAL_TIME";
const UPDATE_CHOSEN_WEEK = "UPDATE_CHOSEN_WEEK";
const UPDATE_WEEK = "UPDATE_WEEK";
const GET_DATE_CHART = "GET_DATE_CHART";

export type StatisticsPauseTimerAction = {
  type: string;
  date: string;
  pauseTimer: number;
};

export type StatisticsStopTimerAction = {
  type: string;
  date: string;
  stopTimer: number;
};

export type StatisticsPomodoroAction = {
  type: string;
  date: string;
  countPomodoro: number;
};

export type StatisticsTotalTime = {
  type: string;
  date: string;
  totalTime: number;
};

export type StatisticChosenWeekAction = {
  type: string;
  chosenWeek: number;
};

export type StatisticWeekAction = {
  type: string;
  pause: Array<any>;
  pomodoro: Array<any>;
  stop: Array<any>;
  total: Array<any>;
};

// counter pause timer

export const addStatisticsPauseTimer: ActionCreator<StatisticsPauseTimerAction> = (timer, date) => ({
  type: ADD_PAUSE_TIMER,
  date,
  pauseTimer: timer,
});

export const updateStatisticsPauseTimer: ActionCreator<StatisticsPauseTimerAction> = (timer, date) => ({
  type: UPDATE_PAUSE_TIMER,
  date,
  pauseTimer: timer,
});

// counter stop

export const addStatisticsStopTimer: ActionCreator<StatisticsStopTimerAction> = (timer, date) => ({
  type: ADD_STOP_TIMER,
  date,
  stopTimer: timer,
});

export const updateStatisticsStopTimer: ActionCreator<StatisticsStopTimerAction> = (timer, date) => ({
  type: UPDATE_STOP_TIMER,
  date,
  stopTimer: timer,
});

// count pomodoro

export const addStatisticsPomodoro: ActionCreator<StatisticsPomodoroAction> = (count, date) => ({
  type: ADD_POMODORO,
  date,
  countPomodoro: count,
});

export const updateStatisticsPomodoro: ActionCreator<StatisticsPomodoroAction> = (count, date) => ({
  type: UPDATE_POMODORO,
  date,
  countPomodoro: count,
});

// totalTime

export const addTotalTime: ActionCreator<StatisticsTotalTime> = (totalTime, date) => ({
  type: ADD_TOTAL_TIME,
  date,
  totalTime,
});

export const updateTotalTime: ActionCreator<StatisticsTotalTime> = (totalTime, date) => ({
  type: UPDATE_TOTAL_TIME,
  date,
  totalTime,
});

// chosenWeek

export const updateStatisticChosenWeek: ActionCreator<StatisticChosenWeekAction> = (chosenWeek) => ({
  type: UPDATE_CHOSEN_WEEK,
  chosenWeek,
});

// updateWeek

export const updateStatisticWeek: ActionCreator<StatisticWeekAction> = (pause, pomodoro, stop, total) => ({
  type: UPDATE_WEEK,
  pause,
  pomodoro,
  stop,
  total,
});

// dateClickChart

export const getDateClickChart: ActionCreator<any> = (dateClickChart) => ({
  type: GET_DATE_CHART,
  dateClickChart,
});
