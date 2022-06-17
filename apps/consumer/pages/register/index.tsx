import { Capacitor } from '@capacitor/core';
import { useCallback, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  MainLayout,
  Header,
  SvgList,
  RegisterForm,
  RegisterData,
  RegisterFormType,
  Loading,
  withIonicPage,
} from '@nxseo/ui-shares';
import { Storage } from '@capacitor/storage';
import { ModalOtp, TypeModalOtpInput } from '@nxseo/ui-shares';
import {
  genRefererIdApi,
  getProfileApi,
  handleResponse,
  loginSuccess,
  phoneExistApi,
  SCREEN,
  sendOtpApi,
  setDefaultToken,
  signupApi,
  useNavigation,
  useWindowSize,
} from '@nxseo/function-shares';
import { SignUpParam } from '@nxseo/function-shares';
import styles from './register.module.scss';
import { Row } from 'antd';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

function Register() {
  const refModalOtp = useRef<TypeModalOtpInput>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [registerData, setRegisterData] = useState<SignUpParam>();
  const { height, widthFixed } = useWindowSize();
  const { goBack, replaceScreen } = useNavigation();
  const dispatch = useDispatch();
  const showModal = useCallback(() => {
    refModalOtp.current.show();
  }, []);
  const refForm = useRef<RegisterFormType>();
  const resendOtp = () => {
    sendOtpApi(registerData?.phone);
  };
  const submit = async (value: RegisterData) => {
    setLoading(true);
    setRegisterData({
      address: '',
      fullName: value.username,
      phone: value.phone,
      platform: Capacitor.getPlatform() || '',
      otpCode: '',
      referer_id: '',
      password: value.password,
    });
    try {
      const res = await phoneExistApi(value.phone);
      if (!res.data.data?.isExist) {
        const code = value?.partner_id?.length ? value?.partner_id : '24062020';
        const response = await genRefererIdApi(code);
        if (response?.data?.data?.entity_id) {
          await sendOtpApi(value.phone);

          setRegisterData((preState) => ({
            ...preState,
            referer_id: response.data.data.entity_id,
          }));
          showModal();
        } else {
          refForm.current.setMessageError({
            isValid: false,
            msg: response.data.data.message ?? response.data.status.message,
          });
        }
      } else {
        refForm.current.setMessageError({
          isValid: false,
          msg: 'Tài khoản đã tồn tại',
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      refForm.current.setMessageError({
        isValid: false,
        msg: error?.response?.data?.message ?? '',
      });
    }
  };
  const getOtp = useCallback(
    async (value: string) => {
      try {
        const res = await signupApi({ ...registerData, otpCode: value });
        if (res.data.status.code === 200) {
          toast.success(res?.data?.data?.message);
          setDefaultToken(res.data.data?.token);
          const response = await getProfileApi();
          handleResponse({
            res: response,
            success: () => {
              dispatch(
                loginSuccess({
                  token: res.data.data?.token,
                  profile: response.data.data.profile,
                })
              );
              Storage.set({ key: 'token', value: res.data.data?.token ?? '' });
              Storage.set({
                key: 'profile',
                value: JSON.stringify(response.data.data?.profile ?? {}),
              });
              replaceScreen(SCREEN.home);
            },
            error: () => {
              replaceScreen(SCREEN.home);
            },
          });
        } else {
          refModalOtp.current.setErrorMessage({
            isValid: false,
            msg: res.data.data?.message ?? res.data?.status?.message,
          });
          // toast.error(res?.data?.data?.message ?? res?.data?.status?.message);
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message ?? err?.response?.status?.message
        );
      }
    },
    [registerData]
  );
  return (
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
      <Header title={'Đăng ký tài khoản'} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          alignItems: 'center',
        }}
      >
        <div style={{ marginTop: 120 }}>
          <SvgList.SvgMioIcon />
        </div>
        <RegisterForm onSubmit={submit} ref={refForm} />
        <div className={styles['service-privacy-note']}>
          Bằng việc đăng ký, bạn đã đồng ý với
        </div>
        <Row className={styles['service-privacy-note']}>
          <div style={{ color: '#f0224f', marginRight: 4 }}>
            Điều khoản Dịch vụ
          </div>{' '}
          &
          <div style={{ color: '#f0224f', marginLeft: 4, marginRight: 4 }}>
            Chính sách Riêng tư
          </div>{' '}
          của Mio.
        </Row>
      </div>
      <Link href="/login" passHref>
        <div className={styles['login-form-register']} onClick={()=> goBack()}>
          Bạn đã có tài khoản?
          <div className={styles['btn-register']}>Đăng nhập</div>
        </div>
      </Link>
      <ModalOtp
        getOtp={getOtp}
        resendOtp={resendOtp}
        ref={refModalOtp}
        phone={registerData?.phone}
      />
      {isLoading ? <Loading /> : null}
    </div>
  );
}

export async function getStaticProps(context) {
  return { props: {} };
}
export default dynamic(() => Promise.resolve(withIonicPage(Register)), {
  ssr: false,
});
