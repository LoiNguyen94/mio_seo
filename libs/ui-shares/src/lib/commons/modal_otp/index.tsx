import { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Modal, Button, Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import OtpInput from 'react-otp-input';
import { useInterval } from '@nxseo/function-shares';
import styles from './modal.module.scss';
import { SvgList } from '@nxseo/ui-shares';
type ModalProps = {
  getOtp: (value: string) => void;
  phone: string;
  resendOtp?: () => void;
};

type ErrMsgOTP = { isValid: boolean; msg: string };
type Ref = {
  show: () => void;
  hide: () => void;
  setErrorMessage: (data: ErrMsgOTP) => void
};
const ModalOtpInput: React.ForwardRefRenderFunction<Ref, ModalProps> = (
  props,
  ref
) => {
  const { getOtp, phone, resendOtp } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [countdownTime, setCountDown] = useState(0);
  const [otp, setOtp] = useState('');
  const [err, setErr] = useState<ErrMsgOTP>({ isValid: true, msg: '' });
  useImperativeHandle(ref, () => ({
    show: () => {
      setIsModalVisible(true);
      setCountDown(120);
    },
    hide: () => hide(),
    setErrorMessage: ({ isValid, msg }: ErrMsgOTP) => setErr({ isValid, msg }),
  }));
  const hide = () => {
    setIsModalVisible(false);
    setCountDown(0);
    setOtp('');
    setErr({ isValid: true, msg: '' })
  };
  useInterval(
    () => {
      setCountDown((prevTimer) => prevTimer - 1);
    },
    countdownTime !== 0 ? 1000 : null
  );
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (value: string) => {
    setOtp(value);
  };

  const resetCount = () => {
    if (countdownTime === 0) {
      setOtp('');
      setCountDown(120);
      resendOtp?.();
      setErr({ isValid: true, msg: '' })
    }
  };

  const onclick = () => {
    getOtp(otp);
  };
  useEffect(() => {
    if (otp?.length === 4) {
      getOtp(otp);
    }
    if(otp.length < 4 && !err.isValid)  {
      setErr({ isValid: true, msg: '' })
    }
  }, [otp, getOtp]);
  return (
    <Modal
      wrapClassName="modal_otp"
      centered
      afterClose={hide}
      transitionName=""
      visible={isModalVisible}
      closable={false}
      footer={null}
      width="100%"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        maxWidth: 500,
      }}
      bodyStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Row
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className={styles['modal_otp_title']}>Nhập mã xác thực</div>
        <CloseOutlined
          style={{ position: 'absolute', right: 15 }}
          size={20}
          onClick={hide}
        />
      </Row>
      <div className={styles['title_send_to_phone']}>
        Mã xác thực đã được gửi đến (+84) {`${phone ?? ''}`}
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <OtpInput
          separator={
            <span>
              <strong>.</strong>
            </span>
          }
          isInputNum
          onChange={handleChange}
          value={otp}
          containerStyle={{ justifyContent: 'center' }}
          inputStyle={{
            width: 50,
            height: 50,
            margin: '0 0.5rem',
            fontSize: 20,
            padding: 0,
            borderRadius: 4,
            border: '1px solid rgba(0,0,0,0.3)',
            alignSelf: 'center',
            backgroundColor: '#F5F6F9',
          }}
        />
        <div
          style={{
            width: '100%',
            marginTop: 20,
            textAlign: 'center',
            color: 'red',
          }}
        >
          <div
            style={{
              width: '100%',
              // marginTop: 10,
              textAlign: 'center',
              color: 'red',
            }}
          >
            {!err.isValid ? (
              <>
                <SvgList.SvgErrorIcon /> {err.msg}
              </>
            ) : (
              <span></span>
            )}
          </div>
        </div>
        <Button
          onClick={onclick}
          style={{
            flex: 1,
            backgroundColor: otp.length === 4 ? '#EC4261' : '#FFB6C6',
            borderRadius: 10,
            color: '#FFFFFF',
            width: '100%',
            marginTop: 20,
            marginBottom: 12,
          }}
          type="primary"
          disabled={otp.length !== 4}
        >
          Xác nhận
        </Button>
        <div
          style={{
            color: countdownTime === 0 ? '#F0224F' : '#B6B6B6',
            marginTop: 16,
            cursor: 'pointer',
          }}
          onClick={resetCount}
        >
          Gửi lại mã xác nhận {`(${countdownTime})`}
        </div>
      </div>
    </Modal>
  );
};

const ModalOtp = forwardRef(ModalOtpInput);
export type TypeModalOtpInput = React.ElementRef<typeof ModalOtp>;
export { ModalOtp };
