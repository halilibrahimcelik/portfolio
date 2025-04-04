type Props = { children: React.ReactNode };
const MainTemplate = ({ children }: Props) => {
  return <div className='animate-appear'>{children}</div>;
};
export default MainTemplate;
