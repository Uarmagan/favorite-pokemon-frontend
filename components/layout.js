export const Layout = (props) => {
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col align-center">
      {props.children}
    </div>
  );
};
