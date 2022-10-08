import { AnyAction, Reducer } from "redux";
import { currentDate } from "../utils/currentDate";
import { templateDate } from "../utils/templateDate";

const ADD_TODO_LIST = "ADD_TODO_LIST";
const UP_TIMER_TODO_LIST = "UP_TIMER_TODO_LIST";
const DOWN_TIMER_TODO_LIST = "DOWN_TIMER_TODO_LIST";
const DELETE_TODO_LIST = "DELETE_TODO_LIST";
const UPDATE_TIMER_TODO_LIST = "UPDATE_TIMER_TODO_LIST";
const STOP_TIMER_TODO_LIST = "STOP_TIMER_TODO_LIST";
const RETURN_TIMER_TODO_LIST = "RETURN_TIMER_TODO_LIST";
const UPDATE_TIMER_BREAK = "UPDATE_TIMER_BREAK";
const RETURN_COUNT_TIMER = "RETURN_COUNT_TIMER";
const UPDATE_COUNT_TIMER = "UPDATE_COUNT_TIMER";
const UPDATE_PAUSE_TIMER = "UPDATE_PAUSE_TIMER";
const ADD_PAUSE_TIMER = "ADD_PAUSE_TIMER";
const ADD_STOP_TIMER = "ADD_STOP_TIMER";
const UPDATE_STOP_TIMER = "UPDATE_STOP_TIMER";
const ADD_POMODORO = "ADD_POMODORO";
const UPDATE_POMODORO = "UPDATE_POMODORO";
const ADD_TOTAL_TIME = "ADD_TOTAL_TIME";
const UPDATE_TOTAL_TIME = "UPDATE_TOTAL_TIME";
const UPDATE_CHOSEN_WEEK = "UPDATE_CHOSEN_WEEK";
const UPDATE_WEEK = "UPDATE_WEEK";
const GET_DATE_CHART = "GET_DATE_CHART";
const UPDATE_PAUSE_TIMER_SHORT = "UPDATE_PAUSE_TIMER_SHORT";

export type RootState = {
  todoList: Array<any>;
  timerBreak: number;
  countTimer: number;
  pauseTimer: Array<any>;
  stopTimer: Array<any>;
  countPomodoro: Array<any>;
  totalTime: Array<any>;
  week: object;
  chosenWeek: number;
  dateClickChart: string,
};

const initialState: RootState = {
  todoList: [],
  timerBreak: 300,
  countTimer: 0,
  pauseTimer: [
    {
      pauseTimer: 0,
      date: currentDate(),
    },
    {
      pauseTimer: 60,
      date: templateDate(1),
    },
    {
      pauseTimer: 120,
      date: templateDate(2),
    },
    {
      pauseTimer: 180,
      date: templateDate(3),
    },
    {
      pauseTimer: 240,
      date: templateDate(4),
    },
    {
      pauseTimer: 300,
      date: templateDate(5),
    },
    {
      pauseTimer: 360,
      date: templateDate(6),
    },
    {
      pauseTimer: 420,
      date: templateDate(7),
    },
    {
      pauseTimer: 480,
      date: templateDate(8),
    },
    {
      pauseTimer: 540,
      date: templateDate(9),
    },
    {
      pauseTimer: 600,
      date: templateDate(10),
    },
    {
      pauseTimer: 660,
      date: templateDate(11),
    },
  ],
  stopTimer: [
    {
      stopTimer: 0,
      date: currentDate(),
    },
    {
      stopTimer: 60,
      date: templateDate(1),
    },
    {
      stopTimer: 12,
      date: templateDate(2),
    },
    {
      stopTimer: 19,
      date: templateDate(3),
    },
    {
      stopTimer: 24,
      date: templateDate(4),
    },
    {
      stopTimer: 31,
      date: templateDate(5),
    },
    {
      stopTimer: 36,
      date: templateDate(6),
    },
    {
      stopTimer: 42,
      date: templateDate(7),
    },
    {
      stopTimer: 4,
      date: templateDate(8),
    },
    {
      stopTimer: 54,
      date: templateDate(9),
    },
    {
      stopTimer: 6,
      date: templateDate(10),
    },
    {
      stopTimer: 66,
      date: templateDate(11),
    },
  ],
  countPomodoro: [
    {
      countPomodoro: 0,
      date: currentDate(),
    },
    {
      countPomodoro: 6,
      date: templateDate(1),
    },
    {
      countPomodoro: 12,
      date: templateDate(2),
    },
    {
      countPomodoro: 18,
      date: templateDate(3),
    },
    {
      countPomodoro: 24,
      date: templateDate(4),
    },
    {
      countPomodoro: 3,
      date: templateDate(5),
    },
    {
      countPomodoro: 36,
      date: templateDate(6),
    },
    {
      countPomodoro: 42,
      date: templateDate(7),
    },
    {
      countPomodoro: 48,
      date: templateDate(8),
    },
    {
      countPomodoro: 54,
      date: templateDate(9),
    },
    {
      countPomodoro: 60,
      date: templateDate(10),
    },
    {
      countPomodoro: 66,
      date: templateDate(11),
    },
  ],
  totalTime: [
    {
      date: currentDate(),
      totalTime: 0,
    },
    {
      date: templateDate(1),
      totalTime: 1500,
    },
    {
      date: templateDate(2),
      totalTime: 7500,
    },
    {
      date: templateDate(3),
      totalTime: 1200,
    },
    {
      date: templateDate(4),
      totalTime: 2900,
    },
    {
      date: templateDate(5),
      totalTime: 6000,
    },
    {
      date: templateDate(6),
      totalTime: 500,
    },
    {
      date: templateDate(7),
      totalTime: 1900,
    },
    {
      date: templateDate(8),
      totalTime: 1000,
    },
    {
      date: templateDate(9),
      totalTime: 700,
    },
    {
      date: templateDate(10),
      totalTime: 7000,
    },
    {
      date: templateDate(11),
      totalTime: 2800,
    },
  ],
  week: {
    pause: [],
    pomodoro: [],
    stop: [],
    total: [],
  },
  chosenWeek: 0,
  dateClickChart: '',
};

export const RootReducer: Reducer<RootState, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_LIST:
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            id: action.id,
            textTitle: action.textTitle,
            timer: action.timer,
            numberTimers: action.numberTimers,
            data: action.data,
            isBreak: action.isBreak,
          },
        ],
      };
    case UP_TIMER_TODO_LIST:
    case DOWN_TIMER_TODO_LIST:
    case UPDATE_TIMER_TODO_LIST:
    case STOP_TIMER_TODO_LIST:
    case RETURN_TIMER_TODO_LIST:
      return {
        ...state,
        todoList: [
          ...state.todoList.map((item) => {
            if (item.id === action.id) {
              return {
                id: action.id,
                textTitle: action.textTitle,
                timer: action.timer,
                numberTimers: action.numberTimers,
                data: action.data,
                isBreak: action.isBreak,
              };
            }
            return item;
          }),
        ],
      };
    case DELETE_TODO_LIST:
      return {
        ...state,
        todoList: [...state.todoList.filter((item) => item.id !== action.id)],
      };
    case UPDATE_TIMER_BREAK:
    case RETURN_COUNT_TIMER:
      return {
        ...state,
        timerBreak: action.timerBreak,
      };
    case UPDATE_COUNT_TIMER:
      return {
        ...state,
        countTimer: action.countTimer,
      };
    case ADD_PAUSE_TIMER:
      return {
        ...state,
        pauseTimer: [
          ...state.pauseTimer,
          {
            date: action.date,
            pauseTimer: action.pauseTimer,
          },
        ],
      };
    case UPDATE_PAUSE_TIMER:
      return {
        ...state,
        pauseTimer: [
          ...state.pauseTimer.map((item) => {
            if (item.date === action.date) {
              return {
                date: action.date,
                pauseTimer: action.pauseTimer,
              };
            }
            return item;
          }),
        ],
      };
    case ADD_STOP_TIMER:
      return {
        ...state,
        stopTimer: [
          ...state.stopTimer,
          {
            date: action.date,
            stopTimer: action.stopTimer,
          },
        ],
      };
    case UPDATE_STOP_TIMER:
      return {
        ...state,
        stopTimer: [
          ...state.stopTimer.map((item) => {
            if (item.date === action.date) {
              return {
                date: action.date,
                stopTimer: action.stopTimer,
              };
            }
            return item;
          }),
        ],
      };
    case ADD_POMODORO:
      return {
        ...state,
        countPomodoro: [
          ...state.countPomodoro,
          {
            date: action.date,
            countPomodoro: action.countPomodoro,
          },
        ],
      };
    case UPDATE_POMODORO:
      return {
        ...state,
        countPomodoro: [
          ...state.countPomodoro.map((item) => {
            if (item.date === action.date) {
              return {
                date: action.date,
                countPomodoro: action.countPomodoro,
              };
            }
            return item;
          }),
        ],
      };
    case ADD_TOTAL_TIME:
      return {
        ...state,
        totalTime: [
          ...state.totalTime,
          {
            date: action.date,
            totalTime: action.totalTime,
          },
        ],
      };
    case UPDATE_TOTAL_TIME:
      return {
        ...state,
        totalTime: [
          ...state.totalTime.map((item) => {
            if (item.date === action.date) {
              return {
                date: action.date,
                totalTime: action.totalTime,
              };
            }
            return item;
          }),
        ],
      };
    case UPDATE_CHOSEN_WEEK:
      return {
        ...state,
        chosenWeek: action.chosenWeek,
      };
    case UPDATE_WEEK:
      return {
        ...state,
        week: {
          pause: action.pause,
          pomodoro: action.pomodoro,
          stop: action.stop,
          total: action.total,
        },
      };
    case GET_DATE_CHART:
      return {
        ...state,
        dateClickChart: action.dateClickChart,
      };
    case UPDATE_PAUSE_TIMER_SHORT:
      return {
        ...state,
        timerBreak: action.timerBreak
      }
    default:
      return state;
  }
};
