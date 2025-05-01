import { Card } from "antd";
import './Show.scss'
import MonthTotal from "./components/MonthTotal";
import HotGoods from "./components/HotGoods";

const Show = () => {
  
  return (
    <div>
      <Card title='数据中心' >
        <div className="box">
          <MonthTotal />
          <HotGoods />
        </div>
      </Card>  
    </div>
  )
}
export default Show