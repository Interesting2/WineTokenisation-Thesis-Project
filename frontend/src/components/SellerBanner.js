import React from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import styles from './SellerBanner.module.css';

const SellerBanner = ({title, bannerAction, bannerMode , bannerDescription }) => {
  // Animation variants
  const bannerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.5 } },
  };

  const handleBannerAction = () => {
    bannerAction(0, null);
  }

  return (
    <motion.div
      className={styles.banner}
      initial="hidden"
      animate="visible"
      variants={bannerVariants}
    >
      <div className={styles.bannerContent}>
        <motion.h1
          className={styles.bannerTitle}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >

        <b className={styles.tasksSummary}>
          <span>{`Welcome to the `}</span>
          {bannerMode === 0 ? (
            <>
              <span className={styles.s}>S</span>
              <span className={styles.u}>e</span>
              <span className={styles.m}>l</span>
              <span className={styles.m1}>l</span>
              <span className={styles.a}>e</span>
              <span className={styles.r}>r</span>
              <span className={styles.y}>'s</span>
            </>
          ) : (
            <>
              <span className={styles.s}>D</span>
              <span className={styles.u}>e</span>
              <span className={styles.m}>t</span>
              <span className={styles.m1}>a</span>
              <span className={styles.a}>i</span>
              <span className={styles.r}>l</span>
              <span className={styles.y}>s</span>
            </>
          )}
          <span>{` Page `}</span>
        </b>

        </motion.h1>
        <motion.p
          className={styles.bannerDescription}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          {bannerDescription}
        </motion.p>
        <motion.button
          className={styles.bannerButton}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          onClick={handleBannerAction}
        >
          {title}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SellerBanner;
