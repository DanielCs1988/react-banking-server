export interface ITransaction {
    amount: number;
    recipientName: string;
    recipientAccount: string;
    ccy: string;
    date: number;
    timing?: number;
}

export interface IPartner {
    account: string;
    name: string;
}