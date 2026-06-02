export const Role = {
    STUDENT: 'student',
    PROF: 'prof'
} as const;

export type RoleType = typeof Role[keyof typeof Role];

export interface User {
  username: string;
  role: RoleType;
}