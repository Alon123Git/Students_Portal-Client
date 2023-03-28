import { Address } from "./UiAddress.model";
import { Gender } from "./UiGender.model";

export interface Student {
    id: string,
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    mobile: string,
    profileImageUrl: string,
    genderId: string,
    gender: Gender,
    address: Address
}