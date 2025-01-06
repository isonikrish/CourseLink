
function PreviewVideo({ video, thumbnailTitle }: any) {
  return (
    <div className="px-10 text-center w-1/2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Preview</h1>
      </div>

      <div className="mt-5 w-96">

        <video controls className="w-full">
          <source src={video} type="video/mp4" />
          {/* Add other formats if necessary */}
        </video>
      </div>
    </div>
  );
}

export default PreviewVideo;
