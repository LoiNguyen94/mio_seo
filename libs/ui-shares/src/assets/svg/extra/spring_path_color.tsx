import { Spring, animated } from 'react-spring';

export default function SpringPathColor({
  d,
  color = '#B6BDCB',
  colorFocus,
  focus = false,
}: {
  d: string[];
  color?: string;
  colorFocus?: string;
  focus?: boolean;
}) {
  return (
    <>
      {d.map((item, index) => (
        <Spring
          key={index}
          from={{
            fill: !focus ? color : colorFocus,
            stroke: !focus ? color : colorFocus,
          }}
          to={[
            {
              fill: focus ? color : colorFocus,
              stroke: focus ? color : colorFocus,
            },
          ]}
          delay={1}
        >
          {(styles) => (
            <animated.path
              style={styles}
              d={item}
              fillRule="evenodd"
              clipRule="evenodd"
              // fill={focus ? color : colorFocus}
              // stroke={focus ? color : colorFocus}
            />
          )}
        </Spring>
      ))}
    </>
  );
}
