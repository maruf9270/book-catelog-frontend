export interface loginData {
  success: boolean;
  message: string;
  statusCode: string;

  data: {
    loggedIn: boolean;
    accessToken: string;
    user: {
      _id: "";
      name: "";
      email: "";
      phoneNumber: "";
    };
  };
}
