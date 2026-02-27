export class UserResponse {
  public readonly id: string;
  public readonly email: string;
  public readonly token: string;
  public readonly name?: string;

  constructor(response: {
    id: string;
    email: string;
    token: string;
    name?: string;
  }) {
    this.id = response.id;
    this.email = response.email;
    this.token = response.token;
    this.name = response.name;
  }
}
