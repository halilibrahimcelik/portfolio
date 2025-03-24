import Image from 'next/image';

type Props = {
  title: string;
  description?: string;
  imgUrl: string;
};
const TickerItem: React.FC<Props> = ({ title, description, imgUrl }) => {
  return (
    <div className='relative z-1 flex flex-col justify-center items-center gap-2 p-1'>
      <Image src={imgUrl} alt={title} width={50} height={50} />
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};

export default TickerItem;
