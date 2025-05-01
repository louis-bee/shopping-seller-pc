import { getMonthTotalBySellerAPI } from "@/apis/data"
import { message } from "antd";
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import * as echarts from 'echarts';

const MonthTotal = () => {

  const userId =  useSelector(state => state.user.userInfo.id)

  const chartRef = useRef(null)

  const [ monthTotal, setMonthTotal ] = useState({dates: [], sales: []})

  useEffect(() => {
    async function getData() {
      const params = {
        sellerId: userId
      };
      const res = await getMonthTotalBySellerAPI(params);
      if (res.status === 200) {
        // 假设后端返回的数据格式是 { monthTotal: { dates: [], sales: [] } }
        setMonthTotal(res.data.monthTotal);
      } else {
        message.error(res.desc)
      }
    }

    getData();
  }, [userId]);

  useEffect(() => {
    if (chartRef.current && monthTotal.dates.length > 0) {
      const chartDom = chartRef.current;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text:'近15天销量',
        },
        xAxis: {
          type: 'category',
          data: monthTotal.dates
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: monthTotal.sales,
            type: 'line'
          }
        ]
      };

      myChart.setOption(option);
    }
  }, [monthTotal]);

  const style = {
    width: 600,
    height: 400,
    padding: 20,
  }

  return (
    <div ref={chartRef} style={style}></div>
  )
}
export default MonthTotal