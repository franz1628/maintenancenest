export class CreateServiceCatalogDto {
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  state?: number;
}
