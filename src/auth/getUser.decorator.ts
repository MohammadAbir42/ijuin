import { createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, req): string => {
    const token = req.headers;
    return token.authorization
})