import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

import { authenticateUser } from '../store/auth/thunks';
import { connect } from 'react-redux';

class NormalLoginForm extends React.Component {

  handleAuthenticate = event => {
    event.preventDefault();
    const { authenticateUser, form } = this.props;
    form.validateFields((error, values) => {
      const { email, password } = values;
      if (error) {
        return;
      }
      authenticateUser(email, password);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.props;
    return (
      <div className="my-form">
        <Form onSubmit={this.handleAuthenticate}>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"/>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                     placeholder="Password"/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/register">register now!</a>
          </Form.Item>
          {error && <p className="ant-row error">{error}</p>}
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = store => ({
  error: store.auth.error,
});

const mapDispatchToProps = {
  authenticateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
