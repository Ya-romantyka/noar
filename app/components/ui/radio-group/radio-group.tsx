"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./radio-group.module.scss";
import Magnetic from "../magnetic/magnetic";

export const RadioGroup: React.FC<{
  label: string;
  name: string;
  options: string[];
}> = ({ label, name, options }) => (
  <div className={styles.row}>
    <div className={styles.label}>{label}</div>
    <ul className={styles.list}>
      {options.map((option) => (
        <li key={option} className={styles.item}>
          <Magnetic strength={40}>
            <label className={styles.radio}>
              <Field
                type="radio"
                name={name}
                value={option}
                className={styles.radioInput}
              />
              <span className={styles.radioText}>{option}</span>
            </label>
          </Magnetic>
        </li>
      ))}
    </ul>
    <ErrorMessage name={name} component="div" className={styles.errorMessage} />
  </div>
);
