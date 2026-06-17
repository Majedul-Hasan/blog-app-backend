export interface UserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  profilePhoto?: string;
  postCount: number;
  isBlocked: boolean;
  isAdmin: boolean;
  isAccountVerified: boolean;
  followersCount: number;
  followingCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
