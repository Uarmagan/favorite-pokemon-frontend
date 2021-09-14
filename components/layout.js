export const Layout = (props) => {
  return (
    <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 flex flex-col items-center">
      {props.children}
    </div>
  );
};
