"use client";

import { useEffect, useState } from "react";
import { Hospital, PopoverProps, State, Tier, Type } from "../../../types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Select } from "../ui/select";
import {
  fetchDropdownOptionsForHospitalEdit,
  updateHospital,
} from "../../../serveractions/admin";

const EditPopover = ({ hospital, onClose, onSave, options }: PopoverProps) => {
  const [name, setName] = useState(hospital.name);
  const [address, setAddress] = useState(hospital.address || "");
  const [phoneNumber, setPhoneNumber] = useState(hospital.phone_number || [""]);
  const [states, setStates] = useState<State[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [tiers, setTiers] = useState<Tier[]>([]);

  const [selectedState, setSelectedState] = useState(hospital.state?.id || "");
  const [selectedType, setSelectedType] = useState<string | number>(
    hospital.type?.id || ""
  );
  const [selectedTier, setSelectedTier] = useState(hospital.tier?.id || "");
  const [newType, setNewType] = useState("");

  const handleSave = async () => {
    const updatedHospital: Hospital = {
      id: hospital.id,
      name,
      address,
      //   phone_number: phoneNumber,
    };
    const result = await updateHospital(updatedHospital);
    if (result.success) {
      onSave(updatedHospital);
    } else {
      console.error("Update failed:", result.error);
    }
    onClose();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline'>Edit</Button>
      </PopoverTrigger>
      <PopoverContent className='w-80 p-4'>
        <div className='space-y-4'>
          <div>
            <Label htmlFor='name'>Hospital Name</Label>
            <Input
              id='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor='address'>Address</Label>
            <Input
              id='address'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {/* <div>
            <Label htmlFor='phoneNumber'>Phone Number</Label>
            <Input
              id='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Phone Number'
            />
          </div> */}
          {/* <div>
            <Label htmlFor='state'>State</Label>
            <Select
              id='state'
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor='type'>Type</Label>
            <Select
              id='type'
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
              <option value='new'>Add New Type</option>
            </Select>
            {selectedType === "new" && (
              <Input
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                placeholder='Enter new type'
              />
            )}
          </div>
          <div>
            <Label htmlFor='tier'>Tier</Label>
            <Select
              id='tier'
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
            >
              {tiers.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name}
                </option>
              ))}
              {[1, 2, 3, 4, 5].map(
                (tier) =>
                  !tiers.find((t) => t.id === tier) && (
                    <option key={tier} value={tier}>
                      {tier}
                    </option>
                  )
              )}
            </Select>
          </div> */}
          <Button onClick={handleSave}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EditPopover;
