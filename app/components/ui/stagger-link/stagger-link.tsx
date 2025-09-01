"use client";

import React, { useRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import styles from "./stagger-link.module.scss";
import { useCursorStyle } from "@/app/hooks/useCursorStyle";

interface StaggerLinkProps {
  children: string;
  href: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  target?: "_blank" | "_self";
}

const StaggerLink: React.FC<StaggerLinkProps> = ({
                                                   children,
                                                   href,
                                                   onClick,
                                                   target,
                                                   className,
                                                 }) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useCursorStyle({
    ref: linkRef,
    style: "button",
  });

  if (target === "_blank") {
    return (
        <a
            ref={linkRef}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClick}
            className={clsx(styles.link, className)}
        >
          <span className={styles.text}>{children}</span>
        </a>
    );
  }

  return (
      <Link
          ref={linkRef}
          href={href}
          onClick={onClick}
          className={clsx(styles.link, className)}
      >
        <span className={styles.text}>{children}</span>
      </Link>
  );
};

export default StaggerLink;
