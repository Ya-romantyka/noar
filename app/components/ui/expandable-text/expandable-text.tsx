'use client';

import { ReactNode, useRef, useState } from 'react';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import clsx from 'clsx';
import styles from './expandable-text.module.scss';
import Button from '@/app/components/ui/button/button';
import ButtonIcon from '@/app/assets/icons/button-icon.svg';
import ModuleMission from '@/app/components/module/module-mission/Module-mission';
import missionStyles from '@/app/components/module/module-mission/Module-mission.module.scss';

type TAnimationDuration = {
  mobile: string;
  desktop: string;
};
interface IPopup {
  title: string;
  label?: string;
  text: string | ReactNode;
}
interface ExpandableTextProps {
  children: ReactNode;
  popup: IPopup;
  animationDuration?: TAnimationDuration;
  staticPreview?: boolean;
}

export default function ExpandableText({
  children,
  popup,
  animationDuration,
  staticPreview = false,
}: ExpandableTextProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const textRef = useRef<HTMLDivElement | null>(null);

  const open = () => {
    setIsOpen(true);
    window.__lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    setIsOpen(false);
    window.__lenis?.start();
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  };

  return (
    <div
      className={clsx(styles.expandable, {
        [styles.staticPreview]: staticPreview,
      })}
    >
      <div className={styles.body}>
        <div ref={textRef} className={styles.text}>
          <span
            style={
              animationDuration
                ? {
                    animationDuration: isMobile
                      ? animationDuration?.mobile
                      : animationDuration?.desktop,
                  }
                : {}
            }
          >
            {children}
          </span>
          {!staticPreview && (
            <span
              style={
                animationDuration
                  ? {
                      animationDuration: isMobile
                        ? animationDuration?.mobile
                        : animationDuration?.desktop,
                    }
                  : {}
              }
            >
              {children}
            </span>
          )}
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          variant="outline-white"
          onClick={open}
          className={styles.button}
        >
          <ButtonIcon />
          learn more
        </Button>
      </div>

      <ModuleMission
        title={popup.title}
        label={popup.label}
        className={staticPreview ? missionStyles.plain : undefined}
        text={popup.text}
        open={isOpen}
        onClose={close}
      />
    </div>
  );
}
