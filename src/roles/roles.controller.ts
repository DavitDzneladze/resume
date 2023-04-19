import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { RolesService } from "./roles.service";
import { Role } from "./roles.model";
import { CreateRoleDto } from "./dto/create-role.dto";

@ApiTags("roles")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: "Role creation" })
  @ApiResponse({ status: 200, type: Role })
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: "Get role by value" })
  @ApiResponse({ status: 200, type: [Role] })
  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
