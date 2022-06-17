import SpringPathColor from './extra/spring_path_color';

export default function SvgTabMioIcon({
  color = '#B6BDCB',
  colorFocus,
  keyFocus,
}: {
  color?: string;
  colorFocus?: string;
  keyFocus?: number;
}) {
  const focus = keyFocus !== 0;
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <rect width="30" height="30" fill={color} />
      <path d="M0 0H30V30H0V0Z" fill="white" />
      <SpringPathColor
        d={[
          'M5 13.75C5 12.1762 5.74097 10.6943 7 9.75L13.5 4.875C14.3889 4.20833 15.6111 4.20833 16.5 4.875L23 9.75C24.259 10.6943 25 12.1762 25 13.75V22.5C25 23.8807 23.8807 25 22.5 25H19.375C18.6846 25 18.125 24.4404 18.125 23.75V18.75C18.125 18.0596 17.5654 17.5 16.875 17.5H13.125C12.4346 17.5 11.875 18.0596 11.875 18.75V23.75C11.875 24.4404 11.3154 25 10.625 25H7.5C6.11929 25 5 23.8807 5 22.5V13.75Z',
        ]}
        focus={focus}
        colorFocus={colorFocus}
        color={color}
      />
      {/* <path
        d="M5 13.75C5 12.1762 5.74097 10.6943 7 9.75L13.5 4.875C14.3889 4.20833 15.6111 4.20833 16.5 4.875L23 9.75C24.259 10.6943 25 12.1762 25 13.75V22.5C25 23.8807 23.8807 25 22.5 25H19.375C18.6846 25 18.125 24.4404 18.125 23.75V18.75C18.125 18.0596 17.5654 17.5 16.875 17.5H13.125C12.4346 17.5 11.875 18.0596 11.875 18.75V23.75C11.875 24.4404 11.3154 25 10.625 25H7.5C6.11929 25 5 23.8807 5 22.5V13.75Z"
        fill={focus ? color : colorFocus}
        stroke={focus ? color : colorFocus}
      /> */}
    </svg>
  );
}
