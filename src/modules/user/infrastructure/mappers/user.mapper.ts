import { UserEntity } from "@modules/user/domain/user.entity";

export const toDomain = (doc: any): UserEntity => {
    return UserEntity.fromPersistence({
        id: doc._id.toString(),
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        password: doc.password ?? doc.password,

        role: doc.role ?? "Guest",
        bio: doc.bio,
        profilePhoto: doc.profilePhoto,

        postCount: doc.postCount ?? 0,
        isBlocked: doc.isBlocked ?? false,
        isAdmin: doc.isAdmin ?? false,
        isAccountVerified: doc.isAccountVerified ?? false,

        followers: (doc.followers ?? []).map((x: any) => x.toString()),
        following: (doc.following ?? []).map((x: any) => x.toString()),
        viewedBy: (doc.viewedBy ?? []).map((x: any) => x.toString()),

        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
    });
};

export const toPersistence = (entity: UserEntity) => {
    return {
        email: entity.email,
        firstName: entity.firstName,
    };
};


export const toPersistenceCreate = (entity: UserEntity) => {
    // const p = user.toJSON();
    return {
        firstName: entity.firstName,
        lastName: entity.lastName,   // ✅ REQUIRED
        email: entity.email,
        password: entity.password,   // ✅ REQUIRED (this is the HASH)
        role: entity.role,
    };
};

export const toDomainList = (docs: any[]): UserEntity[] => {
    return docs.map(toDomain);
};