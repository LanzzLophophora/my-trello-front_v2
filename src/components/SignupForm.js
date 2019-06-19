import React from 'react';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';

import { Form, Input, Tooltip, Icon, Button } from 'antd';

import { signupRequest } from '../store/auth/actions';
class NormalRegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    error: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const { signupRequest, form } = this.props;
    form.validateFieldsAndScroll((error, values) => {
      const { password, confirm, login } = values;
      if (password !== confirm) {
        this.setState({
          error: "Incorrect confirm password!"
        })
      } else {
        signupRequest(login, password);
        setTimeout(() => {
          !error &&  this.props.history.push('/signin');
        }, 1000);
      }
    });
  };

  componentDidMount() {
    const { history, user, error } = this.props;
    this.setState({
      error
    });
    if (!_.isEmpty(user)) {
      history.push('/');
    }
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { error } = this.state;

    return (
      <div className={"my-form"}>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            label={(
              <span>
              Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
            )}
          >
            {getFieldDecorator('login', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input/>
            )}
          </Form.Item>
          <Form.Item
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password"/>
            )}
          </Form.Item>
          <Form.Item
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur}/>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
          {error && <p className="ant-row error">{error}</p>}
        </Form>
      </div>
    );
  }
}

const SignupForm = Form.create({ name: 'signup' })(NormalRegistrationForm);

const mapStateToProps = store => ({
  user: store.auth.user,
  error: store.auth.error,
});

const mapDispatchToProps = {
  signupRequest
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SignupForm)
);
