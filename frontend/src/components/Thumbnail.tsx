interface thumbnail {
  title: string;
}

function Thumbnail({ title }: thumbnail) {


  return (
    <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-24 h-24 bg-white opacity-20 rounded-full -translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-white opacity-20 rounded-full translate-x-8 translate-y-8"></div>

      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-2xl font-bold truncate">{title}</h1>
      </div>
    </div>
  );
}

export default Thumbnail;
