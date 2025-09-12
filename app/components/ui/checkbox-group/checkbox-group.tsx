"use client";

import React from "react";
import { Field, ErrorMessage } from "formik";
import styles from "./checkbox-group.module.scss";
import Magnetic from "../magnetic/magnetic";
import { useCursorStyle } from "@/app/hooks/useCursorStyle";

type Props = {
    label: string;
    name: string;
    options: string[];
};

export const CheckboxGroup: React.FC<Props> = ({ label, name, options }) => {
    return (
        <div className={styles.row}>
            <div className={styles.label}>
                {label}
                <ErrorMessage name={name} component="div" className={styles.errorMessage} />
            </div>
            <ul className={styles.list}>
                {options.map((option) => (
                    <CheckboxItem key={option} name={name} option={option} />
                ))}
            </ul>
        </div>
    );
};

const CheckboxItem: React.FC<{ name: string; option: string }> = ({ name, option }) => {
    const liRef = useCursorStyle({
        style: "button",
    }) as React.RefObject<HTMLLIElement>;

    return (
        <li ref={liRef} className={styles.item}>
            <Magnetic strength={40}>
                <label className={styles.radio}>
                    <Field
                        type="checkbox"
                        name={name}
                        value={option}
                        className={styles.radioInput}
                    />
                    <span className={styles.radioText}>{option}</span>
                </label>
            </Magnetic>
        </li>
    );
};
