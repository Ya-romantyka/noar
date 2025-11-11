import React, { useRef } from 'react';
import styles from './Module-team.module.scss';
import clsx from 'clsx';
import CloseIcon from '@/app/assets/icons/close-icon.svg';
import { useCursorStyle } from '@/app/hooks/useCursorStyle';
interface Props {
  className?: string;
  role: string;
  name: string;
  text: string;
  description: string;
  description2: string;
  experience: string;
  location: string;
  img: string;
  onClose: () => void;
  open: boolean;
}
const ModuleTeam: React.FC<Props> = ({
  className,
  role,
  name,
  text,
  description,
  description2,
  experience,
  location,
  img,
  open,
  onClose,
}) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useCursorStyle({
    ref: blockRef,
    style: 'big',
  });

  useCursorStyle({
    ref: buttonRef,
    style: 'button',
  });

  return (
    <div
      className={clsx(styles.module, className, { [styles.active]: open })}
      data-lenis-prevent
      ref={blockRef}
    >
      <div className={styles.inner}>
        <button className={styles.close} onClick={onClose} ref={buttonRef}>
          <CloseIcon />
        </button>
        {img && (
          <picture className={styles.img}>
            <img src={img} alt="" />
          </picture>
        )}
        <div className={styles.info}>
          <span className={styles.label}>{role}</span>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.text}>{text}</p>

          <ul className={styles.list}>
            {description && <li>{description}</li>}
            {description2 && <li>{description2}</li>}
            <li>{experience}</li>
            <li>{location}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModuleTeam;
