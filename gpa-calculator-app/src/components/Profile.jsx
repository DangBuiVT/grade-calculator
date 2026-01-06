import React from "react";

export default function Profile() {
  return (
    <div className="flex flex-col shadow-md p-5 row-span-2 bg-white gap-5">
      <h1 className="text-2xl">Student Profile</h1>
      <div className="flex justify-center w-full">
        <img
          src="images/blank-profile-picture.jpg"
          alt="Student Profile Photo"
          className="rounded-full w-1/2 "
        />
      </div>

      <h5 className="text-xl text-gray-500">John Doe</h5>

      <div className="relative text-gray-500 flex border-b-1 border-gray-300 pb-2 mb-2 text-lg justify-between mt-4">
        <h6 className="font-bold">College:</h6>
        <p className="ml-2">ABC University</p>
      </div>
      <div className="relative text-gray-500 flex border-b-1 border-gray-300 pb-2 mb-2 text-lg justify-between">
        <h6 className="font-bold">Start year:</h6>
        <p className="ml-2">2022</p>
      </div>
      <div className="relative text-gray-500 flex border-b-1 border-gray-300 pb-2 mb-2 text-lg justify-between">
        <h6 className="font-bold">Faculty:</h6>
        <p className="ml-2">Computer</p>
      </div>
      <div className="relative text-gray-500 flex border-b-1 border-gray-300 pb-2 mb-2 text-lg justify-between">
        <h6 className="font-bold">Major:</h6>
        <p className="ml-2">CS</p>
      </div>
    </div>
  );
}
