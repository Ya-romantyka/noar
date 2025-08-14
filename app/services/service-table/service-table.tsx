"use client";

import React, {useEffect, useRef, useState} from "react";
import styles from "./service-table.module.scss";
import Container from "@/app/components/layout/container/container";

import ButtonIcon from "@/public/images/button_icon.svg";
import Button from "@/app/components/ui/button/button";

interface TableData {
    strategies: {
        title: string;
        subtitle: string
        distance: {
            mobile: number;
            desktop: number;
        };
    }[];
    designs: {
        title: string;
        subtitle: string
        distance: {
            mobile: number;
            desktop: number;
        };
    }[];
    developments: {
        title: string;
        subtitle: string
        distance: {
            mobile: number;
            desktop: number;
        };
    }[];
    additions: {
        title: string;
        subtitle: string
        distance: {
            mobile: number;
            desktop: number;
        };
    }[];
    week: number;
    name: string;
    price: string

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
        name: 'Brandbook',
        price: '10k',
        week: 4,
        strategies: [
            {
                title: "Briefing",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 1.6
                }
            },
            {
                title: "Pricing",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "Research",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "Solutions & Requirements",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
        ],
        designs: [
            {
                title: "Mood board",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 78,
                    mobile: 10
                }
            },
            {
                title: "Identity improvement",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "UX/UI Design",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 8,
                    mobile: 0.8
                }
            },
            {
                title: "Mobile / Tablet",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 12,
                    mobile: 0.8
                }
            },
        ],
        developments: [
            {
                title: "Front-end",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 74,
                    mobile: 30
                }
            },
            {
                title: "Back-end ",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "СMS / Admin Panel Setup",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 1
                }
            },
            {
                title: "Hosting setup",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.8,
                    mobile: 1
                }
            },
            {
                title: "Quality Analysis",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 3,
                    mobile: 1
                }
            },
        ],
        additions: [
            {
                title: "Content concept",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 80,
                    mobile: 6
                }
            },
            {
                title: "Animations / Graphics ",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 120.4,
                    mobile: 4
                }
            },
            {
                title: "Content Creation",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 3,
                    mobile: 25
                }
            },
        ],
    },
    table_2: {
        name: 'Landing page',
        price: '20k',
        week: 4,
        strategies: [
            {
                title: "Briefing",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 6,
                    mobile: 1.6
                }
            },
            {
                title: "Pricing",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "Research",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "Solutions & Requirements",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 10,
                    mobile: 0.8
                }
            },
        ],
        designs: [
            {
                title: "Mood board",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 25,
                    mobile: 20
                }
            },
            {
                title: "Identity improvement",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "UX/UI Design",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 8,
                    mobile: 0.8
                }
            },
            {
                title: "Mobile / Tablet",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 12,
                    mobile: 0.8
                }
            },
        ],
        developments: [
            {
                title: "Front-end",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 130,
                    mobile: 15
                }
            },
            {
                title: "Back-end ",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.4,
                    mobile: 0.8
                }
            },
            {
                title: "СMS / Admin Panel Setup",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 12,
                    mobile: 8
                }
            },
            {
                title: "Hosting setup",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 2.8,
                    mobile: 2
                }
            },
            {
                title: "Quality Analysis",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 3,
                    mobile: 5
                }
            },
        ],
        additions: [
            {
                title: "Content concept",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 100,
                    mobile: 40
                }
            },
            {
                title: "Animations / Graphics ",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 10,
                    mobile: 5
                }
            },
            {
                title: "Content Creation",
                subtitle:
                    "Refining or developing an identity allows you to achieve the maximum effect from the site",
                distance: {
                    desktop: 3,
                    mobile: 8
                }
            },
        ],
    },
};

const ServiceTable: React.FC = () => {

    const tablesArray: TableData[] = Object.values(tablesData);


    const [activeTableIndex, setActiveTableIndex] = useState<number>(0);
    const [isFading, setIsFading] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [animatedPrice, setAnimatedPrice] = useState<string>(tablesArray[0].price);
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
            const animatedValue = Math.floor(prevValue + progress * (nextValue - prevValue));
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
            tableBodyRef.current?.scrollTo({left: 0});
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
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
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
            tableBodyRef.current?.scrollTo({ left: 0, behavior: "smooth" });
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
                                    className={`${styles.white} ${activeTableIndex === index ? styles.active : ""}`}
                                    onClick={() => changeTable(index)}
                                    variant={"white"}
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
                            className={`${styles.tableBody} ${isFading ? styles.fading : ""}`}
                            ref={tableBodyRef}
                            onMouseDown={handleMouseDownBody}
                            onMouseLeave={handleMouseLeaveBody}
                            onMouseUp={handleMouseUpBody}
                            onMouseMove={handleMouseMoveBody}
                        >
                        {activeTable && (
                            <tr>
                                <td className={styles.row} style={{width: getRowWidth()}}>
                                    <div className={styles.grid}>
                                        {Array.from({length: activeTable.week * 2}).map((_, i) => (
                                            <li key={i}></li>
                                        ))}
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
                                                    className={styles.item}
                                                    style={{ marginLeft: `${distance}rem` }}
                                                >
                                                    <span className={styles.widthBlock}>{item.title}</span>
                                                    <div className={styles.flipContainer}>
                                                        <div className={styles.card}>
                                                            <div className={styles.front}>
                                                                <span className={styles.itemTitle}>{item.title}</span>
                                                            </div>
                                                            <div className={styles.back}>
                                                                <span className={styles.itemSubtitle}>{item.subtitle}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}

                                    </ul>
                                </td>
                                <td className={styles.row} style={{width: getRowWidth()}}>
                                    <div className={styles.grid}>
                                        {Array.from({length: activeTable.week * 2}).map((_, i) => (
                                            <li key={i}></li>
                                        ))}
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
                                                    className={styles.item}
                                                    style={{ marginLeft: `${distance}rem` }}
                                                >
                                                    <span className={styles.widthBlock}>{item.title}</span>
                                                    <div className={styles.flipContainer}>
                                                        <div className={styles.card}>
                                                            <div className={styles.front}>
                                                                <span className={styles.itemTitle}>{item.title}</span>
                                                            </div>
                                                            <div className={styles.back}>
                                                                <span className={styles.itemSubtitle}>{item.subtitle}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}

                                    </ul>
                                </td>
                                <td className={styles.row} style={{width: getRowWidth()}}>
                                    <div className={styles.grid}>
                                        {Array.from({length: activeTable.week * 2}).map((_, i) => (
                                            <li key={i}></li>
                                        ))}
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
                                                    className={styles.item}
                                                    style={{ marginLeft: `${distance}rem` }}
                                                >
                                                    <span className={styles.widthBlock}>{item.title}</span>
                                                    <div className={styles.flipContainer}>
                                                        <div className={styles.card}>
                                                            <div className={styles.front}>
                                                                <span className={styles.itemTitle}>{item.title}</span>
                                                            </div>
                                                            <div className={styles.back}>
                                                                <span className={styles.itemSubtitle}>{item.subtitle}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })}

                                    </ul>
                                </td>
                                <td className={styles.row} style={{width: getRowWidth()}}>
                                    <div className={styles.grid}>
                                        {Array.from({length: activeTable.week * 2}).map((_, i) => (
                                            <li key={i}></li>
                                        ))}
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
                                                    className={styles.item}
                                                    style={{ marginLeft: `${distance}rem` }}
                                                >
                                                    <span className={styles.widthBlock}>{item.title}</span>
                                                    <div className={styles.flipContainer}>
                                                        <div className={styles.card}>
                                                            <div className={styles.front}>
                                                                <span className={styles.itemTitle}>{item.title}</span>
                                                            </div>
                                                            <div className={styles.back}>
                                                                <span className={styles.itemSubtitle}>{item.subtitle}</span>
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
                                <button  className={styles.tableButton} onClick={handleNextTable}>
                                    Next point
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                <p className={styles.tableFooterText}>Delivery: {activeTable.week} weeks</p>
                <h3 className={styles.footerTitle}>Close the Loop with Us</h3>
                <Button href={""} className={styles.footerButton} variant={"white"}>
                    <ButtonIcon className={styles.icon}/>
                    let’s talk
                </Button>
            </Container>
        </section>
    );
};

export default ServiceTable;
