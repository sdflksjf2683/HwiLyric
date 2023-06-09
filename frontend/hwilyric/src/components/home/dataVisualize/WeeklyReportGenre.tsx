import { WeeklyReportGenreDiv } from "../../../styles/DataVisaulizeStyle";
import { BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";

const CustomXAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fontSize={10}
        fill="#666"
        transform="rotate(-35)"
      >
        {payload.value}
      </text>
    </g>
  );
};

function WeeklyReportGenre(props: any) {
  const data = props.data;
  data.sort((a: any, b: any) => b.count - a.count);
  
  return (
    <WeeklyReportGenreDiv>
      <BarChart
        width={304}
        height={264}
        data={data.length !== 0 ? data : []}
        margin={{ top: 10, bottom: 40, left: 20, right: 20 }}
        barCategoryGap={20}
      >
        <defs>
          <linearGradient id="colorBar" x1="0" y1="1" x2="0" y2="0">
            <stop offset="40%" stopColor="#88C4E9" stopOpacity={0.7} />
            <stop offset="80%" stopColor="#D1C4F1" stopOpacity={0.7} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" tick={<CustomXAxisTick />} interval={0} />
        <YAxis hide={true} />
        <Tooltip />
        <Bar dataKey="count" fill="url(#colorBar)" barSize={50} />
      </BarChart>
    </WeeklyReportGenreDiv>
  );
}

export default WeeklyReportGenre;
