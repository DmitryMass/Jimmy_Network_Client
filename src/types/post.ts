export interface IPost {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  description: string;
  location: string;
  imgPath: string;
  userImgPath: string;
  likes: any;
  comments: any;
}
