import { MainLayout, Header, withIonicPage } from '@nxseo/ui-shares';
import { useCallback, useRef, useState } from 'react';
import { ModalOtp, TypeModalOtpInput, Loading } from '@nxseo/ui-shares';
import ForgetForm, { ForgotData, ForgotFormType } from './forgot_form';
import {
  sendOtpApi,
  forgotPasswordApi,
  phoneExistApi,
  handleResponse,
  useWindowSize,
} from '@nxseo/function-shares';
import dynamic from 'next/dynamic';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
function ForgetPassword() {
  const route = useRouter();
  const { height, widthFixed } = useWindowSize();
  const refModalOtp = useRef<TypeModalOtpInput>();
  const [data, setData] = useState<ForgotData>();
  const [isLoading, setLoading] = useState<boolean>();
  const refForm = useRef<ForgotFormType>();
  const showModal = useCallback(() => {
    refModalOtp.current.show();
  }, []);
  const updateNewPwd = async (value: string) => {
    try {
      const res = await forgotPasswordApi({
        otpCode: value,
        password: data.password,
        phone: data.phone,
      });
      handleResponse({
        res,
        success: () => {
          toast.success('Thay đổi mật khẩu thành công');
          route.back();
          refModalOtp.current.hide();
        },
        error: () => {
          refModalOtp.current.setErrorMessage({
            isValid: false,
            msg: res.data.data?.message ?? res.data?.status?.message,
          });
        },
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ?? 'Thay đổi mật khẩu không thành công'
      );
      refForm.current.setMessageError({
        isValid: false,
        msg: error?.response?.data?.message,
      });
    }
  };

  const resendOtp = () => {
    sendOtpApi(data.phone);
  };

  const submit = async (value: ForgotData) => {
    setLoading(true);
    try {
      setData(value);
      const res = await phoneExistApi(value.phone);
      if (res.data.data.isExist) {
        await sendOtpApi(value.phone);
        showModal();
      } else {
        refForm.current.setMessageError({
          isValid: false,
          msg: !res.data.data.isExist
            ? 'Số điện thoại không tồn tại'
            : res.data.status.message,
        });
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      refForm.current.setMessageError({
        isValid: false,
        msg: error?.response?.data?.message,
      });
    }
  };
  return (
    <MainLayout title="Tất cả sản phẩm" description="Mua mọi thứ" photo="">
        <Header title={'Quên mật khẩu'} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            marginTop: 0,
            alignItems: 'center',
            backgroundColor: '#f5f6f9',
            width: widthFixed,
            height: height,
          }}
        >
          <ForgetForm onSubmit={submit} ref={refForm} />
        </div>
        <ModalOtp
          getOtp={updateNewPwd}
          resendOtp={resendOtp}
          ref={refModalOtp}
          phone={data?.phone ?? ''}
        />
        {isLoading ? <Loading /> : null}
    </MainLayout>
  );
}

export async function getStaticProps(context) {
  return { props: {} };
}

export default dynamic(() => Promise.resolve(withIonicPage(ForgetPassword)), { ssr: false });
