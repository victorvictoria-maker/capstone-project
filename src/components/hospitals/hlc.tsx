"use client";

import Loading from "@/app/(protected)/hospitals/loading";
import { useState } from "react";
import { Hospital } from "../../../types";
import { fetchMoreHospitalData } from "../../../serveractions/hospitals";

const Hlc = ({ initialHospitals }: { initialHospitals: Hospital[] }) => {
  const [loading, setLoading] = useState(false);
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitals);
  const [page, setPage] = useState(1);

  const loadMoreHospitals = async () => {
    // setLoading(true);

    // const data = await fetchMoreHospitalData(page + 1, 20); // Fetch the next page with 20 hospitals
    // setPage((prev) => prev + 1); // Increment the page number

    // setHospitals((prev) => [...prev, ...data]); // Append the new hospitals to the existing list
    // setLoading(false);
    console.log("Load more hospitals");
  };

  return (
    <div>
      Hospitallistclient
      <div className='hospitals-container'>
        {loading && <Loading />}{" "}
        {/* Show loading spinner when loading more data */}
        <ul className='hospital-list'>
          {hospitals.map((hospital, index) => (
            <li key={index} className='hospital-item'>
              <p className='hospital-name'>{hospital.name}</p>
              <p className='hospital-type'>Type: {hospital.type?.name}</p>
              <p className='hospital-tier'>Tier: {hospital.tier?.name}</p>
            </li>
          ))}
        </ul>
        <button
          onClick={loadMoreHospitals}
          className='load-more-button'
          disabled={loading}
        >
          Load More
        </button>
      </div>
    </div>
  );
};

export default Hlc;
