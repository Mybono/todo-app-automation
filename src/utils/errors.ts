export class ElementNotFoundError extends Error {
  constructor(selector: string) {
    super(`Element not found: ${selector}`);
    this.name = 'ElementNotFoundError';
  }
}

export class TimeoutError extends Error {
  constructor(action: string, timeout: number) {
    super(`Timeout waiting for ${action} (${timeout}ms)`);
    this.name = 'TimeoutError';
  }
}

export class InvalidInputError extends Error {
  constructor(field: string, value: string) {
    super(`Invalid input for ${field}: ${value}`);
    this.name = 'InvalidInputError';
  }
}