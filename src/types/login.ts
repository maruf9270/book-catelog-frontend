export interface loginData {
  success: boolean;
  message: string;
  statusCode: string;
  data: {
    accessToken: string;
  };
}
