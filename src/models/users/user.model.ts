export interface UserModel {
    id: string;
    name: string;
    lastName: string;
    email: string;
    birthdayDate: string;
    typeAccount: string;
    deviceID: string;
    emailVerificated: boolean;
    password: string;
    idRef: string;
    status: boolean;
    verify: boolean;
    create: Date;
    update: Date;
    nationality: string;
    phone: string;
    DniNumber: string;
    zipCode: number;
    city: string;
    address: string;
    avatar: string;
}