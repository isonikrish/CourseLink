import { Lock, MoveLeft } from "lucide-react";

function NoAccess({setMenu}:any) {
  return (
    <div className="flex justify-center min-h-screen p-4">
      <div className="text-center max-w-lg w-full flex justify-center flex-col items-center">
        <div>
          <Lock  className="w-20 h-20 mb-6"/>
        </div>
        <h1 className="text-3xl font-semibold mb-4">Access Denied</h1>

        <p className="text-lg mb-4">
          You do not have permission to access this page. Please go back to the previous page.
        </p>
        <button className="btn w-full md:w-auto px-6 py-3 flex items-center justify-center gap-2 mt-10"onClick={()=>setMenu("overview")}>
          <MoveLeft />
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NoAccess;
