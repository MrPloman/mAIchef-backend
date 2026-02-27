// application/ports/hash.port.ts
export const HASH_PORT = 'HASH_PORT';

export interface BcryptRepository {
  hash(plain: string): Promise<string>;
  compare(plain: string, hashed: string): Promise<boolean>;
}
