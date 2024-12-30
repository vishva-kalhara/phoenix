export interface IApplication {
    user: string;
    name: string;
    appSecret: string;
    plans: {
        planName: string;
        validityInDays: number;
        price: number;
    }[];
    isActive: boolean;
    createdAt: Date;
    _id: string;
}
