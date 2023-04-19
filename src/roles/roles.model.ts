import {
  Table,
  Model,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttributes {
  role: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttributes> {
  @ApiProperty({ example: "1", description: "unique identifier" })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "ADMIN", description: "user role" })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  value: string;

  @ApiProperty({ example: "administrator", description: "password" })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
