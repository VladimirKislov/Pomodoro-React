import { ActionCreator, AnyAction } from "redux";

const UPDATE_TIMER_BREAK = "UPDATE_TIMER_BREAK";
const UPDATE_COUNT_TIMER = "UPDATE_COUNT_TIMER";
const RETURN_COUNT_TIMER = "RETURN_COUNT_TIMER";


export const updateTimerBreak: ActionCreator<AnyAction> = (timer) => ({
  type: UPDATE_TIMER_BREAK,
  timerBreak: timer,
});

export const returnTimerBreak: ActionCreator<AnyAction> = (timer) => ({
  type: RETURN_COUNT_TIMER,
  timerBreak: timer,
});

export const updateCountTimer: ActionCreator<AnyAction> = (timer) => ({
  type: UPDATE_COUNT_TIMER,
  countTimer: timer,
});
