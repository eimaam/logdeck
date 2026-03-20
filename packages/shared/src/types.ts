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

export enum StatusTypeEnum {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    BRAND = 'brand',
    CRITICAL = 'critical',
}

// user
export interface IUser {
    id: string; // UUID
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
    id: string; // UUID
    name: string;
    apiKey: string;
    userId: string; // UUID
    createdAt: Date;
}

export interface ILogEntry {
    id: string; // UUID
    projectId: string; // UUID
    level: 'info' | 'error' | 'warn' | 'debug' | 'trace';
    message: string;
    metadata?: Record<string, any>;
    serviceName?: string;
    source?: string;
    createdAt: Date;
}