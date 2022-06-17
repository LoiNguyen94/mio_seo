import { useWindowSize } from '@nxseo/function-shares';
import { Loading, SvgList, TransitionLayout } from '@nxseo/ui-shares';

export function Splash() {
  const { height, widthFixed } = useWindowSize();
  return (
    <div
      style={{
        display: 'flex',
        width: widthFixed,
        flex: 1,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SvgList.SvgMioIcon />
      <Loading />
    </div>
  );
}

export default Splash;
