'use client';

import clsx from 'clsx';
import Container from '../../layout/container/container';
import styles from './case-specifics.module.scss';
import { useFont } from '@/app/hooks/useFont';

interface ColorItem {
  name: string;
  hex: string;
  textColor: 'black' | 'white';
  span?: number;
}

interface FontEntry {
  name: string;
  file?: string;
  author?: string;
  text?: string;
  list?: string[];
}

interface CaseSpecificsProps {
  title?: string;
  fonts: FontEntry[];
  colors: ColorItem[];
}

const CaseSpecifics: React.FC<CaseSpecificsProps> = ({
  title,
  fonts,
  colors,
}) => {
  useFont(fonts.map((f) => f.file ?? f.name));

  const ff = (f: FontEntry) =>
    `${f.file ?? f.name}, system-ui, -apple-system, "Segoe UI", Roboto, Arial`;

  const defaultRoles = ['Headlines — Bold', 'Bodytext — Regular'];
  const defaultSample =
    '“AcroStudio is a modern gym for children and their parents”';

  return (
    <section className={styles.section} data-header-white>
      <Container>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <span
              className={clsx(styles.label, [
                'section-label section-label--white',
              ])}
            >
              Specifics
            </span>
            <h2 className={styles.title}>
              {title ? title : 'Fonts and Colors'}
            </h2>
          </div>

          <ul className={styles.list}>
            {fonts.map((font, i) => (
              <li key={i}>
                <div className={styles.headerBottom}>
                  <div className={styles.col}>
                    <h3
                      className={styles.subtitle}
                      style={{ fontFamily: ff(font) }}
                    >
                      {font.name}
                    </h3>
                    {font.author && (
                      <p className={styles.text}>by {font.author}</p>
                    )}
                  </div>

                  <div className={styles.col}>
                    <h4
                      className={styles.titleCol}
                      style={{ fontFamily: ff(font) }}
                    >
                      Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss
                      Tt Uu Vv Ww Xx Yy Zz 0123456789 -&*@?!/+(:;;)
                    </h4>

                    <ul className={styles.fonts}>
                      {(font.list?.length ? font.list : defaultRoles).map(
                        (item, i) => (
                          <li key={`${font.name}-role-${i}`}>{item}</li>
                        ),
                      )}
                    </ul>
                  </div>

                  <div className={styles.col}>
                    <div className={styles.innerRow}>
                      <div className={styles.innerCol}>
                        <p className={styles.text}>Example:</p>
                        <h4
                          className={styles.titleCol}
                          style={{ fontFamily: ff(font) }}
                        >
                          {font.text || defaultSample}
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
              </li>
            ))}
          </ul>

          <ul className={styles.colors}>
            {colors.map((color) => (
              <li
                key={color.name}
                className={clsx(styles.colorItem, {
                  [styles.colorItemBlack]: color.textColor === 'black',
                  [styles.colorItemWhite]: color.textColor === 'white',
                })}
                style={{
                  backgroundColor: `#${color.hex}`,
                  color: color.textColor,
                  gridColumn: `span ${color.span}`,
                }}
              >
                <div className={styles.colorItemTitle}>{color.name}</div>
                <div className={styles.colorItemValue}>
                  <span>HEX:</span>
                  <span>{color.hex}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default CaseSpecifics;
