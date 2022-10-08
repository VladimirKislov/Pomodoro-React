import React, { useEffect, useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import styles from "./headerstatistics.css";
import { useDispatch } from "react-redux";
import { updateStatisticChosenWeek } from "../../../store/StatisticsTimerAction/StatisticsTimerAction";

export function HeaderStatistics() {
  const dispatch = useDispatch();
  const options = ["This week", "Last week", "2 weeks ago"];
  const [select, setSelect] = useState("This week");
  const [arrayValues, setArrayValues] = useState(options);

  useEffect(() => {
    const newArr = options.filter((item) => {
      if (item !== select) {
        return item;
      }
    });
    setArrayValues(newArr);

    if (select === "This week") {
      dispatch(updateStatisticChosenWeek(0));
    } else if (select === "Last week") {
      dispatch(updateStatisticChosenWeek(1));
    } else if (select === "2 weeks ago") {
      dispatch(updateStatisticChosenWeek(2));
    }
  }, [select]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Activity</h2>
      <Multiselect
        className="selector"
        isObject={false}
        onSelect={(event) => {
          setSelect(event[0]);
        }}
        options={arrayValues}
        selectedValues={[select]}
        singleSelect
      />
    </div>
  );
}
