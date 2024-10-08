
const Loader = () => {
  return (
    <div className=" z-30 fixed top-0 left-0  backdrop-blur-sm  min-w-full flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
};

export default Loader;
