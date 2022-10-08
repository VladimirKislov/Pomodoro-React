import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { sortWeek } from "../../utils/sortWeek";
import styles from "./chart.css";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { getWeekDay } from "../../utils/getWeekDay";
import { useDispatch } from "react-redux";
import { getDateClickChart } from "../../store/StatisticsTimerAction/StatisticsTimerAction";

export function Chart() {
  sortWeek();
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const dispatch = useDispatch();
  const getWeekAction = useSelector<RootState, any>((state) => state.week);
  const chosenWeek = useSelector<RootState, any>((state) => state.chosenWeek);
  const chartRef = useRef<any>(null);
  const [defaultData, setDefaultData] = useState<any>([0, 0, 0, 0, 0, 0, 0]);
  const [indexDate, setIndexDate] = useState<string>("");
  const date = new Date();
  const day = getWeekDay(date);
  let week: Array<any> = [];

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        left: 55,
        right: 105,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        min: 0,
        max: 7000,
      },
    },
  };

  const labels = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

  useEffect(() => {
    if (chosenWeek === 0) {
      const arr = getWeekAction.total.map((item: any) => item.totalTime);
      if (arr.length > 0) {
        setDefaultData(arr);
      }
    } else if (chosenWeek === 1 || chosenWeek === 2) {
      if (getWeekAction.total.length < 6) {
        const arr = getWeekAction.total.map((item: any, index: any) => {
          return item.totalTime;
        });
        if (arr.length < 7) {
          for (let i = arr.length; i < 7; i++) {
            arr.unshift(0);
          }
        }
        setDefaultData(arr);
      } else {
        const arr = getWeekAction.total.map((item: any, index: any) => {
          return item.totalTime;
        });
        setDefaultData(arr);
      }
    }
  }, [getWeekAction]);

  useEffect(() => {
    if (chosenWeek === 0) {
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
    } else if (chosenWeek === 1) {
      const lastWeek = date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * day);
      week.push(new Date(lastWeek).toJSON().slice(0, 10).split("-").join("."));
      for (let i = 1; i < 7; i++) {
        week.push(new Date(lastWeek - 24 * 60 * 60 * 1000 * i).toJSON().slice(0, 10).split("-").join("."));
      }
    } else if (chosenWeek === 2) {
      const twoWeek = date.setTime(date.getTime() - 24 * 60 * 60 * 1000 * (day + 7));
      week.push(new Date(twoWeek).toJSON().slice(0, 10).split("-").join("."));
      for (let i = 1; i < 7; i++) {
        week.push(new Date(twoWeek - 24 * 60 * 60 * 1000 * i).toJSON().slice(0, 10).split("-").join("."));
      }
    }
  }, [chosenWeek, week]);

  useEffect(() => {
    dispatch(getDateClickChart(indexDate));
  }, [indexDate]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const element = getElementAtEvent(chartRef.current, event);
    if (element.length > 0) {
      const numIndex: number = element[0].index;
      setIndexDate(week.reverse()[numIndex]);
    }
  };

  return (
    <div className={styles.container}>
      <Bar
        ref={chartRef}
        options={options}
        data={{
          labels,
          datasets: [
            {
              label: "",
              data: defaultData,
              backgroundColor: "#EA8A79",
            },
          ],
        }}
        onClick={(event) => {
          handleClick(event);
        }}
      />
    </div>
  );
}
