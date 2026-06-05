import {z} from 'zod';

import { SignInSchema, SignUpSchema } from '../validations/auth';

export type SignUpData = z.infer<typeof SignUpSchema>;
export type SignInData = z.infer<typeof SignInSchema>;