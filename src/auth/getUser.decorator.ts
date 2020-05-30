import { createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((data, req): User => {
    // const token = req.headers;
    // return token.authorization
    return req.user
})