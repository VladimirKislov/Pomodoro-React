import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./dropdown.css";

interface PropsDropDown {
  children: React.ReactNode;
  onClose: () => void;
  coordinateTop?: number;
  coordinateRight?: number;
}

const NOOP = () => {};

export function DropDown({ children, onClose = NOOP, coordinateTop, coordinateRight }: PropsDropDown) {
  const dropdown = document.querySelector("#dropdown");
  if (!dropdown) return null;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handelClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        onClose?.();
      }
    }

    document.addEventListener("click", handelClick);
    return () => {
      document.removeEventListener("click", handelClick);
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={styles.container} ref={ref} style={{ top: coordinateTop, right: coordinateRight }}>
      <div className={styles.listContainer}>
        <div className={styles.list}>{children}</div>
      </div>
    </div>,
    dropdown
  );
}
