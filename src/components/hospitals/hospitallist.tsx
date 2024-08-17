"use client";

import { motion } from "framer-motion";
import { useState, useMemo, useEffect, useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Hospital } from "../../../types";
import { FaStar } from "react-icons/fa";
import {
  FiFilter,
  FiCopy,
  FiEdit,
  FiTrash,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Button } from "../ui/button";
import { MdUnfoldMoreDouble } from "react-icons/md";
import { FaFileExport } from "react-icons/fa6";
import { Input } from "../ui/input";
import CreateHospitalForm from "./adminCreateHospitalForm";
import { IoMdAddCircle } from "react-icons/io";
import SkeletonLoader from "./skeletion";
import EditHospitalForm from "./edithospitalform";

const Hospitallist = ({
  allHospitals,
  userEmail,
  isAdmin = false,
  onEditHospital,
  onDeleteHospital,
}: {
  allHospitals: Hospital[];
  userEmail: string;
  isAdmin?: boolean;
  onEditHospital?: (hospital: Hospital) => void;
  onDeleteHospital?: (hospitalId: number) => void;
}) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [displayedHospitals, setDisplayedHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [email, setEmail] = useState<string>("");
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);

  const hasMore = displayedHospitals.length < filteredHospitals.length;

  useEffect(() => {
    // Initially display the first 20 hospitals
    setDisplayedHospitals(allHospitals.slice(0, limit));
  }, [allHospitals, limit]);

  useEffect(() => {
    // filter data
    const filtered = allHospitals.filter((hospital) => {
      const matchesState =
        selectedStates.length === 0 ||
        selectedStates.includes(hospital.state?.name || "");
      const matchesType =
        selectedTypes.length === 0 ||
        selectedTypes.includes(hospital.type?.name || "");
      const matchesName = hospital.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      return matchesState && matchesType && matchesName;
    });

    setFilteredHospitals(filtered);
    setDisplayedHospitals(filtered.slice(0, limit));
  }, [allHospitals, selectedStates, selectedTypes, searchTerm, limit]);

  const loadMoreHospitals = () => {
    const newLimit = limit + 20;
    const newDisplayedHospitals = filteredHospitals.slice(0, newLimit);

    setLimit(newLimit);
    setDisplayedHospitals(newDisplayedHospitals);
  };

  const states = useMemo(() => {
    const stateSet = new Set<string>();
    allHospitals.forEach((hospital) => {
      if (hospital.state?.name) {
        stateSet.add(hospital.state.name);
      }
    });
    return Array.from(stateSet);
  }, [allHospitals]);

  const types = useMemo(() => {
    const typeSet = new Set<string>();
    allHospitals.forEach((hospital) => {
      if (hospital.type?.name) {
        typeSet.add(hospital.type.name);
      }
    });
    return Array.from(typeSet);
  }, [allHospitals]);

  const handleStateToggle = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  // generate link and copy to clipboard
  const generateLinkToShare = (
    userEmail: string,
    selectedStates: string[],
    selectedTypes: string[],
    searchTerm: string
  ) => {
    const query = {
      state: selectedStates.join(","),
      type: selectedTypes.join(","),
      searchTerm,
      user: userEmail,
    };
    const queryString = new URLSearchParams(query).toString();
    return `${window.location.origin}/hospitals?${queryString}`;
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy!", err);
      alert("Failed to copy link.");
    }
  };

  const getLink = () => {
    const link = generateLinkToShare(
      userEmail,
      selectedStates,
      selectedTypes,
      searchTerm
    );
    //  console.log(link);
    copyToClipboard(link);
  };

  const downloadData = () => {
    const header = "Name,Type,State,Phone Numbers,Address\n";
    const rows = filteredHospitals
      .map((hospital) => {
        const formattedPhoneNumbers = hospital.phone_number
          ? `"${hospital.phone_number.replace(/,/g, " | ")}"`
          : "";
        const formattedAddress = hospital.address
          ? `"${hospital.address}"`
          : "";

        return [
          `"${hospital.name}"`,
          `"${hospital.type?.name || ""}"`,
          `"${hospital.state?.name || ""}"`,
          formattedPhoneNumbers,
          formattedAddress,
        ].join(",");
      })
      .join("\n");

    const csvContent = `data:text/csv;charset=utf-8,${header}${rows}`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hospitals.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleEditClick = (hospital: Hospital) => {
    setEditingHospital(hospital);
  };

  // Filter scroll
  const scrollRefState = useRef<HTMLDivElement>(null);
  const scrollRefType = useRef<HTMLDivElement>(null);

  const scrollLeft = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const tierToStars: { [key: string]: number } = {
    "Tier 1": 1,
    "Tier 2": 2,
    "Tier 3": 3,
    "Tier 4": 4,
    "Tier 5": 5,
  };

  const addHospitalToList = (newHospital: Hospital) => {
    setDisplayedHospitals((prev) => [newHospital, ...prev]);
    setFilteredHospitals((prev) => [newHospital, ...prev]);
  };

  return (
    <div className='container mx-auto p-4'>
      {/* {displayedHospitals.length <= 0 && <SkeletonLoader />} */}
      {/* {displayedHospitals.length > 0 && ( */}
      <>
        <div className='flex flex-col md:flex-row w-full gap-4 md:gap-6 justify-center align-middle'>
          {isAdmin && (
            <Popover>
              <PopoverTrigger asChild>
                <Button onClick={() => setShowCreateForm(true)} className='p-6'>
                  <IoMdAddCircle className='mr-2' size={24} />
                  <span className='hidden md:block'>New</span>
                  <span className='block md:hidden'>New Hospitals</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className='p-6 bg-white shadow-md rounded-lg'>
                {showCreateForm && (
                  <CreateHospitalForm
                    setShowCreateForm={setShowCreateForm}
                    onHospitalCreated={(newHospital) => {
                      addHospitalToList(newHospital);
                      setShowCreateForm(false);
                    }}
                  />
                )}
              </PopoverContent>
            </Popover>
          )}

          {displayedHospitals.length > 0 && (
            <>
              {/* Toggle Filters Button */}
              <div className='flex flex-row  md:w-1/2 justify-between md:justify-start md:gap-6'>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className='p-6'>
                      <FiFilter size={24} className='mr-2' />
                      <span className='hidden md:block'>Filter</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-[80vw] md:w-[50vw] p-6 mx-auto bg-white shadow-md rounded-lg'>
                    {/* Filter by State */}
                    <h3 className='text-lg font-semibold mb-4 '>
                      Filter by State
                    </h3>
                    <div className='relative'>
                      <FiChevronLeft
                        className='absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white rounded-full p-1 shadow'
                        size={24}
                        onClick={() => scrollLeft(scrollRefState)}
                      />
                      <div
                        className='flex overflow-hidden gap-2 mx-6'
                        ref={scrollRefState}
                      >
                        {states.map((state) => (
                          <Button
                            key={state}
                            variant={
                              selectedStates.includes(state)
                                ? "default"
                                : "outline"
                            }
                            size='sm'
                            onClick={() => handleStateToggle(state)}
                            className={`text-sm md:text-lg cursor-pointer rounded-full ${
                              selectedStates.includes(state)
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            {state}
                          </Button>
                        ))}
                      </div>
                      <FiChevronRight
                        className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white rounded-full p-1 shadow'
                        size={24}
                        onClick={() => scrollRight(scrollRefState)}
                      />
                    </div>

                    {/* Filter by Type */}
                    <h3 className='text-lg font-semibold mt-6 mb-4 '>
                      Filter by Type
                    </h3>
                    <div className='relative'>
                      <FiChevronLeft
                        className='absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white rounded-full p-1 shadow'
                        size={24}
                        onClick={() => scrollLeft(scrollRefType)}
                      />
                      <div
                        className='flex overflow-hidden gap-2 mx-6'
                        ref={scrollRefType}
                      >
                        {types.map((type) => (
                          <Button
                            key={type}
                            variant={
                              selectedTypes.includes(type)
                                ? "default"
                                : "outline"
                            }
                            size='sm'
                            onClick={() => handleTypeToggle(type)}
                            className={`text-sm md:text-lg cursor-pointer rounded-full ${
                              selectedTypes.includes(type)
                                ? "bg-green-500 text-white"
                                : "bg-gray-200"
                            }`}
                          >
                            {type}
                          </Button>
                        ))}
                      </div>
                      <FiChevronRight
                        className='absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 bg-white rounded-full p-1 shadow'
                        size={24}
                        onClick={() => scrollRight(scrollRefType)}
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Download button - show only if any filters are applied */}
                {(selectedStates.length > 0 ||
                  selectedTypes.length > 0 ||
                  searchTerm) && (
                  <Button onClick={downloadData} className='p-6'>
                    <FaFileExport size={24} className='mr-2' />
                    <span className='hidden md:block'>Export</span>
                  </Button>
                )}

                {/* Copy button - show only if any filters are applied */}
                {(selectedStates.length > 0 ||
                  selectedTypes.length > 0 ||
                  searchTerm) && (
                  <Button onClick={getLink} className='p-6'>
                    <FiCopy className='mr-2' size={24} />
                    <span className='hidden md:block'>Copy</span>
                  </Button>
                )}
              </div>
            </>
          )}

          {/* Search bar */}
          <div className='mb-6 flex-grow'>
            <Input
              type='text'
              placeholder='Search by name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='border bg-gray-100 border-gray-300 p-6 rounded-md w-full mx-auto'
            />
          </div>
        </div>

        {/* Display hospitals */}
        {displayedHospitals.length <= 0 && <SkeletonLoader />}
        {displayedHospitals.length > 0 && (
          <>
            <ul className='grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 '>
              {displayedHospitals.map((hospital) => (
                <motion.li
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: hospital.id * 0.2 }}
                  key={hospital.id}
                  className=' p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-[#04A5BA]'
                >
                  {/* <li
                  key={hospital.id}
                  className=' p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out border border-[#04A5BA]'
                > */}
                  <p className='hospital-name text-2xl font-bold text-gray-800 mb-2'>
                    {hospital.name}
                  </p>
                  <p className='hospital-name text-xl font-bold text-gray-800 mb-2 min-h-[60px]'>
                    {hospital.address}
                  </p>
                  <p className='hospital-name text-lg font-bold text-gray-800 mb-2'>
                    {hospital.phone_number}
                  </p>
                  <p className='hospital-type text-sm text-gray-600'>
                    <span className='font-semibold text-gray-700'>Type:</span>{" "}
                    {hospital.type?.name}
                  </p>
                  <p className='hospital-tier text-sm text-gray-600'>
                    <span className='font-semibold text-gray-700'>State:</span>{" "}
                    {hospital.state?.name}
                  </p>
                  <p className='hospital-tier text-sm text-gray-600 mt-2'>
                    <div className='flex'>
                      {[...Array(tierToStars[hospital.tier?.name] || 0)].map(
                        (_, index) => (
                          <FaStar key={index} className='text-yellow-500' />
                        )
                      )}
                    </div>
                  </p>

                  {/* Admin Buttons */}
                  {isAdmin && (
                    // <p>Admin</p>
                    <div className='flex space-x-4 mt-4'>
                      <Button onClick={() => onEditHospital?.(hospital)}>
                        <FiEdit /> Edit
                      </Button>
                      <Button
                        variant='destructive'
                        onClick={() => onDeleteHospital?.(hospital.id)}
                      >
                        <FiTrash />
                        Delete
                      </Button>
                    </div>
                  )}
                  {/* </li> */}
                </motion.li>
              ))}
            </ul>
            {/* Load More Button */}
            <Button
              onClick={loadMoreHospitals}
              size='lg'
              variant='green'
              className='mt-6 mx-auto flex gap-2'
              // isDisabled={!hasMore}
            >
              <MdUnfoldMoreDouble size={25} />
              Load More
            </Button>
          </>
        )}

        {/* )} */}
      </>
    </div>
  );
};

export default Hospitallist;
