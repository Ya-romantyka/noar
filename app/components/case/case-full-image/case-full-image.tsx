import styles from "./case-full-image.module.scss";
import Image from "next/image";

interface CaseFullImage {
  image: string;
}

const CaseHero: React.FC<CaseFullImage> = ({ image }) => {
  return (
    <picture className={styles.image} data-header-white>
      <Image src={image} alt="cover" fill sizes="100vw" priority />
    </picture>
  );
};

export default CaseHero;
