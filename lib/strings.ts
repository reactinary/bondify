export const Strings = {
  capitalize(str: string | undefined) {
    if (!str) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  isEmpty(str: string | null | undefined): boolean {
    return !str || str.length === 0;
  },
  isNotEmpty(str: string | null | undefined): str is string {
    return !Strings.isEmpty(str);
  },
  isBlank(str: string | null | undefined): boolean {
    return !str || str.trim().length === 0;
  },
  isNotBlank(str: string | null | undefined): str is string {
    return !Strings.isBlank(str);
  },
  getCountryUnicode(countryCode: string): string {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  },
  trim(str: string | null | undefined, startLength: number, endLength: number): string {
    if (!str) return "No string available"; // Handle null or undefined string
    if (str.length <= startLength + endLength) return str; // Return the original string if it's too short

    const start = str.substring(0, startLength);
    const end = str.substring(str.length - endLength);
    return `${start}...${end}`; // Format the trimmed string
  },
  // removeAccent(text: string) {
  //   return text
  //     .toLowerCase()
  //     .normalize("NFD")
  //     .replace(/[\u0300-\u036f]/g, "");
  // }
};
