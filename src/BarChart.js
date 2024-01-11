import * as d3 from "d3";
import { scaleBand, scaleLinear, max } from "d3";

export function BarChart({ data }) {
  const height = 600;
  const width = 960;
  const margin = { top: 20, right: 20, bottom: 70, left: 200 };

  const formatX = d3.format(".2f");

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const yband = d3
    .scaleBand()
    .domain(data.map((item, index) => item.sector))
    .range([0, innerHeight])
    .padding(0.5);

  const xband = scaleLinear()
    .domain([0, d3.max(data, (item) => item.intensity)])
    .range([0, innerWidth]);

  // console.log(xband.ticks())

  return (
    <svg width={width} height={height}>
      <g transform={`translate( ${margin.left},${margin.top})`}>
        <text
          style={{ fill: "darkgrey", fontSize: "25" }}
          x={innerWidth / 2}
          y={innerHeight + 45}
          textAnchor="middle"
        >
          Intensity
        </text>

        {xband.ticks().map((tickvalue) => (
          <g key={tickvalue} transform={`translate(${xband(tickvalue)},0)`}>
            <line y2={innerHeight} stroke="grey" />
            <text y={innerHeight + 20} style={{ textAnchor: "middle" }}>
              {" "}
              {formatX(tickvalue)}
            </text>
          </g>
        ))}

        {yband.domain().map((tickvalue) => (
          <text
            key={tickvalue}
            y={yband(tickvalue) + yband.bandwidth() / 2}
            x={-10}
            style={{ textAnchor: "end", stroke: "darkgrey" }}
          >
            {tickvalue}
          </text>
        ))}

        {data.map((item, index) => (
          <rect
            key={`${item.sector}-${index}`}
            style={{ fill: "brown" }}
            x={0}
            y={yband(item.sector)}
            width={xband(item.intensity)}
            height={yband.bandwidth()}
          >
            <title>{formatX(item.intensity)}</title>
          </rect>
          // <div key={index}>
          //   <h6>{item.intensity}</h6>
          // </div>
        ))}
      </g>
    </svg>
  );
}
