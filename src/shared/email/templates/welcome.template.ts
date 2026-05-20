export const welcomeTemplate = (
    firstName: string
): string => {
    return `
        <div>
            <h2>Welcome ${firstName} 🎉</h2>

            <p>
                Your account has been created successfully.
            </p>
        </div>
    `;
};