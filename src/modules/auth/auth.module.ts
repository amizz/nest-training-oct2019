import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { TokenService } from "../../services/token.service";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [TokenService]
})
export class AuthModule {}