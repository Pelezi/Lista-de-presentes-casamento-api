export class GiftDTO {
    id: string;
    name: string;
    photoUrl: string;
    quantity: number;
    description: string;
    guests: {
        count: number;
        guest: {
            id: string;
            name: string;
            phone: string;
        };
    }[];
    guestId?: string;
}

export type CreateGiftDTO = Omit<GiftDTO, 'id' | 'guests'>;
export type UpdateGiftDTO = Partial<GiftDTO>;
