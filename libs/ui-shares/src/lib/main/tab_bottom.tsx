import { useState, useEffect } from 'react';
import { SvgList, Buttons } from '@nxseo/ui-shares';
import {
  SCREEN,
  setTabPosition,
  useAppSelector,
  useNavigation,
  useWindowSize,
} from '@nxseo/function-shares';
import { useDispatch } from 'react-redux';
import { useTransition, config, useSpringRef, animated } from 'react-spring';
export interface TabBottomProps {
  title?: string;
  description?: string;
  photo?: string;
  width?: number;
}

export function TabBottom({ width }: TabBottomProps) {
  const { widthFixed } = useWindowSize();
  const [focusTab, setFocusTab] = useState(0);
  const [auth, setAuth] = useState(false);
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const { push } = useNavigation();
  const transRef = useSpringRef();

  useEffect(() => {
    if (token) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [token]);

  const Items = [
    {
      id: 0,
      title: 'Mio',
      icon: <SvgList.SvgTabMioIcon keyFocus={focusTab} colorFocus="#F0224F" />,
    },
    {
      id: 1,
      title: 'Partners',
      icon: (
        <SvgList.SvgTabPartnerIcon keyFocus={focusTab} colorFocus="#F0224F" />
      ),
    },
    {
      id: 2,
      title: 'Đơn hàng',
      icon: (
        <SvgList.SvgTabOrderIcon keyFocus={focusTab} colorFocus="#F0224F" />
      ),
    },
    {
      id: 3,
      title: 'Trợ lý',
      icon: (
        <SvgList.SvgTabAssistantIcon keyFocus={focusTab} colorFocus="#F0224F" />
      ),
    },
    {
      id: 4,
      title: 'Tài khoản',
      icon: (
        <SvgList.SvgTabProfileIcon keyFocus={focusTab} colorFocus="#F0224F" />
      ),
    },
  ];

  const setTab = (id: number) => {
    setFocusTab(id);
    dispatch(setTabPosition(id));
  };

  const goToLogin = () => {
    push(SCREEN.login);
  };

  const transitions = useTransition(true, {
    // config: config.molasses,
    from: { opacity: 0, transform: 'translate3d(0, 15%, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0%, 0)' },
    leave: { opacity: 0, height: 0, transform: 'translate3d(0, -15%, 0)' },
    delay: 500,
    // keys: list.map((item, index) => index)
  });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {transitions((styles, item) => (
        // className={`${styles['container_tab']} ${styles['p_12_20_0_20']}`}
        <animated.div
          style={{
            ...styles,
            backgroundColor: '#ffffff',
            display: 'flex',
            justifyContent: 'space-around',
            height: '80px',
            borderRadius: '12px 12px 0px 0px',
            width: widthFixed,
            padding: '12px 20px 0px 20px',
          }}
        >
          {!auth ? (
            <Buttons
              title="Đăng nhập ngay"
              handleClick={goToLogin}
              bgColor={'#EC4261'}
              titleColor={'#FFFFFF'}
            />
          ) : (
            Items.map((item) => (
              <div
                onClick={() => setTab(item.id)}
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  width: 60,
                }}
              >
                {item.icon}
                <div
                  style={
                    item.id === focusTab
                      ? { fontSize: 12, color: '#F0224F', fontWeight: 700 }
                      : { fontSize: 12, color: '#9CA5B4', fontWeight: 400 }
                  }
                >
                  {item.title}
                </div>
              </div>
            ))
          )}
        </animated.div>
      ))}
    </div>
  );
}

export default TabBottom;
