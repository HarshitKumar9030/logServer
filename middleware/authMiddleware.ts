// @ts-nocheck
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.redirect('/auth/login');
  }
  next();
}