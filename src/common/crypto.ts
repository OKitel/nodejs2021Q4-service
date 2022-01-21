import bcrypt from 'bcrypt';

const saltRounds = 10;

type SaltAndHash = [string, string];

export async function hashPassword(password: string): Promise<SaltAndHash> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    bcrypt.genSalt(saltRounds, (err: Error | undefined, salt: string) => {
      if (err) {
        reject(err.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      bcrypt.hash(
        password,
        saltRounds,
        (error: Error | undefined, hash: string): void => {
          if (error) {
            reject(error.message);
          } else {
            resolve([salt, hash]);
          }
        }
      );
    });
  });
}
