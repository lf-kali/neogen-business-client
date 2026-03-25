import type { Costumer } from "../costumer/costumer.types";
import type { Device } from "../device/device.types";
import type { Product } from "../product/product.types";
import type { ServiceType } from "../serviceType/serviceType.types";
import type { Technician } from "../technician/technician.types";

export type ServiceOrderStatus = 'pending' | 'confirmed' | 'acquiring_parts' | 'ongoing' | 'finished' | 'cancelled';

export type ServiceOrder = {
  id: number;
  deadline: string;
  status: ServiceOrderStatus;
  entryDate: string;
  techNotes: string;
  closureDate?: string;
  closureNotes?: string;
  finalPrice: number;
  technician: Technician;
  costumer: Costumer;
  devices: Device[];
  products?: Product[];
  services: ServiceType[];
};

export type CreateServiceOrder = {
  deadline: Date;
  status: ServiceOrderStatus;
  technicianId: number;
  costumerId: number;
  deviceIDs: number[];
  productIDs?: number[];
  serviceTypeIDs: number[];
};

export type UpdateServiceOrder = Partial<CreateServiceOrder>;
