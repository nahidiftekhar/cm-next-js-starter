const Loader = ({size}) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white opacity-10">
      <div className={`h-${size||'16'} w-${size||16} animate-spin rounded-full border-4 border-solid border-primary border-t-transparent`}></div>
    </div>
  );
};

export default Loader;
