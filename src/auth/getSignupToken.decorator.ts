import { createParamDecorator } from "@nestjs/common";

export const GetSignUpToken = createParamDecorator((data, req): string => {
    const token = req.headers;
    return token.authorization
})