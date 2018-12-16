import * as React from 'react';

import * as style from './style.scss';

interface IPieChartProps {
  slices: Array<{ percent: number, color: string, text: string }>;
}

export default React.memo<IPieChartProps>(({ slices }) => {
  let cumulative = 0;
  const paths = slices.map((slice) => {
    const startX = Math.cos(2 * Math.PI * cumulative);
    const startY = Math.sin(2 * Math.PI * cumulative);

    cumulative += slice.percent;

    const endX = Math.cos(2 * Math.PI * cumulative);
    const endY = Math.sin(2 * Math.PI * cumulative);

    // if the slice is more than 50%, take the large arc (the long way around)
    const largeArcFlag = slice.percent > .5 ? 1 : 0;

    const path = [
      `M ${startX} ${startY}`, // Move
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
      'L 0 0', // Line
    ].join(' ');

    return (
      <path
        key={slice.color}
        fill={slice.color}
        d={path}
        xmlns="http://www.w3.org/2000/svg"
      />
    );
  });
  const legend = slices.map((slice) => {
    return (
      <div key={slice.color}>
        <div style={{ backgroundColor: slice.color }} />
        <div>{slice.text}</div>
      </div>
    );
  });

  return (
    <div className={style.chart}>
      <svg
        viewBox="-1 -1 2 2"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths}
      </svg>
      <div className={style.legend}>
        {legend}
      </div>
    </div>
  );
});
