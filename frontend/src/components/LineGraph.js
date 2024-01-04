import React from 'react'
import ReactApexChart from 'react-apexcharts'
import styles from './LineGraph.module.css'

const LineGraph = ({ series, options, theme}) => {
  return (
    <div className={styles.chart1}>
        <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  )
}

export default LineGraph