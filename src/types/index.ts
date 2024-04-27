export type TUser = {
  id: number;
  name: string;
};

export type TComment = {
  id: string;
  sender: { id: number }; // reference to the id of the user who sent the message
  message: string;
  createdAt: string;
};
