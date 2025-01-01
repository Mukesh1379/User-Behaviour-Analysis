import React, { useEffect, useRef } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

// Register required components
ChartJS.register(
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export function InteractionTimeline({ data, detailed = false }) {
  const chartRef = useRef(null);

  // Cleanup chart instance on unmount
  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const generateTimelineData = () => {
    const events = [];
    const now = Date.now();
    const hour = 3600000;
    
    for (let i = 0; i < 50; i++) {
      events.push({
        x: now - Math.random() * 24 * hour,
        y: Math.random(),
        type: ['click', 'scroll', 'hover'][Math.floor(Math.random() * 3)]
      });
    }
    return events;
  };

  const events = generateTimelineData();
  
  const chartData = {
    datasets: [
      {
        label: 'Interactions',
        data: events,
        backgroundColor: events.map(e => {
          switch (e.type) {
            case 'click': return 'rgba(239, 68, 68, 0.6)';
            case 'scroll': return 'rgba(16, 185, 129, 0.6)';
            default: return 'rgba(245, 158, 11, 0.6)';
          }
        }),
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm'
          }
        },
        title: {
          display: true,
          text: 'Time'
        }
      },
      y: {
        beginAtZero: true,
        max: 1,
        title: {
          display: true,
          text: 'Interaction Intensity'
        }
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => `${events[context.dataIndex].type} at ${new Date(events[context.dataIndex].x).toLocaleTimeString()}`
        }
      }
    }
  };

  return (
    <Scatter 
      ref={chartRef}
      data={chartData} 
      options={options} 
    />
  );
}