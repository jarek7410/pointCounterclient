interface PasswordCheckResult {
    isStrong: boolean;
    reasons: string[];
}
export const checkPasswordStrength = (password: string): PasswordCheckResult => {
    const minLength = 8;
    const reasons: string[] = [];

    if (password.length < minLength) {
        reasons.push(`Password should be at least ${minLength} characters long`);
    }
    if (!/[A-Z]/.test(password)) {
        reasons.push("Password should contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
        reasons.push("Password should contain at least one lowercase letter");
    }
    if (!/[0-9]/.test(password)) {
        reasons.push("Password should contain at least one digit");
    }
    // if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    //     reasons.push("Password should contain at least one special character");
    // }

    return {
        isStrong: reasons.length === 0,
        reasons,
    };
};