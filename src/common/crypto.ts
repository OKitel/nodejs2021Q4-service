import bcrypt from 'bcrypt';

const saltRounds = 10;

type SaltAndHash = [string, string];

export async function hashPasswordWithSalt(
  password: string,
  salt: string
): Promise<SaltAndHash> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    bcrypt.hash(
      password,
      salt,
      (error: Error | undefined, hash: string): void => {
        if (error) {
          reject(error.message);
        } else {
          resolve([salt, hash]);
        }
      }
    );
  });
}

export async function hashPassword(password: string): Promise<SaltAndHash> {
  return new Promise((res, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    bcrypt.genSalt(saltRounds, async (err: Error | undefined, salt: string) => {
      if (err) {
        reject(err.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
      const passwordWithSalt = await hashPasswordWithSalt(password, salt);
      res(passwordWithSalt);
    });
  });
}
