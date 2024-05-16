export interface AuthFormRules {
    (name: string, password?: string): {
        name: ((v: string) => string)[];
        lastName: ((v: string) => string)[];
        email: ((v: string) => string)[];
        password: ((v: string) => string)[];
        passwordConfirmation: ((v: string) => string)[];
    }
}