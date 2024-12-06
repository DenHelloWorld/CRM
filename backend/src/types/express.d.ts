declare global {
  namespace Express {
    interface Request {
      version?: string | unique symbol;
    }
  }
}

export {};
