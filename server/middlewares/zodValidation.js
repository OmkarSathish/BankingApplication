import { z } from 'zod';

const registerInfoSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(3).max(32),
  lastName: z.string().max(32).optional(),
  password: z.string().min(6).max(32),
});

export function validateRegisterInfo(req, res, next) {
  const { error } = registerInfoSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  next();
}

const loginInfoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
});

export function validateLoginInfo(req, res, next) {
  const { error } = loginInfoSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  next();
}

const profileUpdateInfoSchema = z.object({
  password: z.string().min(6).max(32).optional(),
  firstName: z.string().min(3).max(32).optional(),
  lastName: z.string().max(32).optional(),
});

export function validateProfileUpdateInfo(req, res, next) {
  const { error } = profileUpdateInfoSchema.safeParse(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  next();
}
