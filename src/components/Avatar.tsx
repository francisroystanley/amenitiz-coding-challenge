type Props = {
  name: string;
};

const Avatar = ({ name }: Props) => (
  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
    <span className="text-gray-500 text-xl font-bold">{name.charAt(0).toUpperCase()}</span>
  </div>
);

export default Avatar;
