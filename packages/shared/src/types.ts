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

export enum UserStatusEnum {
    ONLINE = "online",
    IDLE = "idle",
    OFFLINE = "offline"
}

// user
export interface IUser {
    _id: string;
    email: string;
    fullName: string;
    username: string;
    displayName: string;
    bio?: string;
    avatarUrl?: string

    role: UserRoleEnum;
    status: UserStatusEnum,

    lastSeenAt: Date;
    isOnboarded: boolean;
    lastLoginAt: Date;

    createdAt: Date;
    updatedAt: Date;
}

// LogDeck Core Types

export interface IProject {
    id: string;
    name: string;
    apiKey: string;
    userId: string;
    createdAt: Date;
}

export interface ILogEntry {
    id: string;
    projectId: string;
    level: 'info' | 'error' | 'warn' | 'debug' | 'trace';
    message: string;
    metadata?: Record<string, any>;
    serviceName?: string;
    source?: string;
    createdAt: Date;
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    role: UserRoleEnum;
    createdAt: Date;
    updatedAt: Date;
}