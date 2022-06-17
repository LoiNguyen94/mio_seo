import SpringPathColor from './extra/spring_path_color';

export default function SvgTabProfileIcon({
  color = '#B6BDCB',
  colorFocus,
  keyFocus,
}: {
  color?: string;
  colorFocus?: string;
  keyFocus?: number;
}) {
  const focus = keyFocus !== 4;

  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path d="M0 0H30V30H0V0Z" fill="white" />

      <path
        d="M3.75 23.75C3.75 20.9886 5.98858 18.75 8.75 18.75H21.25C24.0114 18.75 26.25 20.9886 26.25 23.75V25C26.25 25.6904 25.6904 26.25 25 26.25H5C4.30964 26.25 3.75 25.6904 3.75 25V23.75Z"
        fill="white"
      />
      <SpringPathColor
        d={[
          'M2.5 23.75C2.5 20.2982 5.29822 17.5 8.75 17.5H21.25C24.7018 17.5 27.5 20.2982 27.5 23.75V25C27.5 26.3807 26.3807 27.5 25 27.5H5C3.61929 27.5 2.5 26.3807 2.5 25V23.75ZM8.75 20C6.67893 20 5 21.6789 5 23.75V25H25V23.75C25 21.6789 23.3211 20 21.25 20H8.75Z',
        ]}
        focus={focus}
        colorFocus={colorFocus}
        color={color}
      />
      {/* <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 23.75C2.5 20.2982 5.29822 17.5 8.75 17.5H21.25C24.7018 17.5 27.5 20.2982 27.5 23.75V25C27.5 26.3807 26.3807 27.5 25 27.5H5C3.61929 27.5 2.5 26.3807 2.5 25V23.75ZM8.75 20C6.67893 20 5 21.6789 5 23.75V25H25V23.75C25 21.6789 23.3211 20 21.25 20H8.75Z"
        fill={!focus ? color : colorFocus}
      /> */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 8.75C10 5.98858 12.2386 3.75 15 3.75C17.7614 3.75 20 5.98858 20 8.75C20 11.5114 17.7614 13.75 15 13.75C12.2386 13.75 10 11.5114 10 8.75Z"
        fill="white"
      />
      <SpringPathColor
        d={[
          'M8.75 8.75C8.75 5.29822 11.5482 2.5 15 2.5C18.4518 2.5 21.25 5.29822 21.25 8.75C21.25 12.2018 18.4518 15 15 15C11.5482 15 8.75 12.2018 8.75 8.75ZM15 5C12.9289 5 11.25 6.67893 11.25 8.75C11.25 10.8211 12.9289 12.5 15 12.5C17.0711 12.5 18.75 10.8211 18.75 8.75C18.75 6.67893 17.0711 5 15 5Z',
        ]}
        focus={focus}
        colorFocus={colorFocus}
        color={color}
      />
      {/* <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 8.75C8.75 5.29822 11.5482 2.5 15 2.5C18.4518 2.5 21.25 5.29822 21.25 8.75C21.25 12.2018 18.4518 15 15 15C11.5482 15 8.75 12.2018 8.75 8.75ZM15 5C12.9289 5 11.25 6.67893 11.25 8.75C11.25 10.8211 12.9289 12.5 15 12.5C17.0711 12.5 18.75 10.8211 18.75 8.75C18.75 6.67893 17.0711 5 15 5Z"
        fill={!focus ? color : colorFocus}
      /> */}
    </svg>
  );
}
