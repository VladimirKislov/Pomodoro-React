import { ActionCreator, AnyAction } from "redux";
import { nanoid } from "nanoid";

const ADD_TODO_LIST = "ADD_TODO_LIST";
const UP_TIMER_TODO_LIST = "UP_TIMER_TODO_LIST";
const DOWN_TIMER_TODO_LIST = "DOWN_TIMER_TODO_LIST";
const DELETE_TODO_LIST = "DELETE_TODO_LIST";
const UPDATE_TIMER_TODO_LIST = "UPDATE_TIMER_TODO_LIST";
const STOP_TIMER_TODO_LIST = "STOP_TIMER_TODO_LIST";
const RETURN_TIMER_TODO_LIST = "RETURN_TIMER_TODO_LIST";
const UPDATE_PAUSE_TIMER_SHORT = "UPDATE_PAUSE_TIMER_SHORT";

export type ToDoListAction = {
  type: string;
  id: string;
  textTitle: string;
  timer: number;
  numberTimers: number;
  data: Date;
  isBreak: boolean;
};

export const addToDoList: ActionCreator<ToDoListAction> = (text) => ({
  type: ADD_TODO_LIST,
  id: nanoid(),
  textTitle: text,
  timer: 1500, // 25 min
  numberTimers: 1,
  data: new Date(),
  isBreak: false,
});

export const upTimerTodoList: ActionCreator<ToDoListAction> = (id, text, timer, numberTimers) => ({
  type: UP_TIMER_TODO_LIST,
  id: id,
  textTitle: text,
  timer: timer, // 25min
  numberTimers: numberTimers,
  data: new Date(),
  isBreak: false,
});

export const downTimerTodoList: ActionCreator<ToDoListAction> = (id, text, timer, numberTimers) => ({
  type: DOWN_TIMER_TODO_LIST,
  id: id,
  textTitle: text,
  timer: timer, // 25min
  numberTimers: numberTimers,
  data: new Date(),
  isBreak: false,
});

export const updateTimerTodoList: ActionCreator<ToDoListAction> = (id, text, timer, numberTimers) => ({
  type: UPDATE_TIMER_TODO_LIST,
  id: id,
  textTitle: text,
  timer: timer,
  numberTimers: numberTimers,
  data: new Date(),
  isBreak: false,
});

export const stopTimerTodoList: ActionCreator<ToDoListAction> = (id, text, timer, numberTimers, isBreak) => ({
  type: STOP_TIMER_TODO_LIST,
  id: id,
  textTitle: text,
  timer: timer,
  numberTimers: numberTimers,
  data: new Date(),
  isBreak,
});

export const DeleteTodoList: ActionCreator<AnyAction> = (id) => ({
  type: DELETE_TODO_LIST,
  id: id,
});

export const ReturnTimerTodoList: ActionCreator<ToDoListAction> = (id, text, timer, numberTimers) => ({
  type: RETURN_TIMER_TODO_LIST,
  id: id,
  textTitle: text,
  timer: timer,
  numberTimers: numberTimers,
  data: new Date(),
  isBreak: false,
});

export const updatePauseTimerShort: ActionCreator<any> = (timerBreak) => ({
  type: UPDATE_PAUSE_TIMER_SHORT,
  timerBreak,
});
