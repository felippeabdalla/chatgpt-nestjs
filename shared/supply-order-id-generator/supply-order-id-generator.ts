import { IIdEndToEndGenerator } from './interfaces/supply-id-end-to-end-generator.interface';

export function SupplyOrderIdEndToEndGenerator(): IIdEndToEndGenerator {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 19;
  let id = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }

  const supplyIdString = `cCoLOMd9rvew:${id}`;

  return {
    supplyId: id,
    idEndToEnd: supplyIdString,
  };
}
