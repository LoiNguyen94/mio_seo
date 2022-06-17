import Link from 'next/link';
import { Form, Input, Button } from 'antd';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  CloseOutlined,
} from '@ant-design/icons';
import styles from './login.module.scss';
import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState,
} from 'react';
import { SvgList } from '../../assets/store.svg';
import { phoneNumberValidReg, SCREEN, useNavigation } from '@nxseo/function-shares';

interface Props {
  onSubmit: ({ phone, password }: { phone: string; password: string }) => void;
}
type Ref = {
  setMessageError: ({
    isValid,
    msg,
  }: {
    isValid: boolean;
    msg: string;
  }) => void;
};
const FormLogin: ForwardRefRenderFunction<Ref, Props> = (props, ref) => {
  const { onSubmit } = props;
  const { push } = useNavigation();
  const onFinish = async (values: { phone: string; password: string }) => {
    onSubmit(values);
  };
  const [form] = Form.useForm();
  const [errors, setErrors] = useState({
    phone: { isValid: true, msg: '' },
    password: { isValid: true, msg: '' },
  });
  const [msgError, setMsgError] = useState({ isValid: true, msg: '' });

  useImperativeHandle(ref, () => ({
    setMessageError: ({ isValid, msg }) => {
      setMsgError({ isValid, msg });
    },
  }));

  const onFocus = () => {
    if (!msgError.isValid) {
      setMsgError({ isValid: true, msg: '' });
    }
  };

  const renderError = (key: keyof typeof errors) => {
    return (
      <div
        style={{
          width: '100%',
          color: 'red',
          marginTop: 10,
        }}
      >
        {!errors[key].isValid ? (
          <>
            <SvgList.SvgErrorIcon /> {errors[key].msg}
          </>
        ) : (
          <span></span>
        )}
      </div>
    );
  };

  const goToForget= () => {
    push(SCREEN.forget_password)
  }
  
  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFocus={onFocus}
      form={form}
    >
      <Form.Item
        noStyle
        name="phone"
        rules={[
          () => ({
            validator(_, value) {
              if (value && value.match(phoneNumberValidReg)) {
                setErrors((errors) => ({
                  ...errors,
                  phone: { isValid: true, msg: '' },
                }));
                return Promise.resolve();
              }
              setErrors((errors) => ({
                ...errors,
                phone: {
                  isValid: false,
                  msg:
                    value && !value.match(phoneNumberValidReg)
                      ? 'Số điện thoại không hợp lệ.'
                      : 'Vui lòng nhập số điện thoại.',
                },
              }));
              return Promise.reject();
            },
          }),
        ]}
      >
        <Input
          placeholder="Số điện thoai"
          className="input-auth-phone"
          style={{
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            marginTop: 20,
          }}
          allowClear={{ clearIcon: <CloseOutlined /> }}
        />
      </Form.Item>
      {renderError('phone')}
      <Form.Item
        noStyle
        name="password"
        className="form-item-password"
        rules={[
          () => ({
            template: '',
            validator(_, value) {
              if (value && value.length >= 6) {
                setErrors((errors) => ({
                  ...errors,
                  password: { isValid: true, msg: '' },
                }));
                return Promise.resolve();
              }
              setErrors((errors) => ({
                ...errors,
                password: {
                  isValid: false,
                  msg:
                    value && value.length < 6
                      ? 'Mật khẩu phải có ít nhất 6 ký tự.'
                      : 'Vui lòng nhập mật khẩu.',
                },
              }));
              return Promise.reject();
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Mật khẩu"
          className="input-auth"
          autoComplete='on'
          style={{
            borderRadius: 10,
            backgroundColor: '#FFFFFF',
            borderWidth: 0,
            marginTop: 10,
          }}
          iconRender={(visible) =>
            form.getFieldValue('password') ? (
              visible ? (
                <EyeTwoTone />
              ) : (
                <EyeInvisibleOutlined />
              )
            ) : (
              <span />
            )
          }
        />
      </Form.Item>
      {renderError('password')}

      <div
        style={{
          width: '100%',
          marginTop: 10,
          textAlign: 'center',
          color: 'red',
        }}
      >
        {!msgError.isValid ? (
          <>
            <SvgList.SvgErrorIcon /> {msgError.msg}
          </>
        ) : (
          <span></span>
        )}
      </div>
      <Form.Item>
        <Button
          htmlType="submit"
          style={{
            height: 44,
            borderRadius: 10,
            backgroundColor: '#EC4261',
            color: '#FFFFFF',
            width: '100%',
            marginTop: 16,
          }}
        >
          Đăng nhập
        </Button>
          <div className={styles['login-form-forget']} onClick={goToForget}>Quên mật khẩu</div>
      </Form.Item>
    </Form>
  );
};
const LoginForm = forwardRef(FormLogin);
export type LoginFormType = React.ElementRef<typeof LoginForm>;
export { LoginForm };
