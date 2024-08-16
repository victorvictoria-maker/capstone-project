"use client";

import { useState, useEffect, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { toast } from "react-toastify";
import {
  fetchDropdownOptionsForHospitalEdit,
  createHospital,
} from "../../../serveractions/admin";
import { CreateHospitalInput, DropDownOptions, Hospital } from "../../../types";
import { CreateHospitalSchema } from "../../../schemas";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { Button } from "../ui/button";

const CreateHospitalForm = ({
  onHospitalCreated,
  setShowCreateForm,
}: {
  onHospitalCreated: (newHospital: Hospital) => void;
  setShowCreateForm: (show: boolean) => void;
}) => {
  const [dropdownOptions, setDropdownOptions] = useState<DropDownOptions>({
    states: [],
    types: [],
    tiers: [],
  });

  const [isPending, startTransition] = useTransition();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof CreateHospitalSchema>>({
    resolver: zodResolver(CreateHospitalSchema),
  });

  useEffect(() => {
    const loadDropdownOptions = async () => {
      const options = await fetchDropdownOptionsForHospitalEdit();
      setDropdownOptions(options);
    };
    loadDropdownOptions();
  }, []);

  const onSubmit = async (data: z.infer<typeof CreateHospitalSchema>) => {
    startTransition(async () => {
      try {
        const newHospital: CreateHospitalInput = {
          name: data.name,
          address: data.address,
          phone_number: data.phone_number,
          stateId: data.stateId,
          typeId: data.typeId,
          tierId: data.tierId,
        };

        const result = await createHospital(newHospital);

        if (result.success) {
          toast.success(result.success);
          reset();
          onHospitalCreated(result.hospital);
          setShowCreateForm(false);
        } else {
          toast.error(result.error || "Failed to create hospital");
        }
      } catch (error) {
        toast.error("Something went wrong while creating the hospital.");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      {isPending && <p>Submitting...</p>}

      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <Input placeholder='Hospital Name' {...field} disabled={isPending} />
        )}
      />
      <Controller
        name='address'
        control={control}
        render={({ field }) => (
          <Input placeholder='Address' {...field} disabled={isPending} />
        )}
      />
      <Controller
        name='phone_number'
        control={control}
        render={({ field }) => (
          <Input placeholder='Phone Number' {...field} disabled={isPending} />
        )}
      />

      <Controller
        name='stateId'
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(Number(value))} // Convert selected string value to number
            value={field.value ? field.value.toString() : ""} // Convert number to string for the Select component
            disabled={isPending}
          >
            <SelectTrigger className='w-full'>
              {dropdownOptions.states.find((state) => state.id === field.value)
                ?.name || "Select State"}
            </SelectTrigger>
            <SelectContent>
              {dropdownOptions.states.map((state) => (
                <SelectItem key={state.id} value={state.id.toString()}>
                  {state.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      <Controller
        name='typeId'
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            value={field.value ? field.value.toString() : ""}
            disabled={isPending}
          >
            <SelectTrigger className='w-full'>
              {dropdownOptions.types.find((type) => type.id === field.value)
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
        )}
      />
      <Controller
        name='tierId'
        control={control}
        render={({ field }) => (
          <Select
            onValueChange={(value) => field.onChange(Number(value))}
            value={field.value ? field.value.toString() : ""}
            disabled={isPending}
          >
            <SelectTrigger className='w-full'>
              {dropdownOptions.tiers.find((tier) => tier.id === field.value)
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
        )}
      />

      <Button type='submit' disabled={isPending}>
        Create Hospital
      </Button>
    </form>
  );
};

export default CreateHospitalForm;
