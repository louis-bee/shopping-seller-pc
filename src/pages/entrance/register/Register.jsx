import './Register.scss';
import { Card, Form, Input, Button, message } from 'antd';
import { registerAPI } from "@/apis/user.js";

const Register = ({setTab}) => {

  const onFinish = async (values) => {
    const params = {
      userName: values.userName,
      account: values.account,
      pwd: values.pwd,
      role: 2,
    }
    const res = await registerAPI(params)
    if (res.status===200) {
      message.success('注册成功');
      setTab('login')
    } else {
      message.error(res.desc);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const changeTab = (val)=> {
    setTab(val)
  }

  return (
    <Card className="card-box">
      <h1>销售人员注册</h1>
      <Form
        className="form"
        initialValues={{ account: '13724648288', password: '123123' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="userName"
          rules={[{ required: true, message: '用户名不能为空' }]}
        >
          <Input size="large" placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="账号"
          name="account"
          rules={[{ required: true, message: '账号不能为空' }]}
        >
          <Input size="large" placeholder="请输入手机号" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pwd"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password size="large" placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="pwd2"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password size="large" placeholder="请再次输入密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" block>
            注册
          </Button>
        </Form.Item>
      </Form>
      <div className="link">
        <a onClick={()=>changeTab('login')}>登录</a>
      </div>
    </Card>
  );
};

export default Register;