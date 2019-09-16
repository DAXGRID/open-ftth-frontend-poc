import React from "react";
import { colorMap } from "lib/mapbox/constants";

const ConduitIcon = ({ ...props }) => {
  const width = props.size || 50;
  const height = props.size || 50;
  const color = props.color ? colorMap[props.color.toUpperCase()] : "";
  const colorMarking = props.colorMarking
    ? colorMap[props.colorMarking.toUpperCase()]
    : color;
  const showBorder = props.color === "WHITE" || props.color === "CLEAR";
  const cableColor = props.cableSize ? "#212121" : "#FFFFFF";

  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      viewBox={`0 0 101 101`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <title>ConduitIcon</title>
      <defs>
        <circle id="path-1" cx="50.9714664" cy="50.9714664" r="48"></circle>
        <mask
          id="mask-2"
          maskContentUnits="userSpaceOnUse"
          maskUnits="objectBoundingBox"
          x="0"
          y="0"
          width="96"
          height="96"
          fill="white"
        >
          <use xlinkHref="#path-1"></use>
        </mask>
      </defs>
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        {showBorder && (
          <path
            d="M50.9714664,100.971466 C78.5857039,100.971466 100.971466,78.5857039 100.971466,50.9714664 C100.971466,23.3572289 78.5857039,0.971466369 50.9714664,0.971466369 C23.3572289,0.971466369 0.971466369,23.3572289 0.971466369,50.9714664 C0.971466369,78.5857039 23.3572289,100.971466 50.9714664,100.971466 Z"
            id="Oval"
            fill="#888"
            transform="translate(50.971466, 50.971466) rotate(-61.000000) translate(-50.971466, -50.971466) "
          ></path>
        )}
        <use
          id="Oval"
          stroke={colorMarking}
          mask="url(#mask-2)"
          strokeWidth="34"
          fill={color}
          strokeDasharray="50,107"
          transform="translate(50.971466, 50.971466) rotate(-34.000000) translate(-50.971466, -50.971466) "
          xlinkHref="#path-1"
        ></use>
        <path
          d="M50.9714664,83.9714664 C69.1968631,83.9714664 83.9714664,69.1968631 83.9714664,50.9714664 C83.9714664,32.7460696 69.1968631,17.9714664 50.9714664,17.9714664 C32.7460696,17.9714664 17.9714664,32.7460696 17.9714664,50.9714664 C17.9714664,69.1968631 32.7460696,83.9714664 50.9714664,83.9714664 Z"
          id="Oval"
          fill={cableColor}
          transform="translate(50.971466, 50.971466) rotate(-61.000000) translate(-50.971466, -50.971466) "
        ></path>
        <text
          id={props.cableSize}
          fontFamily="PTMono-Bold, PT Mono"
          fontSize="28"
          fontWeight="bold"
          fill="#FFFFFF"
        >
          <tspan x="51%" y="52%" dominantBaseline="middle" textAnchor="middle">
            {props.cableSize}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default ConduitIcon;
