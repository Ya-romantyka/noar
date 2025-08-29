"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./input.module.scss";

export const Input: React.FC<{
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}> = ({ label, name, placeholder, type = "text" }) => (
  <div className={styles.field}>
    <div className={styles.label}>{label}     <ErrorMessage name={name} component="div" className={styles.errorMessage} />
    </div>
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className={styles.input}
    />
  </div>
);
