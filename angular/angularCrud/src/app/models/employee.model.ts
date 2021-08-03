export class Employee {
  id: number | undefined;
  name: string | undefined;
  gender: string | undefined;
  email?: string;
  phoneNumber?: number | undefined;
  contactPreferrence: string | undefined;
  dateOfBirth: Date | undefined;
  department: string | undefined;
  isActive: boolean | undefined ;
  photoPath?: string;
}
