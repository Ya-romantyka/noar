import React from 'react';
import styles from './Module-team.module.scss'
import clsx from "clsx";
import CloseIcon  from '@/app/assets/icons/close-icon.svg'
interface Props {
    className?: string;
    role: string;
    name: string;
    text: string;
    description: string;
    experience: string;
    location: string;
    img: string;
    onClose: () => void;
    open: boolean;
}
const ModuleTeam:React.FC<Props> = ({className, role, name, text, description, experience, location, img, open, onClose}) => {
    return (
        <div className={clsx(styles.module, className, {[styles.active]: open })} data-lenis-prevent>
            <div className={styles.inner}>
                <button className={styles.close}  onClick={onClose}>
                    <CloseIcon/>
                </button>
                {img && (
                    <picture className={styles.img}>
                        <img src={img} alt=""/>
                    </picture>
                )}
                <div className={styles.info}>
                    <span className={styles.label}>{role}</span>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.text}>{text}</p>

                    <ul className={styles.list}>
                        <li>
                            {description}
                        </li>
                        <li>
                            {location}
                        </li>
                        <li>
                            {experience}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ModuleTeam;