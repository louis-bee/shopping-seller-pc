import {
  Card,
  Form,
  Button,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Edit.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState, useRef, useEffect } from 'react'
import { addGoodsAPI, getGoodsByIdAPI, updateGoodsAPI } from '@/apis/goods'

const { Option } = Select

const Edit = () => {
  const Navigate = useNavigate()
  const typeList = [
    {
      "id": 1,
      "name": "唱片"
    },
    {
      "id": 2,
      "name": "衣饰"
    },
    {
      "id": 3,
      "name": "日用品"
    },
    {
      "id": 4,
      "name": "其它"
    },
    {
      "id": 5,
      "name": "特价"
    },
  ]

  const onFinish = async (form) =>{
    const params = {
      goodsName: form.goodsName,
      price: form.price,
      type: form.type,
      amount: form.amount,
      images: imageList.map(item=> {
        if(item.response) {
          return item.response.data.url
        } else {
          return item.url
        }
      }),
      desc: form.desc
    }
    let res = null
    if(goodsId) {
      res = await updateGoodsAPI({...params, id:goodsId})
    } else {
      res = await addGoodsAPI(params)
    }
    if(res.status===200) {
      message.success(res.desc)
      Navigate('/goods')
    } else {
      message.error(res.desc)
    }
  }

  const cacheImageList = useRef([])
  const [ imageList, setImageList ] = useState([])
  const onUploadChange =(value)=>{
    console.log(value);
    setImageList(value.fileList)
    cacheImageList.current = value.fileList
  }

  //通过路由获取id
  const [ searchParams ] = useSearchParams()
  const goodsId = searchParams.get('id')

  const [form] = Form.useForm()
  useEffect(()=>{
    async function getGoodsDetail () {
      const res = await getGoodsByIdAPI({id: goodsId, view: false})
      if(res.status===200) {
        const data = res.data
        const {cover} = data
        form.setFieldsValue({
          ...data,
        })
        setImageList(cover.images.map(url=>{
          return { url }
        }))
        cacheImageList.current = cover.images.map(url=>{
          return { url }
        })
      } else {
        message.error('获取商品数据失败，请稍后再试')
      }
    }
    if(goodsId) {
      getGoodsDetail()
    }
  },[goodsId, form])

  return (
    <div className="edit">
      <Card
        title={`${goodsId?'编辑':'发布'}商品` }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="名称"
            name="goodsName"
            rules={[{ required: true, message: '请输入商品名称' }]}
          >
            <Input placeholder="请输入商品名称" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入价格' }]}
          >
            <Input placeholder="请输入价格" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item
            label="分类"
            name="typeId"
            rules={[{ required: true, message: '请选择商品分类' }]}
          >
            <Select placeholder="请选择商品分类" style={{ width: 200 }}>
              {typeList.map(item=><Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择是否上架' }]}
          >
            <Select placeholder="请选择是否上架" style={{ width: 200 }}>
              <Option value={1}>下架</Option>
              <Option value={2}>在售</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="库存"
            name="amount"
            rules={[{ required: true, message: '请输入库存数' }]}
          >
            <Input placeholder="请输入库存数" style={{ width: 200 }} />
          </Form.Item>
          <Form.Item label="图片" name="images" rules={[{ required: true, message: '请上传商品图片' }]}>
            <Upload
              listType="picture-card"
              showUploadList
              name="image"
              action={'http://geek.itheima.net/v1_0/upload'}
              onChange={onUploadChange}
              maxCount={5}
              fileList={imageList}
            >
              <PlusOutlined />
            </Upload>
            
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="desc"
            rules={[{ required: true, message: '请输入商品描述' }]}
          >
            <ReactQuill
              className="publish-quill"
              theme="snow"
              placeholder="请输入商品描述"
            />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布商品
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Edit