"use client";

import { useState, useEffect } from "react";
import Loading from "@/app/(protected)/hospitals/loading";
import { Hospital } from "../../../types";
// import { fetchMoreHospitalData } from "../../../serveractions/hospitals";

const HospitalsListClient = ({
  filteredHospitals,
}: {
  filteredHospitals: Hospital[];
}) => {
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>(filteredHospitals);
  const [page, setPage] = useState(1);

  console.log(filteredHospitals);
  //   const loadMoreHospitals = async () => {
  //     setLoading(true);
  //     const data = await fetchMoreHospitalData(page + 1, 20); // Fetch the next page with 20 hospitals
  //     setPage((prev) => prev + 1); // Increment the page number
  //     setHospitals((prev) => [...prev, ...data]); // Append the new hospitals to the existing list
  //     setLoading(false);
  //   };

  useEffect(() => {
    // Optionally, log the initial hospitals
    console.log("filteredHospitals:", filteredHospitals);
  }, [filteredHospitals]);

  return (
    <p>hospital clinet component</p>
    // <div className='hospitals-container'>
    //   {loading && <Loading />} {/* Show loading spinner when loading more data */}
    //   <ul className='hospital-list'>
    //     {hospitals.map((hospital, index) => (
    //       <li key={index} className='hospital-item'>
    //         <p className='hospital-name'>{hospital.name}</p>
    //         <p className='hospital-type'>Type: {hospital.type?.name}</p>
    //         <p className='hospital-tier'>Tier: {hospital.tier?.name}</p>
    //       </li>
    //     ))}
    //   </ul>
    //   <button
    //     onClick={loadMoreHospitals}
    //     className='load-more-button'
    //     disabled={loading}
    //   >
    //     Load More
    //   </button>
    // </div>
  );
};

export default HospitalsListClient;
