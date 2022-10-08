import React from "react";
import { Layout } from "../Layout/Layout";
import { UsePomodoroInfo } from "./DaysUseStatistics";
import { HeaderStatistics } from "./HeaderStatistics";
import styles from "./statisticsPage.css";

export function StatisticsPage() {
  return (
    <div className={styles.container}>
      <Layout>
        <HeaderStatistics />
        <UsePomodoroInfo />
      </Layout>
    </div>
  );
}
