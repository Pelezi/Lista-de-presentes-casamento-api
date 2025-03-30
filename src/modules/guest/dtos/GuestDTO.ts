export class GuestDTO {
    id: string;
    name: string;
    phone: string;
    gifts: {
        count: number;
        guest: {
            id: string;
            name: string;
            phone: string;
        };
    }[]
}

export type CreateGuestDTO = Omit<GuestDTO, 'id' | 'gifts' >;
export type UpdateGuestDTO = Partial<GuestDTO>;
