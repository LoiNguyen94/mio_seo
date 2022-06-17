import { useEffect, useState } from 'react';

const useCountdown = (targetDate: any) => {
  const countDownDate = new Date(targetDate).getTime();
  console.log(targetDate);

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return getReturnValues(countDown);
};

const getReturnValues = (countDown: any) => {
  // calculate time left
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  const daysFormat = days < 10 ? '0' + days : days;
  const hoursFormat = hours < 10 ? '0' + hours : hours;
  const minutesFormat = minutes < 10 ? '0' + minutes : minutes;
  const secondsFormat = seconds < 10 ? '0' + seconds : seconds;

  return [daysFormat, hoursFormat, minutesFormat, secondsFormat];
};

export { useCountdown };

export default useCountdown;