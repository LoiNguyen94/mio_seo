import { useRef, useImperativeHandle, forwardRef } from 'react';
import { toast } from 'react-toastify';
import { useNavigation } from '@nxseo/function-shares';

type ToastifyLoadingProps = {
  id?: number;
};
type Ref = {
  show: (content: string) => void;
  hide: (content: string) => void;
  success: (content: string, route: string) => void;
  fail: (content: string) => void;
};

const ToastifyLoading: React.ForwardRefRenderFunction<
  Ref,
  ToastifyLoadingProps
> = (props, ref) => {
  const toastId = useRef(null);
  const { pushRaw, goBack } = useNavigation();

  useImperativeHandle(ref, () => ({
    show: (content: string) => {
      // @ts-ignored
      toastId.current = toast.loading(content, {
        position: 'bottom-center',
      });
    },
    success: (content: string, route?: string) => {
      // @ts-ignored
      toast.update(toastId.current, {
        render: content,
        type: toast.TYPE.SUCCESS,
        isLoading: false,
        autoClose: 1000,
        onClose: () =>
          route
            ? route === 'back'
              ? goBack()
              : pushRaw(route)
            : console.log('done'),
      });
    },
    fail: (content: string) => {
      // @ts-ignored
      toast.update(toastId.current, {
        render: content,
        type: toast.TYPE.ERROR,
        isLoading: false,
        autoClose: 1000,
      });
    },
    hide: (content) => {
      toast.dismiss();
    },
  }));
  return <div></div>;
};

const ToastLoading = forwardRef(ToastifyLoading);
export type TypeToastifyLoading = React.ElementRef<typeof ToastLoading>;
export { ToastLoading };
