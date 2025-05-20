export enum UserRole {
    ADMIN = "admin",
    EDITOR = "editor",
    VIEWER = "viewer",
}

export enum RolePermissions {
    READ = "read",
    WRITE = "write",
    DELETE = "delete",
}

export function toUserRole(role: string): UserRole {
    if (Object.values(UserRole).includes(role as UserRole)) {
        return role as UserRole;
    }
    return UserRole.VIEWER;
}