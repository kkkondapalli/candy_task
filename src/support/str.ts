import { hashSync } from 'bcryptjs';

export default class Str {
  static crypt(payload = ''): string {
    return hashSync(payload === '' ? Date.now().toString() : payload, 10);
  }

  static code(length = 4): string {
    const minValue = 10 ** (length - 1);
    const maxValue = 10 ** length - 1;
    return (
      Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    ).toString();
  }
}
