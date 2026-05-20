export const forgotPasswordTemplate = (
    resetUrl: string
): string => {
    return `
        <div>
            <h2>Reset Your Password</h2>

            <p>
                Click the button below to reset your password.
            </p>

            <a href="${resetUrl}">
                Reset Password
            </a>

            <p>
                This link will expire soon.
            </p>
        </div>
    `;
};