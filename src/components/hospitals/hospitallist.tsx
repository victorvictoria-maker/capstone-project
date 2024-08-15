"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Stack,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
  Collapse,
} from "@chakra-ui/react";
import { Hospital } from "../../../types";
import { FiFilter, FiCopy, FiEdit, FiTrash } from "react-icons/fi";
import { Button } from "../ui/button";

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
  const [limit, setLimit] = useState(20);
  const [displayedHospitals, setDisplayedHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);

  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

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

  // console.log(userEmail);

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

  return (
    <div className='container mx-auto p-4'>
      {userEmail}
      {/* Toggle Filters Button */}
      <FiFilter />
      <Button
        onClick={() => setShowFilters(!showFilters)}
        size='sm'
        className='mb-6'
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>

      {/* Search bar */}
      <div className='mb-6'>
        <Input
          type='text'
          placeholder='Search by name'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-300 p-3 rounded-md w-full lg:w-1/2 mx-auto placeholder-gray-500'
        />
      </div>

      {/* Filter Chips */}
      <Collapse in={showFilters}>
        <div className='mb-6'>
          <h3 className='text-lg font-semibold mb-4'>Filter by State</h3>
          <Stack direction='row' spacing={2} flexWrap='wrap'>
            {states.map((state) => (
              <Tag
                key={state}
                size='lg'
                variant={selectedStates.includes(state) ? "solid" : "outline"}
                colorScheme='blue'
                onClick={() => handleStateToggle(state)}
                className='cursor-pointer'
                borderRadius='full'
              >
                <TagLabel>{state}</TagLabel>
                {selectedStates.includes(state) && (
                  <TagCloseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStateToggle(state);
                    }}
                  />
                )}
              </Tag>
            ))}
          </Stack>

          <h3 className='text-lg font-semibold mt-6 mb-4'>Filter by Type</h3>
          <Stack direction='row' spacing={2} flexWrap='wrap'>
            {types.map((type) => (
              <Tag
                key={type}
                size='lg'
                variant={selectedTypes.includes(type) ? "solid" : "outline"}
                colorScheme='green'
                onClick={() => handleTypeToggle(type)}
                className='cursor-pointer'
                borderRadius='full'
              >
                <TagLabel>{type}</TagLabel>
                {selectedTypes.includes(type) && (
                  <TagCloseButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTypeToggle(type);
                    }}
                  />
                )}
              </Tag>
            ))}
          </Stack>
        </div>
      </Collapse>

      {/* Copy button - show only if any filters are applied */}
      {(selectedStates.length > 0 ||
        selectedTypes.length > 0 ||
        searchTerm) && (
        <div className='mt-8'>
          <h3 className='text-lg font-semibold mb-4'>Share this list</h3>
          <Stack direction='row' spacing={4}>
            <Button onClick={getLink}>Copy Link</Button>
            <FiCopy />
          </Stack>
        </div>
      )}

      {/* Display hospitals */}
      {displayedHospitals.length > 0 && (
        <ul className='hospital-list space-y-4'>
          {displayedHospitals.map((hospital) => (
            <li
              key={hospital.id}
              className='hospital-item p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
            >
              <p className='hospital-name text-xl font-bold text-gray-800 mb-2'>
                {hospital.name}
              </p>
              <p className='hospital-name text-xl font-bold text-gray-800 mb-2'>
                {hospital.phone_number}
              </p>
              <p className='hospital-type text-sm text-gray-600'>
                <span className='font-semibold text-gray-700'>Type:</span>{" "}
                {hospital.type?.name}
              </p>
              <p className='hospital-tier text-sm text-gray-600'>
                <span className='font-semibold text-gray-700'>Tier:</span>{" "}
                {hospital.tier?.name}
              </p>

              {/* Admin Buttons */}
              {isAdmin && (
                // <p>Admin</p>
                <div className='flex space-x-4 mt-4'>
                  <Button onClick={() => onEditHospital?.(hospital)}>
                    <FiEdit />
                    Edit
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
            </li>
          ))}
        </ul>
      )}

      {/* Load More Button */}
      <Button
        onClick={loadMoreHospitals}
        size='lg'
        className='mt-6 mx-auto block'
        // isDisabled={!hasMore}
      >
        Load More
      </Button>

      {/* Download button - show only if any filters are applied */}
      {(selectedStates.length > 0 ||
        selectedTypes.length > 0 ||
        searchTerm) && (
        <Button size='lg' onClick={downloadData} className='mt-6 mx-auto block'>
          Export to CSV
        </Button>
      )}
    </div>
  );
};

export default Hospitallist;
