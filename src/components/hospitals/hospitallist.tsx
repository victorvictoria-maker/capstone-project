// "use server";

// import Loading from "@/app/(protected)/hospitals/loading";
// import { fetchFilteredHealthcareProvider } from "../../../serveractions/hospitals";

// const HospitalsList = async () => {
//   console.log("Fetching hospitals...");
//   let filteredHospitals = "";
//   filteredHospitals = await fetchFilteredHealthcareProvider(1, 20);
//   console.log("Hospitals fetched:", filteredHospitals);

//   return (
//     <div className='hospitals-container'>
//       {filteredHospitals === "" ? (
//         <Loading />
//       ) : (
//         <ul className='hospital-list'>
//           <li>{filteredHospitals}</li>
//           {/* {filteredHospitals.map((hospital) => (
//             <li key={hospital.name} className='hospital-item'>
//               <p className='hospital-name'>{hospital.name}</p>
//               <p className='hospital-type'>Type: {hospital.type?.name}</p>
//               <p className='hospital-tier'>Tier: {hospital.tier?.name}</p>
//             </li>
//           ))} */}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default HospitalsList;
// Server Component

"use server";

import { fetchFilteredHealthcareProvider } from "../../../serveractions/hospitals";
import Loading from "@/app/(protected)/hospitals/loading";

const HospitalsList = async () => {
  // Fetch data from server
  const filteredHospitals = await fetchFilteredHealthcareProvider(1, 20);

  return (
    <div className='hospitals-container'>
      {filteredHospitals.length > 0 ? (
        // <Loading />
        <p>Loading...</p>
      ) : (
        <ul className='hospital-list'>
          {filteredHospitals.map((hospital) => (
            <li key={hospital.name} className='hospital-item'>
              <p className='hospital-name'>{hospital.name}</p>
              <p className='hospital-type'>Type: {hospital.type?.name}</p>
              <p className='hospital-tier'>Tier: {hospital.tier?.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HospitalsList;
