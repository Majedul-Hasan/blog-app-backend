// export type UserRole = "Admin" | "Guest" | "Blogger";

import { BadRequestError } from '@shared/errors';
import User from '../infrastructure/models/user.model';
import { UserRole } from './types/userRole.types';

// when creating a user (register)
export type UserCreateProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: UserRole;
  bio?: string;
  profilePhoto?: string;
};

// when loading from DB (already persisted)
export type UserPersistedProps = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  role: UserRole;
  bio?: string;
  profilePhoto?: string;

  postCount: number;
  isBlocked: boolean;
  isAdmin: boolean;
  isAccountVerified: boolean;

  followers: string[];
  following: string[];
  viewedBy: string[];

  createdAt?: Date;
  updatedAt?: Date;
};

type UserInternalProps = UserPersistedProps;

export class UserEntity {
  private props: UserInternalProps;

  private constructor(props: UserInternalProps) {
    this.props = props;
  }

  // ✅ factory for register
  static create(input: UserCreateProps): UserEntity {
    if (!input.firstName?.trim()) throw new BadRequestError('firstName is required');
    if (!input.lastName?.trim()) throw new BadRequestError('lastName is required');
    if (!input.email?.trim()) throw new BadRequestError('email is required');
    if (!input.password?.trim()) throw new BadRequestError('password is required');

    return new UserEntity({
      id: '', // temp; repository should return a persisted entity with id
      firstName: input.firstName.trim(),
      lastName: input.lastName.trim(),
      email: input.email.trim().toLowerCase(),
      password: input.password,
      role: input.role ?? UserRole.GUEST,
      bio: input.bio,
      profilePhoto: input.profilePhoto,

      postCount: 0,
      isBlocked: false,
      isAdmin: false,
      isAccountVerified: false,

      followers: [],
      following: [],
      viewedBy: [],
    });
  }

  // ✅ factory for mapper (DB → domain)
  static fromPersistence(input: UserPersistedProps): UserEntity {
    if (!input.id) throw new BadRequestError('id is required');
    return new UserEntity({
      ...input,
      email: input.email.trim().toLowerCase(),
    });
  }

  // getters
  get id() {
    return this.props.id;
  }
  get email() {
    return this.props.email;
  }
  get firstName() {
    return this.props.firstName;
  }
  get lastName() {
    return this.props.lastName;
  }
  get role() {
    return this.props.role;
  }
  get isBlocked() {
    return this.props.isBlocked;
  }
  get password() {
    return this.props.password;
  }

  toPersistence(): UserPersistedProps {
    return { ...this.props };
  }
  toPersistenceCreate(): UserPersistedProps {
    return { ...this.props };
  }

  toResponse() {
    return {
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      role: this.props.role,
      profilePhoto: this.props.profilePhoto,
      postCount: this.props.postCount,
      isBlocked: this.props.isBlocked,
      isAdmin: this.props.isAdmin,
      isAccountVerified: this.props.isAccountVerified,
      followersCount: this.props.followers.length,
      followingCount: this.props.following.length,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }
  changePassword(hashedPassword: string) {
    this.props.password = hashedPassword;
  }
  block() {
    this.props.isBlocked = true;
  }
  unblock() {
    this.props.isBlocked = false;
  }
  verifyAccount() {
    this.props.isAccountVerified = true;
  }
}
