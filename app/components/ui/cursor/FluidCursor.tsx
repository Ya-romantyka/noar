'use client';
import { useEffect } from 'react';
import fluidCursor from "@/app/hooks/useFluidCursor";
import styles from './FluidCursor.module.scss'


const FluidCursor = () => {
    useEffect(() => {
        fluidCursor();
    }, []);

    return (
        <div className={styles.cursor}>
            <canvas id='fluid' className={styles.canvas} />
        </div>
    );
};
export default FluidCursor;
