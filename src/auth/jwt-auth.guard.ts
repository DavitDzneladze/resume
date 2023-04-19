import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const authHeader = request.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) {
        throw new UnauthorizedException({
          message: "User is not authorized",
        });
      }

      const user = this.jwtService.verify(token);
      request.user = user;

      return true;
    } catch (err) {
      throw new UnauthorizedException({ message: "User is not authorized" });
    }
  }
}