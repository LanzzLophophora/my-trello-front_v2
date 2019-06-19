import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { Redirect, withRouter } from 'react-router';

import { signinRequest } from '../store/auth/actions';
import { connect } from 'react-redux';

class NormalLoginForm extends React.Component {

  // componentDidMount() {
  //   const { token, history } = this.props;
  //   token && history.push('/')
  // }

  handleAuthenticate = event => {
    event.preventDefault();
    const { signinRequest, form } = this.props;
    form.validateFields((error, values) => {
      const { login, password, remember } = values;
      console.log("remember", remember);
      if (error) {
        return;
      }
      signinRequest(login, password, remember);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.props;
    const { token, history } = this.props;
    console.log(token);
    token.length && history.push('/');
    return (
      <div className="my-form">
        <Form onSubmit={this.handleAuthenticate}>
          <Form.Item>
            {getFieldDecorator('login', {
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

              {getFieldDecorator('remember', {
                rules: [{ required: false }],
              })(
                <div>
                  <Input type="checkbox"/>
                  <span>Remember me</span>
                </div>
              )}

          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="/signup">register now!</a>
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
  token: store.auth.token
});

const mapDispatchToProps = {
  signinRequest
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginForm)
);

