import React from "react";
import { Link } from "react-router-dom";
import { StatisticsIcon } from "../../Icons";
import styles from "./statistics.css";

export function Statistics() {
  return (
    <Link to="/statistic" className={styles.link}>
      <StatisticsIcon />
      <h4 className={styles.title}>Statistics</h4>
    </Link>
  );
}
