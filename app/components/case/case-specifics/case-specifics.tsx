import clsx from "clsx";
import Container from "../../layout/container/container";
import styles from "./case-specifics.module.scss";

interface ColorItem {
  name: string;
  hex: string;
  textColor: "black" | "white";
}

interface CaseSpecifics {
  fontName: string;
  fontAuthor: string;
  colors: ColorItem[];
}

const CaseSpecifics:React.FC<CaseSpecifics> = ({
  fontName,
  fontAuthor,
  colors,
}) => {
  return (
    <section className={styles.section} data-header-white>
      <Container>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <span
              className={clsx(styles.label, [
                "section-label section-label--white",
              ])}
            >
              Specifics
            </span>
            <h2 className={styles.title}>Fonts and Colors</h2>
          </div>

          <div className={styles.headerBottom}>
            <div className={styles.col}>
              <h3 className={styles.subtitle}>{fontName}</h3>
              <p className={styles.text}>
                by {fontAuthor}
              </p>
            </div>
            <div className={styles.col}>
              <h4 className={styles.titleCol}>
                Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu
                Vv Ww Xx Yy Zz 0123456789 -&*@?!/+(:;;)
              </h4>

              <ul className={styles.fonts}>
                <li>Headlines - Bold</li>
                <li>Bodytext - Regular</li>
              </ul>
            </div>
            <div className={styles.col}>
              <div className={styles.innerRow}>
                <div className={styles.innerCol}>
                  <p className={styles.text}>Example:</p>
                  <h4 className={styles.titleCol}>
                    “AcroStudio is a modern gym for children and their parents”
                  </h4>
                </div>
                <div className={styles.innerCol}>
                  <ul className={styles.symbols}>
                    <li></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ul className={styles.colors}>
          {colors.map((color) => (
            <li
              key={color.name}
              className={clsx(styles.colorItem, {
                [styles.colorItemBlack]: color.textColor === "black",
                [styles.colorItemWhite]: color.textColor === "white",
              })}
              style={{ backgroundColor: `#${color.hex}`, color: color.textColor }}
            >
              <div className={styles.colorItemTitle}>{color.name}</div>
              <div className={styles.colorItemValue}>
                <span>HEX:</span>
                <span>{color.hex}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default CaseSpecifics;
