import Marquee from "react-fast-marquee";
import styles from "./footer-marquee.module.scss";

const MarqueeComponent = () => {
  return (
    <Marquee speed={50} gradient={false}>
      <span className={styles.marqueeText}>LET’S CONNECT</span>
      <span className={styles.marqueeCircle}></span>
      <span className={styles.marqueeText}>LET’S CONNECT</span>
      <span className={styles.marqueeCircle}></span>
    </Marquee>
  );
};

export default MarqueeComponent;
