import { FaStar } from "react-icons/fa";

function CourseCard({id}:any) {
  return (
    <div className="w-[350px] border border-base-300 rounded-xl mx-5 my-5">
      <div>
        <img
          src="https://via.placeholder.com/380x200"
          className="rounded-t-xl"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-bold">Helloasjhddddddddddddd world</h3>
        <div className="flex items-center justify-between gap-2 ">
          <p className="text-sm">
            By <span className="font-bold">Hdakshdks {id}</span>
          </p>

          <span className="badge badge-outline border-gray-400">Category</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span>5</span>
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <FaStar className="text-yellow-500" />
          <span>(200)</span>
        </div>
        <div className="text-xl font-bold">$89,400</div>
        <button className="btn w-full rounded-full">View Details</button>
      </div>
    </div>
  );
}

export default CourseCard;
