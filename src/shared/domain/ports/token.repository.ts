// application/ports/token.port.ts
export const TOKEN_PORT = 'TOKEN_PORT';

export interface TokenRepository {
  generate(payload: object): string;
  verify(
    token: string,
  ): { email: string; id: string; iat: number; exp: number } | null;
}
