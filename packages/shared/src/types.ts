export type NodeEnv = 'development' | 'production' | 'test';

export enum NodeEnvEnum {
    DEVELOPMENT = 'development',
    PRODUCTION = 'production',
    TEST = 'test',
}

export enum UserRoleEnum {
    USER = "user",
    ADMIN = "admin"
}

// user
export interface IUser {
    id: number;
    email: string;
    fullName: string;
    avatarUrl?: string;
    role: UserRoleEnum;
    isOnboarded: boolean;
    isOnline?: boolean;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt?: Date;
}

// LogDeck Core Types
export interface IProject {
    id: number;
    name: string;
    apiKey: string;
    userId: number;
    createdAt: Date;
}

export interface ILogEntry {
    id: number;
    projectId: number;
    level: 'info' | 'error' | 'warn' | 'debug' | 'trace';
    message: string;
    metadata?: Record<string, any>;
    serviceName?: string;
    source?: string;
    createdAt: Date;
}