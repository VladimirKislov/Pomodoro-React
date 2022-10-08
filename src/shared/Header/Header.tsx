import React from "react";
import styles from "./header.css";
import { Logo } from "./Logo";
import { DarkTheme } from "./DarkTheme";
import { Statistics } from "./Statistics";

export function Header() {
  return (
    <div className={styles.headerContainer}>
      <Logo />
      <DarkTheme />
      <Statistics />
    </div>
  );
}
