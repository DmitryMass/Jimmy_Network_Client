export interface IUserType {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imgPath?: string;
  friends: any[] | undefined;
  location?: string;
  occupation?: string;
  viewedProfile?: number;
  impressions?: number;
}
