import { useState } from "react";
import { Button } from "../ui/button";
import { Hospital } from "../../../types";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";

const EditPopover = ({
  hospital,
  onClose,
  onHospitalUpdated,
  dropdownOptions,
}: {
  hospital: Hospital;
  onClose: () => void;
  onHospitalUpdated: (hospital: Hospital) => void;
  dropdownOptions: {
    states: { id: number; name: string }[];
    types: { id: number; name: string }[];
    tiers: { id: number; name: string }[];
  };
}) => {
  const [formData, setFormData] = useState<Hospital>(hospital);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onHospitalUpdated(formData);
    setIsSubmitting(false);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      <div
        className='fixed inset-0 bg-black opacity-50'
        onClick={onClose}
      ></div>
      <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10'>
        <h2 className='text-xl font-bold mb-4'>Edit Hospital</h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <Input
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
            required
          />
          <Input
            name='address'
            value={formData.address}
            onChange={handleChange}
            placeholder='Address'
            required
          />
          <Input
            name='phone_number'
            value={formData.phone_number}
            onChange={handleChange}
            placeholder='Phone Number'
            required
          />

          {/* State Select */}
          <Select
            onValueChange={(value) => handleSelectChange("stateId", value)}
            value={formData.stateId.toString()}
          >
            <SelectTrigger className='w-full'>
              {dropdownOptions.states.find(
                (state) => state.id === formData.stateId
              )?.name || "Select State"}
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions.states.map((state) => (
                <SelectItem key={state.id} value={state.id.toString()}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Select */}
          <Select
            onValueChange={(value) => handleSelectChange("typeId", value)}
            value={formData.typeId.toString()}
          >
            <SelectTrigger className='w-full'>
              {dropdownOptions.types.find((type) => type.id === formData.typeId)
                ?.name || "Select Type"}
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions.types.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Tier Select */}
          <Select
            onValueChange={(value) => handleSelectChange("tierId", value)}
            value={formData.tierId.toString()}
          >
            <SelectTrigger className='w-full'>
              {dropdownOptions.tiers.find((tier) => tier.id === formData.tierId)
                ?.name || "Select Tier"}
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions.tiers.map((tier) => (
                <SelectItem key={tier.id} value={tier.id.toString()}>
                  {tier.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className='flex space-x-4'>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update"}
            </Button>
            <Button type='button' variant='outline' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPopover;
