export const verifyEmailTemplate = (
    verificationUrl: string
): string => {
    return `
        <div>
            <h2>Verify Your Email</h2>
            <p>
                Please verify your email address.
            </p>
            <a href="${verificationUrl}">
                Verify Email
            </a>
        </div>
    `;
};