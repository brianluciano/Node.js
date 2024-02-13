export default class APIResponse<T = unknown> {
  private code: string;
  private data: T;
  private message: string;

  constructor(code: string, data: T, message: string) {
    this.code = code;
    this.data = data;
    this.message = message;
  }

  // Getter methods for accessing private properties
  getCode(): string {
    return this.code;
  }

  getData(): T {
    return this.data;
  }

  getMessage(): string {
    return this.message;
  }
}
