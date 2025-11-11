import React from 'react';
import Image from 'next/image';
import styles from './team-card.module.scss';
import Button from '../../ui/button/button';
import ButtonIcon from '@/app/assets/icons/button-icon.svg';

interface TeamCardProps {
  name: string;
  role: string;
  description: string;
  description2: string;
  location: string;
  image: string;
  moduleImg: string;
  experience: string;
  children?: React.ReactNode;
  onOpen: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  name,
  role,
  location,
  image,
  children,
  experience,
  onOpen,
}) => {
  return (
    <div className={styles.card} onClick={onOpen}>
      <div className={styles.inner}>
        <picture className={styles.img}>
          <Image src={image} alt={name} fill objectFit="cover" />
        </picture>
        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <ul className={styles.list}>
            <li>{role}</li>
            <li>{experience}</li>
            <li>{location}</li>
          </ul>
        </div>
        <Button variant="outline-white">
          <ButtonIcon />
          Learn more
        </Button>
      </div>

      {children}
    </div>
  );
};

export default TeamCard;
