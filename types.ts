export interface Hospital {
  id: number;
  name: string;
  address: string;
  phone_number: string;
  state: {
    id: number;
    name: string;
  };
  stateId: number;
  tier: {
    id: number;
    name: string;
  };
  tierId: number;
  type: {
    id: number;
    name: string;
  };
  typeId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface State {
  id: number;
  name: string;
}

export interface Tier {
  id: number;
  name: string;
}

export interface Type {
  id: number;
  name: string;
}

export interface DropDownOptions {
  states: State[];
  types: Type[];
  tiers: Tier[];
}

export interface PopoverProps {
  hospital: Hospital;
  onClose: () => void;
  onSave: (hospital: Hospital) => void;
  options: DropDownOptions;
}

export interface CreateHospitalInput {
  name: string;
  address: string;
  phone_number: string;
  stateId: number;
  tierId: number;
  typeId: number;
}
