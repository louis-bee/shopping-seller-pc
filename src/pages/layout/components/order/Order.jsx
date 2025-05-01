import { Card, Button,  Table, Tag, Space, message, Form, Input, Popover } from 'antd'
import { TruckOutlined, SearchOutlined, UndoOutlined } from '@ant-design/icons'
import img404 from '@/assets/img/error.png'
import './Order.scss'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getOrderListAPI, deliveryAPI } from '@/apis/order'
import moment from 'moment'

const Order = () => {

  const status = {
    2: <Tag color="warning">未发货</Tag>,
    3: <Tag color="success">已完成</Tag>
  }
  
  const columns = [
    {
      title:'订单号',
      dataIndex: 'id'
    },
    {
      title: '封面',
      dataIndex: 'images',
      width: 100,
      render: images => {
        return <img src={`${import.meta.env.VITE_API_URL}/uploads/${images[0]}` || img404} width={60} height={60} alt="" />
      }
    },
    {
      title: '商品名',
      dataIndex: 'goodsName',
      width: 200
    },
    {
      title: '用户名',
      dataIndex: 'userName',
    },
    {
      title: '数量',
      dataIndex: 'number'
    },
    {
      title: '交易时间',
      dataIndex: 'time',
      render: data => moment(data).format('YYYY-MM-DD')
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '发货',
      render: data => {
        return (
          <Space size="middle">
            { data.status === 2 ? (
              <Popover content={'点击发货'} placement="top">
                <Button
                  type="primary"
                  shape="circle"
                  disabled={data.status===3}
                  icon={<TruckOutlined />}
                  onClick={()=>delivery(data.id)}
                />
              </Popover>
            ) : (
              <Button type="primary" shape="circle" disabled icon={<TruckOutlined />}/>
            )}
          </Space>
        )
      }
    }
  ]

  const [ list, setList] = useState([])
  const [count, setCount] = useState(0)

  const userId =  useSelector(state => state.user.userInfo.id)

  const [ searchParams ] = useSearchParams()
  const goodsId = searchParams.get('goodsId')

  const [ params, setParams ] = useState({
    role: 2,
    pageSize: 10,
    pageNum: 1,
    type: goodsId ? 'goods' : 'seller',
    search: goodsId ? goodsId : userId
  }) 

  useEffect(()=>{
    async function getList() {
      const res = await getOrderListAPI(params)
      setList(res.data.list)
      setCount(res.data.total)
    }
    getList()
  },[params])

  const delivery = async (id)=>{
    const params = {
      orderId: id,
      sellerId: userId
    }
    const res = await deliveryAPI(params)
    if(res.status===200) {
      message.success('该订单已发货')
      const newList = list.map(item=>{
        if(item.id === id) return {...item, status:3}
        else return item
      })
      setList(newList);
    } else {
      message.error(res.desc)
    }
  }

  const [searchForm] = Form.useForm()

  const onSearch = ()=>{
    if(!searchForm.getFieldValue('goodsId')) return reset()
    setParams({
      ...params,
      search: searchForm.getFieldValue('goodsId'),
      type: 'goods'
    })
  }
  
  const reset = ()=>{
    searchForm.setFieldValue('goodsId','')
    setParams({
      ...params,
      search: userId,
      type: 'seller'
    })
  }

  return (
    <div>
      <Card title='订单列表' style={{ marginBottom: 20 }} >
        
        <Form initialValues={{}} form={searchForm} onFinish={onSearch}>
          <div className="search-box">
            <Form.Item label="按商品查询" name="goodsId">
              <Input className='search' placeholder="输入商品id" allowClear onPressEnter={onSearch}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />} shape="circle" className='but'></Button>
            </Form.Item>
          </div>
        </Form>
        
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{
          total: count,
          pageSize: params.pageSize,
        }}/>
      </Card>
    </div>
  )
}

export default Order