import React from 'react';
import styles from './Loading.module.css'; // Import CSS module

const Loading = () => {
  const waveClasses = Array.from({ length: 7 }).map((_, index) => (
    styles.wave + ' ' + styles[`delay${index + 1}`]
  ));

  return (
    <div className={styles.center}>
      {waveClasses.map((className, index) => (
        <div key={index} className={className}></div>
      ))}
    </div>
  );
};

export default Loading;
