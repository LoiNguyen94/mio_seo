export default function SvgRightArrow({
  width = '11',
  height = '20',
  color = '#00A57B',
}: {
  width?: string;
  height?: string;
  color?: string;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 11 20" fill="none">
      <path
        d="M0.357746 2.36397L7.54936 9.64929L0.357745 16.9346C-0.119249 17.4178 -0.119249 18.1984 0.357745 18.6816C0.83474 19.1648 1.60527 19.1648 2.08226 18.6816L10.1423 10.5166C10.6192 10.0334 10.6192 9.25281 10.1423 8.7696L2.08227 0.604595C1.60527 0.121385 0.834741 0.121385 0.357746 0.604595C-0.107018 1.0878 -0.119249 1.88076 0.357746 2.36397Z"
        fill={color}
      />
    </svg>
  );
}
