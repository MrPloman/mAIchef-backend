// application/ports/token.port.ts
export const TOKEN_PORT = 'TOKEN_PORT';

export interface TokenRepository {
  generate(payload: object): string;
  verify(token: string): object | null;
}
