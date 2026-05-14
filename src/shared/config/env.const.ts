import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

dotenv.config({
    path: path.join(process.cwd(), ".env"),
});

/**
* -----------------------------
* 1️⃣ Environment Schema
* -----------------------------
*/

const envSchema = z.object({
    NODE_ENV: z.string().default("development"),
    PORT: z.string().default("8000"),

    MONGODB_URI: z.string().min(1),

    // JWT
    JWT_SECRET: z.string().min(10),
    JWT_REFRESH_SECRET: z.string().min(10),
    SENDGRID_API_KEY: z.string().min(1),

    // CLOUDINARY
    CLOUDINARY_CLOUD_NAME: z.string().min(1),
    CLOUDINARY_API_KEY: z.string().min(1),
    CLOUDINARY_SECRET_KEY: z.string().min(1),


    // Email
    EMAIL: z.email(),
    EMAIL_PASSWORD: z.string().optional(),

});


const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error("❌ Invalid environment variables:");
    console.error(parsed.error.format());
    process.exit(1);
}

const env = parsed.data;

export const config = {
    env: env.NODE_ENV,
    port: Number(env.PORT),
    mongodb_uri: env.MONGODB_URI,

    jwt: {
        jwt_secret: env.JWT_SECRET,
        jwt_refresh_secret: env.JWT_REFRESH_SECRET,

    },

    emailSender: {
        email: env.EMAIL,
        app_pass: env.EMAIL_PASSWORD,
        sendgrid_api_key: env.SENDGRID_API_KEY,
    },

    cloudinary: {
        cloud_name: env.CLOUDINARY_CLOUD_NAME,
        api_key: env.CLOUDINARY_API_KEY,
        secret_key: env.CLOUDINARY_SECRET_KEY,
    },
};

export default config;