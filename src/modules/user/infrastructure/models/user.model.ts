import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ================= INTERFACE =================
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    profilePhoto: string;
    email: string;
    bio?: string;
    password: string;
    postCount: number;
    isBlocked: boolean;
    isAdmin: boolean;
    role: "Admin" | "Guest" | "Blogger";
    isFollowing: boolean;
    isUnFollowing: boolean;
    isAccountVerified: boolean;
    accountVerificationToken?: string;
    accountVerificationTokenExpires?: Date;
    viewedBy: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    passwordChangedAt?: Date;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    active: boolean;

    // METHODS
    isPasswordMatched(enteredPassword: string): Promise<boolean>;
    createAccountVerificationToken(): string;
    createPasswordResetToken(): string;

    // VIRTUALS
    accountType: string;
}

// ================= SCHEMA =================
const userSchema = new mongoose.Schema<IUser>(
    {
        firstName: {
            required: [true, "first name is required"],
            type: String,
        },
        lastName: {
            required: [true, "Last name is required"],
            type: String,
        },
        profilePhoto: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
        email: {
            required: [true, "email is required"],
            type: String,
            // unique: [true, "email should be unique"],
            unique: true,
            index: true
        },
        bio: {
            type: String,
        },
        password: {
            required: [true, "password is required"],
            type: String,
        },
        postCount: {
            type: Number,
            default: 0,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["Admin", "Guest", "Blogger"],
        },
        isFollowing: {
            type: Boolean,
            default: false,
        },
        isUnFollowing: {
            type: Boolean,
            default: false,
        },
        isAccountVerified: {
            type: Boolean,
            default: false,
        },
        accountVerificationToken: String,
        accountVerificationTokenExpires: Date,

        viewedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,

        active: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// ================= VIRTUALS =================

// posts
userSchema.virtual("posts", {
    ref: "Post",
    foreignField: "user",
    localField: "_id",
});

// accountType
userSchema.virtual("accountType").get(function (this: IUser) {
    const totalFollowers = this.followers?.length || 0;
    return totalFollowers >= 2 ? "pro account" : "starter account";
});

// ================= MIDDLEWARE =================
/*
// hash password
userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});
*/
// ================= METHODS =================

// compare password
userSchema.methods.isPasswordMatched = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

// account verification token
userSchema.methods.createAccountVerificationToken = function (): string {
    const verificationToken = crypto.randomBytes(32).toString("hex");

    this.accountVerificationToken = crypto
        .createHash("sha256")
        .update(verificationToken)
        .digest("hex");

    this.accountVerificationTokenExpires =
        new Date(Date.now() + 10 * 60 * 1000);

    return verificationToken;
};

// password reset token
userSchema.methods.createPasswordResetToken = function (): string {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.passwordResetToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000);

    return resetToken;
};

// ================= MODEL =================
const User: Model<IUser> = mongoose.models.User ?? mongoose.model<IUser>('User', userSchema);

// const User: Model<IUser> =
//     (mongoose.models.User as Model<IUser>) ?? mongoose.model<IUser>("User", userSchema);


export default User;