import React from "react";
import clsx from "clsx";
import styles from "./label.module.scss";

interface LabelProps {
  children: React.ReactNode;
  color?: "black" | "white";
  className?: string;
}

const Label: React.FC<LabelProps> = ({ children, color = "black", className = "" }) => {
  return (
    <span
      className={clsx(
        styles.label, 
        styles[color],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Label;