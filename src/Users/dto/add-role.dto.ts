import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "User role", description: "Set user role" })
  readonly value: string;

  @ApiProperty({ example: "1", description: "user id" })
  readonly userId: string;
}
