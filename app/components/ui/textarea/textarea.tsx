"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./textarea.module.scss";

export const TextArea: React.FC<{
  label: string;
  name: string;
  placeholder: string;
}> = ({ label, name, placeholder }) => (
  <div className={styles.field}>
    <div className={styles.label}>{label} <ErrorMessage name={name} component="div" className={styles.errorMessage} /></div>
    <Field
      as="textarea"
      name={name}
      placeholder={placeholder}
      className={styles.textarea}
    />

  </div>
);
