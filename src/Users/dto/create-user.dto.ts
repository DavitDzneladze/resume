import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "email@gmail.com", description: "user email" })
  readonly email: string;

  @ApiProperty({ example: "12345", description: "password" })
  readonly password: string;
}
