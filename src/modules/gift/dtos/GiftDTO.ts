export class GiftDTO {
    id: string;
    name: string;
    value: number;
    fileName: string;
    mpcode: string;
}

export type CreateGiftDTO = Omit<GiftDTO, 'id' | 'guests'>;
export type UpdateGiftDTO = Partial<GiftDTO>;
