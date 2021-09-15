export const Layout = (props) => {
  return (
    <div className='sm:max-w-full max-w-7xl sm:w-screen w-7/12 mx-auto sm:px-6 lg:px-8 flex flex-col items-center h-4/5'>
      {props.children}
    </div>
  );
};
