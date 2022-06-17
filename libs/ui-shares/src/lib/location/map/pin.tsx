import locationPin from './location-pin.json';
import Lottie from 'lottie-react';
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: locationPin,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};
export const Pin = () => {
  return (
    <Lottie
      {...defaultOptions}
      animationData={locationPin}
      style={{ width: 60, height: 60 }}
      loop={true}
    />
  );
};

export default Pin;
