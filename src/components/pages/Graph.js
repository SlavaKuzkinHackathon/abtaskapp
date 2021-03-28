import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import axios from 'axios'

import {
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  XAxis,
  YAxis,
  Brush,
  ComposedChart
} from 'recharts';


function About() {
  let [data, setData] = useState([]);
  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = async () => {
    const result = await axios.get(`https://abtask.azurewebsites.net/api/users`);
    setData(result.data.reverse())
  }
  data = data.filter(a => (a.id));
  const CustomizedAxisTick = ({ x, y, payload }) => {
    const dateTip = Moment(payload.value)
      .format("DD.MM.YYYY")
      .slice(0, 10)
    return (
      <g transform={`translate(${x},${y})`} >
        <text x={23} y={0} dy={20} fontSize="0.90em"
          fontFamily="bold" textAnchor="end" fill="#363636">
          {dateTip}</text>
      </g>
    );
  }
  const xAxisTickFormatter = (timestamp_measured) => {
    return Moment(timestamp_measured)
      .format("DD.MM.YYYY")
      .slice(0, 10);
  }

  return (
    <div>
      <ComposedChart
        layout="vertical"
        barGap={-15} width={500} height={400} data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="6 6 " />
        <XAxis tick={CustomizedAxisTick} interval={2} />
        <YAxis tickCount={12} type="category" scale="band" dataKey="id" />
        <Bar dataKey="id" barSize={0} fill="	#FFFFFF" />
        <Bar dataKey="date_Registration" barSize={20} fill="#00FFFF" />
        <Bar dataKey="date_Last_Activity" barSize={10} fill="#FF0000" fillOpacity={0.5} />
        <Tooltip animationDuration={0} tick={CustomizedAxisTick} />
        <Legend />
        <Brush tickFormatter={xAxisTickFormatter} dataKey="date_Registration" />
      </ComposedChart>
    </div>
  )
}
export default About

