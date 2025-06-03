type Props = {
  bgColor: string;
  textColor: string;
  text: string;
};

const Badge = ({ bgColor, text, textColor }: Props) => (
  <span className={`${bgColor} ${textColor} font-semibold px-2 py-0.5 rounded text-sm`}>{text}</span>
);

export default Badge;
