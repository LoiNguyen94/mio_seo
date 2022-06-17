import {
  TransitionLayout,
  Header,
  SvgList,
  LoginForm,
  Loading,
  LoginFormType,
  withIonicPage,
} from '@nxseo/ui-shares';
import {
  handleResponse,
  loginApi,
  setDefaultToken,
  useWindowSize,
  fetchListAddressConfig,
  useNavigation,
  SCREEN,
  isWeb,
} from '@nxseo/function-shares';
import styles from './login.module.scss';
import { Storage } from '@capacitor/storage';
import { useRouter } from 'next/router';
import { loginSuccess } from '@nxseo/function-shares';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
export interface LoginProps {
  id: number;
  data: any;
}

function LoginScreen(props: LoginProps) {
  const { replaceScreen, push } = useNavigation();
  const dispatch = useDispatch();
  const refForm = useRef<LoginFormType>();
  const { height, widthFixed } = useWindowSize();
  const [isLoading, setLoading] = useState<boolean>(false);
  const submit = ({ phone, password }: { phone: string; password: string }) => {
    setLoading(true);
    loginApi(phone, password)
      .then(async (res) => {
        handleResponse({
          res,
          success: async (res) => {
            toast.success('Đăng nhập thành công');
            dispatch(
              loginSuccess({
                token: res.data.data.token,
                profile: res.data.data.profile,
              })
            );
            setLoading(false);
            await Storage.set({ key: 'token', value: res.data.data.token });
            await Storage.set({
              key: 'profile',
              value: JSON.stringify(res.data.data.profile),
            });
            setDefaultToken(res.data.data.token);
            fetchListAddressConfig();
            if (isWeb) push(SCREEN.home);
            else replaceScreen(SCREEN.root);
          },
          error: (res) => {
            refForm.current.setMessageError({
              isValid: false,
              msg: res?.data?.data?.message ?? res?.data?.status?.message,
            });
            setLoading(false);
          },
        });
      })
      .catch((err) => {
        setLoading(false);
        refForm.current.setMessageError({
          isValid: false,
          msg: err?.response?.data?.message ?? '',
        });
      });
  };
  const goToRegister = () => {
    push(SCREEN.register);
  };
  return (
    <TransitionLayout
      title="Tất cả sản phẩm"
      description="Mua mọi thứ"
      photo=""
    >
      <div
        style={{
          display: 'flex',
          width: widthFixed,
          flex: 1,
          flexDirection: 'column',
          height: height,
          backgroundColor: '#f5f6f9',
        }}
      >
        <Header title={'Đăng nhập'} />
        <div className={styles['wrapper-content']}>
          <div style={{ marginTop: 120 }}>
            <SvgList.SvgMioIcon />
          </div>
          <LoginForm onSubmit={submit} ref={refForm} />
        </div>
        <div className={styles['login-form-register']} onClick={goToRegister}>
          Bạn chưa có tài khoản?
          <div className={styles['btn-register']}>Đăng ký</div>
        </div>
        {isLoading ? <Loading /> : null}
      </div>
    </TransitionLayout>
  );
}
export default dynamic(() => Promise.resolve(withIonicPage(LoginScreen)), {
  ssr: false,
});
