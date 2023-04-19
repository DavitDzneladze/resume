import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "user role" })
  readonly value: string;

  @ApiProperty({
    example: "administator",
    description: "user role description",
  })
  readonly description: string;
}
