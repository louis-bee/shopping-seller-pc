import { useNavigate } from 'react-router-dom'
import { Card, Button, Popconfirm, Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/img/error.png'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { delGoodsAPI, getGoodsListAPI } from '@/apis/goods'

const Goods = () => {

  const navigate = useNavigate()

  const status = {
    1: <Tag color="warning">下架</Tag>,
    2: <Tag color="success">在售</Tag>
  }
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '名称',
      dataIndex: 'goodsName',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => status[data]
    },
    {
      title: '类别',
      dataIndex: 'type',
    },
    {
      title: '价格',
      dataIndex: 'price'
    },
    {
      title: '销量',
      dataIndex: 'sales'
    },
    {
      title: '浏览量',
      dataIndex: 'view'
    },
    {
      title: '库存',
      dataIndex: 'amount'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={()=>navigate(`/edit?id=${data.id}`)}/>
            <Popconfirm
              title="删除文章"
              description="确认要删除当前文章吗?"
              onConfirm={()=>onConfirm(data)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                type="primary"
                danger
                shape="circle"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  const [ list, setList] = useState([])
  const [count, setCount] = useState(0)

  const userId =  useSelector(state => state.user.userInfo.id)
  const [ params, setParams ] = useState({
    sellerId: userId,
    pageSize: 10,
    pageNum: 1,
  }) 

  useEffect(()=>{
    async function getList() {
      const res = await getGoodsListAPI(params)
      setList(res.data.list)
      setCount(res.data.total)
    }
    getList()
  },[params])

  const onPageChange = (page)=>{
    setParams({
      ...params,
      pageNum: page
    })
  }

  const onConfirm = async (data)=>{
    const delParams = {
      id: data.id,
      sellerId: userId,
    }
    await delGoodsAPI(delParams)
    setParams({
      ...params
    })
  }

  return (
    <div>
      <Card title='商品列表' style={{ marginBottom: 20 }} >
        <Table rowKey="id" columns={columns} dataSource={list} pagination={{
          total: count,
          pageSize: params.pageSize,
          onChange: onPageChange
        }}/>
      </Card>
    </div>
  )
}

export default Goods