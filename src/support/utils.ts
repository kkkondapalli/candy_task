export default class Utils {
  static removeEmptyItems(items: any) {
    const record = {};
    for (const key in items) {
      const value = items[key];
      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        value.length !== 0
      ) {
        record[key] = value;
      }
    }
    return record;
  }
}
