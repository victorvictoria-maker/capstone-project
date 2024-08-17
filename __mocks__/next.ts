type NextCookies = {
  get: jest.Mock;
  set: jest.Mock;
};

type NextModule = {
  cookies: () => NextCookies;
};

const next: NextModule = {
  cookies: jest.fn(() => ({
    get: jest.fn(),
    set: jest.fn(),
  })),
};

export default next;
