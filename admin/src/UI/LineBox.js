const LineBox = ({ title, children }) => {
  return (
    <>
      <p className='flex-b-c border-b border-gray-400'>
        <span className='font-semibold text-base'>{title}</span>
        <span className='text-gray-500 text-sm'>{children}</span>
      </p>
    </>
  );
};
export default LineBox;
