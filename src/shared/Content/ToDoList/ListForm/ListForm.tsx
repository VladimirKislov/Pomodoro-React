import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addToDoList } from "../../../../store/ToDo/ToDoAction";
import styles from "./listform.css";

export function ListForm() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (value !== "") {
      dispatch(addToDoList(value));
      setValue("");
    }
  };

  return (
    <form action="" className={styles.form} onSubmit={onSubmit}>
      <input className={styles.input} type="text" value={value} onChange={onChange} placeholder="Task name" />
      <button className={styles.btn}>Add</button>
    </form>
  );
}
