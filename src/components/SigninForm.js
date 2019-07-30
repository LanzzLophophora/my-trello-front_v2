import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Form, Icon, Input, Button } from 'antd';
import { signinRequest } from '../store/auth/actions';

class NormalLoginForm extends React.Component {
  handleAuthenticate = event => {
    event.preventDefault();
    const { signinRequest, form } = this.props;
    form.validateFields((error, values) => {
      const { login, password, remember } = values;
      if (error) {
        return;
      }
      signinRequest(login, password, remember);
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user, history, error } = this.props;
    !_.isEmpty(user) && history.push('/user');
    return (
      <div className="my-form d-flex justify-content-center pt-5">
        <Form onSubmit={this.handleAuthenticate}>
          <Form.Item>
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Please input your username!' }]
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }]
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              rules: [{ required: false }]
            })(
              <div>
                <label htmlFor="remember" className="w-100 cursor-pointer">
                  <Input type="checkbox" id="remember" />
                  <span className="ml-2">Remember me</span>
                </label>
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button mr-1">
              Log in
            </Button>
            Or
            <a href="/signup">
              <Button type="primary" className="login-form-button ml-1">
                Register now!
              </Button>
            </a>
          </Form.Item>
          {error && <h2 className="form-error">{error}</h2>}
        </Form>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

const mapStateToProps = store => ({
  error: store.auth.error,
  user: store.auth.user
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
