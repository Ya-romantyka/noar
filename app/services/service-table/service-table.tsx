'use client';

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './service-table.module.scss';
import clsx from 'clsx';
import Container from '@/app/components/layout/container/container';

import ButtonIcon from '@/public/images/button_icon.svg';
import Button from '@/app/components/ui/button/button';

interface TableData {
  strategies: {
    title: string | ReactNode;
    subtitle: string;
    distance: {
      mobile: number;
      desktop: number;
    };
  }[];
  designs: {
    title: string | ReactNode;
    subtitle: string;
    distance: {
      mobile: number;
      desktop: number;
    };
  }[];
  developments: {
    title: string | ReactNode;
    subtitle: string;
    distance: {
      mobile: number;
      desktop: number;
    };
  }[];
  additions: {
    title: string | ReactNode;
    subtitle: string;
    distance: {
      mobile: number;
      desktop: number;
    };
  }[];
  week: number;
  name: string;
  price: string;
}

// const buttons: string[] = [
//     "Brandbook",
//     "Landing page",
//     "Website",
//     "Web-app",
//     "2D/3D motion",
//     "Photo Production",
//     "Video Production",
//     "Development",
//     "Post-production",
// ];

const tablesData: Record<string, TableData> = {
  table_1: {
    name: 'Landing',
    price: '10k',
    week: 4,
    strategies: [
      {
        title: <span style={{ padding: '0 20px' }}>Briefing</span>,
        subtitle: 'Every big project starts with a well-thought-out task',
        distance: {
          desktop: 2.4,
          mobile: 1.6,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>Pricing</span>,
        subtitle:
          'Time and cost estimates can be calculated in several stages if the project is large.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'Solutions & Requirements',
        subtitle:
          'Here we understand what parts and stages the project consists of. And we are ready to turn theory into practice.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
    ],
    designs: [
      {
        title: <span style={{ padding: '0 20px' }}>Mood board</span>,
        subtitle:
          'It is very useful to ensure that you get exactly what you want.',
        distance: {
          desktop: 78,
          mobile: 10,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>UX/UI Design</span>,
        subtitle: 'We usually agree on two stages: structure and appearance.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>Responsive</span>,
        subtitle:
          'The design will be adapted for mobile, desktop, tablet and widescreen devices.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
    ],
    developments: [
      {
        title: <span style={{ padding: '0 20px' }}>Frontend</span>,
        subtitle: 'From no-code to highly optimised programmable solutions.',
        distance: {
          desktop: 139,
          mobile: 30,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>Quality Analysis</span>,
        subtitle: 'The final stage where your project becomes flawless.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
    ],
    additions: [
      {
        title: 'Animations / Graphics',
        subtitle:
          'We create graphics, animations, and 3D models to make your project perfect.',
        distance: {
          desktop: 99,
          mobile: 6,
        },
      },
    ],
  },
  table_2: {
    name: 'Website',
    price: '20k',
    week: 4,
    strategies: [
      {
        title: 'Briefing',
        subtitle: '',
        distance: {
          desktop: 6,
          mobile: 1.6,
        },
      },
      {
        title: 'Pricing',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>Research</span>,
        subtitle:
          'In-depth market research allows you to combine beauty with business goals.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'Solutions & Requirements',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
    ],
    designs: [
      {
        title: 'Mood board',
        subtitle: '',
        distance: {
          desktop: 69,
          mobile: 20,
        },
      },
      {
        title: 'Identity improvement',
        subtitle:
          'To ensure that the brand works seamlessly across the digital space',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'UX/UI Design',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'Responsive',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
    ],
    developments: [
      {
        title: 'Technical Requirements',
        subtitle:
          'It is important to select additional technologies in advance or avoid unnecessary complications.',
        distance: {
          desktop: 93,
          mobile: 15,
        },
      },
      {
        title: 'Frontend ',
        subtitle: '',
        distance: {
          desktop: 12.4,
          mobile: 0.8,
        },
      },
      {
        title: <span style={{ padding: '0 25px' }}>Backend</span>,
        subtitle:
          'Django, Laravel, or custom solutions for optimised and fast product performance.',
        distance: {
          desktop: 2.4,
          mobile: 8,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>CMS Setup</span>,
        subtitle:
          'WordPress, Directus, Laravel, Django, and custom systems tailored to your needs.',
        distance: {
          desktop: 2.4,
          mobile: 2,
        },
      },
      {
        title: 'Quality Analysis',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 5,
        },
      },
    ],
    additions: [
      {
        title: 'Animations / Graphics',
        subtitle: '',
        distance: {
          desktop: 93,
          mobile: 40,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>Content Creation</span>,
        subtitle:
          'We will help you create content from scratch and adapt it to creative tasks or SEO.',
        distance: {
          desktop: 25,
          mobile: 5,
        },
      },
    ],
  },
  table_3: {
    name: 'Web-App',
    price: '20k',
    week: 4,
    strategies: [
      {
        title: 'Briefing',
        subtitle: '',
        distance: {
          desktop: 6,
          mobile: 1.6,
        },
      },
      {
        title: 'Research',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'CJM & Empathy map',
        subtitle:
          'In order to give your customers what they need, we must understand them.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'Solutions & Requirements',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'Pricing',
        subtitle: '',
        distance: {
          desktop: 30,
          mobile: 0.8,
        },
      },
    ],
    designs: [
      {
        title: 'Mood board',
        subtitle: '',
        distance: {
          desktop: 80,
          mobile: 20,
        },
      },
      {
        title: 'Identity improvement',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: <span style={{ padding: '0 20px' }}>Prototyping & UX</span>,
        subtitle:
          'This will highlight all the dark areas and help to avoid mistakes in planning and implementation.',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'User flow',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'UI Design',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'Responsive',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
    ],
    developments: [
      {
        title: 'Technical Requirements',
        subtitle: '',
        distance: {
          desktop: 153,
          mobile: 15,
        },
      },
      {
        title: 'Frontend ',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 0.8,
        },
      },
      {
        title: 'Backend',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 8,
        },
      },
      {
        title: 'Admin Panel Setup',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 2,
        },
      },
      {
        title: <span style={{ padding: '0 30px' }}>Hosting setup</span>,
        subtitle:
          'Stress tests, query optimisation, and ensuring fast, uninterrupted operation.',
        distance: {
          desktop: 2.4,
          mobile: 5,
        },
      },
      {
        title: 'Quality Analysis',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 40,
        },
      },
    ],
    additions: [
      {
        title: <span style={{ padding: '0 20px' }}>Content concept</span>,
        subtitle:
          'requirements and tasks based on ToV, creative, technical, and business requirements.',
        distance: {
          desktop: 103,
          mobile: 40,
        },
      },
      {
        title: 'Animations / Graphics',
        subtitle: '',
        distance: {
          desktop: 2.4,
          mobile: 5,
        },
      },
      {
        title: 'Content Creation',
        subtitle: '',
        distance: {
          desktop: 48,
          mobile: 5,
        },
      },
    ],
  },
};

const ServiceTable: React.FC = () => {
  const tablesArray: TableData[] = Object.values(tablesData);

  const [activeTableIndex, setActiveTableIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [animatedPrice, setAnimatedPrice] = useState<string>(
    tablesArray[0].price,
  );
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);

  const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);

  const activeTable = tablesArray[activeTableIndex];

  const changeTable = (index: number) => {
    if (index === activeTableIndex || isFading) return;

    setIsFading(true);

    const prevValue = parseInt(tablesArray[activeTableIndex].price);
    const nextValue = parseInt(tablesArray[index].price);

    const duration = 600;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const animatedValue = Math.floor(
        prevValue + progress * (nextValue - prevValue),
      );
      setAnimatedPrice(`${animatedValue}k`);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedPrice(tablesArray[index].price);
      }
    };

    requestAnimationFrame(animate);

    setTimeout(() => {
      setActiveTableIndex(index);
      tableBodyRef.current?.scrollTo({ left: 0 });
      setTimeout(() => setIsFading(false), 300);
    }, 300);
  };

  const handleMouseDownBody = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tableBodyRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - tableBodyRef.current.offsetLeft);
    setScrollLeft(tableBodyRef.current.scrollLeft);
  };

  const handleMouseLeaveBody = () => {
    setIsDragging(false);
  };

  const handleMouseUpBody = () => {
    setIsDragging(false);
  };

  const handleMouseMoveBody = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !tableBodyRef.current) return;
    e.preventDefault();
    const x = e.pageX - tableBodyRef.current.offsetLeft;
    const walk = x - startX;
    tableBodyRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getRowWidth = () => {
    const blocks = activeTable.week * 2;
    const blockWidth = isMobile ? 12.4 : 36.8;
    return `${blocks * blockWidth}rem`;
  };

  const handleNextTable = () => {
    const nextIndex = (activeTableIndex + 1) % tablesArray.length;

    changeTable(nextIndex);

    setTimeout(() => {
      tableBodyRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
    }, 0);
  };

  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <div className={styles.top}>
            <span
              className={`${styles.label} section-label section-label--black`}
            >
              Selection
            </span>
            <div className={styles.priceWrapper}>
              <span className={styles.priceText}>From</span>
              <h2 className={styles.price}>{animatedPrice}</h2>
            </div>
          </div>
          <ul className={styles.listButtons}>
            {tablesArray.map((table, index) => (
              <li key={index} className={styles.button}>
                <Button
                  className={`${styles.white} ${
                    activeTableIndex === index ? styles.active : ''
                  }`}
                  onClick={() => changeTable(index)}
                  variant={'white'}
                >
                  {table.name}
                </Button>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHeader}>
              <tr>
                <th className={styles.tableTitle}>
                  <span>Strategy</span>
                </th>
                <th className={styles.tableTitle}>
                  <span>Designs</span>
                </th>
                <th className={styles.tableTitle}>
                  <span>Development</span>
                </th>
                <th className={styles.tableTitle}>
                  <span>Additional</span>
                </th>
              </tr>
            </thead>
            <tbody
              className={`${styles.tableBody} ${isFading ? styles.fading : ''}`}
              ref={tableBodyRef}
              onMouseDown={handleMouseDownBody}
              onMouseLeave={handleMouseLeaveBody}
              onMouseUp={handleMouseUpBody}
              onMouseMove={handleMouseMoveBody}
            >
              {activeTable && (
                <tr>
                  <td className={styles.row} style={{ width: getRowWidth() }}>
                    <div className={styles.grid}>
                      {Array.from({ length: activeTable.week * 2 }).map(
                        (_, i) => (
                          <li key={i}></li>
                        ),
                      )}
                    </div>

                    <ul className={styles.list}>
                      {activeTable.strategies.map((item, index) => {
                        const distance = item.distance
                          ? isMobile
                            ? item.distance.mobile
                            : item.distance.desktop
                          : 0;

                        return (
                          <li
                            key={index}
                            className={clsx(styles.item, {
                              [styles.noFlip]: !item.subtitle,
                            })}
                            style={{ marginLeft: `${distance}rem` }}
                          >
                            <span className={styles.widthBlock}>
                              {item.title}
                            </span>

                            <div className={styles.flipContainer}>
                              <div className={styles.card}>
                                <div className={styles.front}>
                                  <span className={styles.itemTitle}>
                                    {item.title}
                                  </span>
                                </div>
                                <div className={styles.back}>
                                  <span className={styles.itemSubtitle}>
                                    {item.subtitle}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className={styles.row} style={{ width: getRowWidth() }}>
                    <div className={styles.grid}>
                      {Array.from({ length: activeTable.week * 2 }).map(
                        (_, i) => (
                          <li key={i}></li>
                        ),
                      )}
                    </div>

                    <ul className={styles.list}>
                      {activeTable.designs.map((item, index) => {
                        const distance = item.distance
                          ? isMobile
                            ? item.distance.mobile
                            : item.distance.desktop
                          : 0;

                        return (
                          <li
                            key={index}
                            className={clsx(styles.item, {
                              [styles.noFlip]: !item.subtitle,
                            })}
                            style={{ marginLeft: `${distance}rem` }}
                          >
                            <span className={styles.widthBlock}>
                              {item.title}
                            </span>
                            <div className={styles.flipContainer}>
                              <div className={styles.card}>
                                <div className={styles.front}>
                                  <span className={styles.itemTitle}>
                                    {item.title}
                                  </span>
                                </div>
                                <div className={styles.back}>
                                  <span className={styles.itemSubtitle}>
                                    {item.subtitle}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className={styles.row} style={{ width: getRowWidth() }}>
                    <div className={styles.grid}>
                      {Array.from({ length: activeTable.week * 2 }).map(
                        (_, i) => (
                          <li key={i}></li>
                        ),
                      )}
                    </div>
                    <ul className={styles.list}>
                      {activeTable.developments.map((item, index) => {
                        const distance = item.distance
                          ? isMobile
                            ? item.distance.mobile
                            : item.distance.desktop
                          : 0;

                        return (
                          <li
                            key={index}
                            className={clsx(styles.item, {
                              [styles.noFlip]: !item.subtitle,
                            })}
                            style={{ marginLeft: `${distance}rem` }}
                          >
                            <span className={styles.widthBlock}>
                              {item.title}
                            </span>
                            <div className={styles.flipContainer}>
                              <div className={styles.card}>
                                <div className={styles.front}>
                                  <span className={styles.itemTitle}>
                                    {item.title}
                                  </span>
                                </div>
                                <div className={styles.back}>
                                  <span className={styles.itemSubtitle}>
                                    {item.subtitle}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                  <td className={styles.row} style={{ width: getRowWidth() }}>
                    <div className={styles.grid}>
                      {Array.from({ length: activeTable.week * 2 }).map(
                        (_, i) => (
                          <li key={i}></li>
                        ),
                      )}
                    </div>

                    <ul className={styles.list}>
                      {activeTable.additions.map((item, index) => {
                        const distance = item.distance
                          ? isMobile
                            ? item.distance.mobile
                            : item.distance.desktop
                          : 0;

                        return (
                          <li
                            key={index}
                            className={clsx(styles.item, {
                              [styles.noFlip]: !item.subtitle,
                            })}
                            style={{ marginLeft: `${distance}rem` }}
                          >
                            <span className={styles.widthBlock}>
                              {item.title}
                            </span>
                            <div className={styles.flipContainer}>
                              <div className={styles.card}>
                                <div className={styles.front}>
                                  <span className={styles.itemTitle}>
                                    {item.title}
                                  </span>
                                </div>
                                <div className={styles.back}>
                                  <span className={styles.itemSubtitle}>
                                    {item.subtitle}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              )}
              <tr className={styles.col}>
                <td>
                  <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                  <button
                    className={styles.tableButton}
                    onClick={handleNextTable}
                  >
                    Next point
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className={styles.tableFooterText}>
          Delivery: {activeTable.week} weeks
        </p>
        <h3 className={styles.footerTitle}>Close the Loop with Us</h3>
        <Button href={''} className={styles.footerButton} variant={'white'}>
          <ButtonIcon className={styles.icon} />
          let’s talk
        </Button>
      </Container>
    </section>
  );
};

export default ServiceTable;
