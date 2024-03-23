import { registerDecorator } from "class-validator";

export function Disallow(): PropertyDecorator {
    return function (object: any, propertyName: string): void {
        registerDecorator({
            name: 'disallow',
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                validate(value: any): boolean {
                    return false; // Always returns false to indicate disallowed field
                },
                defaultMessage(): string {
                    return `${propertyName} cannot be specified.`;
                },
            },
        });
    };
};