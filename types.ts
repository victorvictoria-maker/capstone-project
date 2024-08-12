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
