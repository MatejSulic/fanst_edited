export type UserType = {
  _id: Types.ObjectId;
  email: string;
  password: string;
};

export type RegisterUserType = Omit<UserType, "_id">;

export type LoginUserType = Pick<UserType, "email" | "password">;

export type LoggedInUserDataType = Pick<UserType, "email">;
