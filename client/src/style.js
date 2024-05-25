const styles = {
  boxContainer: 'w-full md:max-w-5xl mx-auto',
  flexCenter: 'flex justify-center items-center',
  flexStart: 'flex justify-start items-center',
  flexBetween: 'flex justify-between items-center',
  flexBetweenMd: 'md:flex md:justify-between md:items-center',
  paddingX: 'sm:px-16 px-6',
  paddingY: 'sm:py-16 py-6',
  padding: 'sm:px-4 p-3',

  marginX: 'sm:mx-16 mx-6',
  marginY: 'sm:my-16 my-6',

  tooltipContainer: 'group relative',
  tooltipItem:
    'group-hover:block hidden absolute top-0 right-0 translate-y-5 bg-transparent pt-3 bg-white font-bold shadow-lg ',

  input:
    'border border-gray-300 text-gray-900 text-sm  focus:ring-red-400 focus:border-red-400 block w-full p-4',
  navLink: ({ isActive }) => (isActive ? 'text-orange-400' : ''),
};

export const layout = {
  containerCart:
    'grid md:grid-cols-1 lg:grid-cols-[2.5fr_1.5fr] lg:place-items-start gap-4',
  boxCart:
    'bg-bgPrimary italic p-6 flex flex-col justify-between w-fit md:w-full gap-3',
};

export default styles;
