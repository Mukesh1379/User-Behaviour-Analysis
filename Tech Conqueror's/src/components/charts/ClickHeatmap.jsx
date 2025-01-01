import React, { useEffect, useRef } from 'react';
import h337 from 'heatmap.js';

export function ClickHeatmap({ data }) {
  const containerRef = useRef(null);
  const heatmapRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && !heatmapRef.current) {
      heatmapRef.current = h337.create({
        container: containerRef.current,
        radius: 30,
      });

      // Generate sample data
      const points = Array.from({ length: 50 }, () => ({
        x: Math.floor(Math.random() * containerRef.current.offsetWidth),
        y: Math.floor(Math.random() * containerRef.current.offsetHeight),
        value: Math.floor(Math.random() * 100)
      }));

      heatmapRef.current.setData({
        max: 100,
        data: points
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[400px] bg-white/50 rounded-lg">
      <div className="p-4 text-center text-gray-500">
        Interact with the page to see the heatmap update
      </div>
    </div>
  );
}