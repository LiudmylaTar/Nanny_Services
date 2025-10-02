import icons from "./sprite.svg";

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className }) => {
  return (
    <svg className={className}>
      <use href={`${icons}#icon-${name}`} />
    </svg>
  );
};

export default Icon;
