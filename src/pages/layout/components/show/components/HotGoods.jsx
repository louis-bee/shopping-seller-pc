import { getHotGoodsBySellerAPI } from "@/apis/data"
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import * as echarts from 'echarts';
import { message } from "antd";

const HotGoods = () => {

  const userId =  useSelector(state => state.user.userInfo.id)

  const chartRef = useRef(null)

  const [ hotGoods, setHotGoods ] = useState({goods: [], sales: []})

  useEffect(() => {
    async function getData() {
      const params = {
        sellerId: userId
      };
      const res = await getHotGoodsBySellerAPI(params);
      if (res.status === 200) {
        setHotGoods(res.data.hotGoods)
      } else {
        message.error(res.desc)
      }
    }

    getData();
  }, [userId]);

  useEffect(() => {
    if (chartRef.current && hotGoods.goods.length > 0) {
      const chartDom = chartRef.current;
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text:'累计销量排行榜',
        },
        xAxis: {
          type: 'category',
          data: hotGoods.goods
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: hotGoods.sales,
            type: 'bar'
          }
        ]
      };

      myChart.setOption(option);
    }
  }, [hotGoods]);

  const style = {
    width: 600,
    height: 400,
    padding: 20,
  }

  return (
    <div ref={chartRef} style={style}></div>
  )
}
export default HotGoods