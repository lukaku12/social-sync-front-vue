export type formElement = {
    isValid: boolean;
    validate: Function;
    errors: { id: string; errorMessages: string[] }[];
    items: { id: string; validate: () => {} }[];
} | null;
