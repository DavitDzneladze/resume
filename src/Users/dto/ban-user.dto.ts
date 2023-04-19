import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({ example: "2", description: "user id" })
  readonly userId: string;

  @ApiProperty({ example: "swearing", description: "user's ban reason" })
  readonly banReason: string;
}
