type RuleName = 'name' | 'lastName' | 'email' | 'password' | 'passwordConfirmation';

const rules = (t: (text: string) => {}) => {
    return (name: RuleName, password?: string) => {
        const rules = {
            name: [
                (v: string) => !!v || t('name_is_required'),
                (v: string) => (v && v.length <= 100) || t('name_must_be_less_than_100_characters'),
            ],
            lastName: [
                (v: string) => !!v || t('last_name_is_required'),
                (v: string) =>
                    (v && v.length <= 100) || t('last_field_must_be_less_than_100_characters'),
            ],
            email: [
                (v: string) => !!v || t('email_field_is_required'),
                (v: string) =>
                    (v && v.length <= 100) || t('email_field_must_be_less_than_100_characters'),
                (v: string) => /.+@.+\..+/.test(v) || t('email_must_be_valid'),
            ],
            password: [
                (v: string) => !!v || t('password_field_is_required'),
                (v: string) =>
                    (v && v.length >= 8) || t('password_field_must_be_at_least_8_characters'),
                (v: string) =>
                    (v && v.length <= 100) || t('password_field_must_be_less_than_100_characters'),
            ],
            passwordConfirmation: [
                (v: string) => !!v || t('confirm_password_field_is_required'),
                (v: string) => v === password || t('passwords_must_match'),
            ],
        };

        return rules[name];
    };
};

export default rules;

// (v: string) => (v && /[0-9]/.test(v)) || 'Password Must Contain At Least One Number!',
// (v: string) => (v && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(v)) || 'Password Must Contain At Least One Special Character!',
// (v: string) => (v && /[A-Z]/.test(v)) || 'Password Must Contain At Least One Uppercase Letter!',
