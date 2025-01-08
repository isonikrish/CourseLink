

function Overview({course}:any) {
 
  const status = course?.status;
  const sales = course?.enrollments.length;

  return (
    <div>
      <h1 className="text-3xl font-bold px-10 py-5">
        Overview
      </h1>

      <div className="stats shadow border border-base-200 w-full">
        <div className="stat place-items-center">
          <div className="stat-title">Total Sales</div>
          <div className="stat-value">{sales}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Lectures</div>
          <div className="stat-value">{course?.Lecture.length}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Total Revenue</div>
          <div className="stat-value">0</div>
        </div>
      </div>

      <div className="mt-6 mx-5">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border border-base-300">
          Status:{" "}
          <span
            className={`ml-2 text-primary ${
              status === "unpublished" ? "text-red-600" : "text-green-300"
            }`}
          >
            {status}
          </span>
        </span>
        
      </div>
      
    </div>
  );
}

export default Overview;
