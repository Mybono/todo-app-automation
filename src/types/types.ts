export type FilterType = (typeof filter)[keyof typeof filter];
export const filter = {
  active: 'active',
  completed: 'completed',
  all: 'all',
} as const;

export interface MockElement {
  setValue?: jest.Mock;
  waitForDisplayed?: jest.Mock;
  [key: string]: any;
}
