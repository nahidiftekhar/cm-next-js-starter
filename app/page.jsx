"use client";
import { useSession } from "next-auth/react";

const Page = ({}) => {
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-x-5 gap-y-3">
        <div className="h-80 overflow-y-auto border rounded">
          <p className="text-orange-600">{JSON.stringify(session, null, 2)}</p>
        </div>

        <div className="h-80 border rounded flex items-center justify-center bg-emerald-200">
          <p className="">Other contents</p>          
        </div>

      </div>
    </div>
  );
};

export default Page;
