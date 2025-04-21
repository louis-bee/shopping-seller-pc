import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Popconfirm } from 'antd'

// 导入资源
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/img/error.png'
// import { useChannel } from '@/hooks/useChannel'
import { useEffect, useState } from 'react'
// import { delArticleAPI, getArticleListAPI } from '@/apis/article'

const { Option } = Select
const { RangePicker } = DatePicker

const Goods = () => {

  const navigate = useNavigate()
  // const { channelList } = useChannel()

  const status = {
    0: <Tag color="warning">下架</Tag>,
    1: <Tag color="success">在售</Tag>
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
  // 准备表格body数据
  const data = [
    {
      id: '8218',
      goodsName: '吉他手',
      status: 1,
      type: '唱片',
      price: 232.12,
      sales: 32,
      view: 1001,
      amount: 99,
      cover: {
        images: [],
      },
    }
  ]

  const [ list, setList] = useState([])
  const [count, setCount] = useState(0)
  
  const [ reqData, setReqData ] = useState({
    status: '',
    channel_id:'',
    begin_pubdate:'',
    end_pubdate:'',
    page:1,
    per_page:4
  }) 

  useEffect(()=>{
    async function getList() {
      const res = await getArticleListAPI(reqData)
      setList(res.data.results)
      setCount(res.data.total_count)
    }
    getList()
  },[reqData])

  const onPageChange = (page)=>{
    setReqData({
      ...reqData,
      page
    })
  }

  const onConfirm = async (data)=>{
    await  delArticleAPI(data.id)
    setReqData({
      ...reqData
    })
  }

  return (
    <div>
      <Card title='商品列表' style={{ marginBottom: 20 }} >
        <Table rowKey="id" columns={columns} dataSource={data} pagination={{
          total: count,
          pageSize: reqData.per_page,
          onChange: onPageChange
        }}/>
      </Card>
    </div>
  )
}

export default Goods