import { IsEmail, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  isCompanyAccount: boolean;
  @ValidateIf((o) => o.isCompanyAccount === true)
  @IsNotEmpty()
  company: number;
}
