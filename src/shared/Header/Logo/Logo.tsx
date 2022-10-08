import React from "react";
import { LogoIcon } from "../../Icons";
import styles from "./logo.css";

export function Logo() {
  return (
    <a href="#" className={styles.link}>
      <LogoIcon />
      <h4 className={styles.title}>pomodoro_box</h4>
    </a>
  );
}
