import React, {useState} from 'react'
import ReactApexChart from 'react-apexcharts'
import styles from './Chart.module.css'

const Chart = ({ series, options, theme, setAggregateMode }) => {
    
  const [selectedInterval, setSelectedInterval] = useState(null);

  const handleIntervalClick = (interval) => {
    setAggregateMode(interval);
    setSelectedInterval(interval);
  };

  return (
    <div className={styles.chart}>
        <div className={styles.IntervalSelector}>
              <button
                onClick={() => handleIntervalClick(60)}
                className={`${styles.IntervalButton} ${
                  selectedInterval === 60 ? styles.selected : ''
                }`}
                // style={selectedInterval === 'hour' ? { backgroundColor: '#0056b3' } : {}}
              >
                Minute
              </button>
              <button
                onClick={() => handleIntervalClick(60 * 60)}
                className={`${styles.IntervalButton} ${
                  selectedInterval === 60 * 60 ? styles.selected : ''
                }`}
                // style={selectedInterval === 'hour' ? { backgroundColor: '#0056b3' } : {}}
              >
                Hour
              </button>
              <button
                className={`${styles.IntervalButton} ${
                  selectedInterval === 60 * 60 * 24 ? styles.selected : ''
                }`}
                onClick={() => handleIntervalClick(60 * 60 * 24)}
              >
                Day
              </button>
              <button
                className={`${styles.IntervalButton} ${
                  selectedInterval === 60 * 60 * 24 * 7 ? styles.selected : ''
                }`}
                onClick={() => handleIntervalClick(60 * 60 * 24 * 7)}

                // style={selectedInterval === 'week' ? { backgroundColor: '#0056b3' } : {}}
              >
                Week
              </button>
        </div>
      <ReactApexChart options={options} series={series} theme={theme} type="candlestick" width='100%' height={350} />
    </div>
  );
};

export default Chart