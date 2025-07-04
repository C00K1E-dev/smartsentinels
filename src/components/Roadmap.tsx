import React from "react";
import styles from "../styles/Roadmap.module.css";

const Roadmap: React.FC = () => {
    return (
        <section className={styles.roadmap}>
            <div className={styles.container}>
                <div className={styles.roadmapHeader}>
                    <h2 className={styles.roadmapTitle}>Roadmap</h2>
                    <p className={styles.roadmapSubtitle}>
                        Our journey to revolutionize AI-powered services
                    </p>
                </div>

                <div className={styles.roadmapContent}>
                    <div className={styles.timeline}>
                        <div className={styles.timelineLine}></div>

                        <div className={styles.roadmapItem}>
                            <div className={styles.roadmapCard}>
                                <div className={styles.roadmapIcon}>
                                    <span className={styles.quarter}>Q1</span>
                                    <span className={styles.year}>2025</span>
                                </div>
                                <div className={styles.roadmapContent}>
                                    <h3 className={styles.roadmapItemTitle}>
                                        Q1 2025
                                    </h3>
                                    <p
                                        className={
                                            styles.roadmapItemDescription
                                        }
                                    >
                                        Launch of the Smart Sentinels platform
                                        and initial token sale.
                                    </p>
                                </div>
                                <div className={styles.roadmapStatus}>
                                    <span className={styles.statusDot}></span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.roadmapItem}>
                            <div className={styles.roadmapCard}>
                                <div className={styles.roadmapIcon}>
                                    <span className={styles.quarter}>Q2</span>
                                    <span className={styles.year}>2025</span>
                                </div>
                                <div className={styles.roadmapContent}>
                                    <h3 className={styles.roadmapItemTitle}>
                                        Q2 2025
                                    </h3>
                                    <p
                                        className={
                                            styles.roadmapItemDescription
                                        }
                                    >
                                        Integration of AI-driven call centers
                                        and tech support services.
                                    </p>
                                </div>
                                <div className={styles.roadmapStatus}>
                                    <span className={styles.statusDot}></span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.roadmapItem}>
                            <div className={styles.roadmapCard}>
                                <div className={styles.roadmapIcon}>
                                    <span className={styles.quarter}>Q3</span>
                                    <span className={styles.year}>2025</span>
                                </div>
                                <div className={styles.roadmapContent}>
                                    <h3 className={styles.roadmapItemTitle}>
                                        Q3 2025
                                    </h3>
                                    <p
                                        className={
                                            styles.roadmapItemDescription
                                        }
                                    >
                                        Expansion of NFT staking platform and
                                        community rewards program.
                                    </p>
                                </div>
                                <div className={styles.roadmapStatus}>
                                    <span className={styles.statusDot}></span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.roadmapItem}>
                            <div className={styles.roadmapCard}>
                                <div className={styles.roadmapIcon}>
                                    <span className={styles.quarter}>Q4</span>
                                    <span className={styles.year}>2025</span>
                                </div>
                                <div className={styles.roadmapContent}>
                                    <h3 className={styles.roadmapItemTitle}>
                                        Q4 2025
                                    </h3>
                                    <p
                                        className={
                                            styles.roadmapItemDescription
                                        }
                                    >
                                        Global marketing campaign and strategic
                                        partnerships.
                                    </p>
                                </div>
                                <div className={styles.roadmapStatus}>
                                    <span className={styles.statusDot}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
