import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteTodoList, downTimerTodoList, upTimerTodoList } from "../../../../store/ToDo/ToDoAction";
import { DropDown } from "../../../DropDown";
import styles from "./listitem.css";

interface PropsListItem {
  id: string;
  title: string;
  timer: number;
  count: number;
  numberTimers: number;
}

export function ListItem({ id, title, timer, count, numberTimers }: PropsListItem) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [coordinateTop, setCoordinateTop] = useState();
  const [coordinateRight, setCoordinateRight] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    function handleClick(element: any) {
      setCoordinateTop(element.target.getBoundingClientRect().bottom + window.scrollY);
      setCoordinateRight(element.target.getBoundingClientRect().left + window.scrollX);
    }

    document.addEventListener("click", (element) => {
      return handleClick(element);
    });

    return () => {
      document.addEventListener("click", (element) => {
        return handleClick(element);
      });
    };
  }, [isDropdownOpen]);

  const onClick = () => {
    setIsDropdownOpen(true);
  };

  const onClickUp = () => {
    dispatch(upTimerTodoList(id, title, timer, numberTimers + 1));
  };

  const onClickDown = () => {
    dispatch(downTimerTodoList(id, title, timer, numberTimers - 1));
  };

  const onClickDelete = () => {
    dispatch(DeleteTodoList(id));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span className={styles.count}>{count}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <button className={styles.dropdown} onClick={onClick} data-id={id}>
        <svg width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="3" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="13" cy="3" r="3" fill="#C4C4C4" />
          <circle cx="23" cy="3" r="3" fill="#C4C4C4" />
        </svg>
      </button>
      {isDropdownOpen && (
        <DropDown
          coordinateTop={coordinateTop}
          coordinateRight={coordinateRight}
          onClose={() => {
            setIsDropdownOpen(false);
          }}
        >
          <div className={styles.dropdownContainer}>
            <div className={styles.div}></div>
            <button className={styles.btn} onClick={onClickUp}>
              <svg
                className={styles.icon}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75 4.25H7.25V7.25H4.25V8.75H7.25V11.75H8.75V8.75H11.75V7.25H8.75V4.25ZM8 0.5C3.8675 0.5 0.5 3.8675 0.5 8C0.5 12.1325 3.8675 15.5 8 15.5C12.1325 15.5 15.5 12.1325 15.5 8C15.5 3.8675 12.1325 0.5 8 0.5ZM8 14C4.6925 14 2 11.3075 2 8C2 4.6925 4.6925 2 8 2C11.3075 2 14 4.6925 14 8C14 11.3075 11.3075 14 8 14Z"
                  fill="#A8B64F"
                />
              </svg>
              <p>Increase</p>
            </button>
            <button className={styles.btn} onClick={onClickDown}>
              <svg
                className={styles.icon}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 1.5C4.8675 1.5 1.5 4.8675 1.5 9C1.5 13.1325 4.8675 16.5 9 16.5C13.1325 16.5 16.5 13.1325 16.5 9C16.5 4.8675 13.1325 1.5 9 1.5ZM9 15C5.6925 15 3 12.3075 3 9C3 5.6925 5.6925 3 9 3C12.3075 3 15 5.6925 15 9C15 12.3075 12.3075 15 9 15Z"
                  fill="#A8B64F"
                />
                <path d="M5.25 8.25H8.25H9.75H12.75V9.75H9.75H8.25H5.25V8.25Z" fill="#A8B64F" />
              </svg>
              <p>Decrease</p>
            </button>
            <button className={styles.btn}>
              <svg
                className={styles.icon}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.545 6.765L11.235 7.455L4.44 14.25H3.75V13.56L10.545 6.765ZM13.245 2.25C13.0575 2.25 12.8625 2.325 12.72 2.4675L11.3475 3.84L14.16 6.6525L15.5325 5.28C15.825 4.9875 15.825 4.515 15.5325 4.2225L13.7775 2.4675C13.6275 2.3175 13.44 2.25 13.245 2.25ZM10.545 4.6425L2.25 12.9375V15.75H5.0625L13.3575 7.455L10.545 4.6425Z"
                  fill="#A8B64F"
                />
              </svg>
              <p>Редактировать</p>
            </button>
            <button className={styles.btn} onClick={onClickDelete}>
              <svg
                className={styles.icon}
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 6.75V14.25H6V6.75H12ZM10.875 2.25H7.125L6.375 3H3.75V4.5H14.25V3H11.625L10.875 2.25ZM13.5 5.25H4.5V14.25C4.5 15.075 5.175 15.75 6 15.75H12C12.825 15.75 13.5 15.075 13.5 14.25V5.25Z"
                  fill="#A8B64F"
                />
              </svg>
              <p>Удалить</p>
            </button>
          </div>
        </DropDown>
      )}
    </div>
  );
}
