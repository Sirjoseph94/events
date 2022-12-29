import bcrypt from "bcrypt";

export async function encryptPassword(data: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data, salt);
    return hash;
  } catch (error) {
    return error;
  }
}

export async function decryptPassword(
  plain_password: string,
  encrypted_password: string
) {
  try {
    const match = await bcrypt.compare(plain_password, encrypted_password);
    return match;
  } catch (error) {
    return error;
  }
}
