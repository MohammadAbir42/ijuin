import { createParamDecorator } from "@nestjs/common";

export const GetSignUpToken = createParamDecorator((data, req): string => {
    const token = req.headers['authorization'].split(' ');
    return token[1]
})