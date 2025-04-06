import { Prisma } from "@prisma/client";

export type ErrorType =
  | "not_found"
  | "already_exists"
  | "unauthorized"
  | "validation_error"
  | "internal_error";

export class DatabaseError extends Error {
  constructor(public type: ErrorType, message: string, public cause?: unknown) {
    super(message);
    this.name = "DatabaseError";
  }
}

export function handlePrismaError(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Unique constraint violation
    if (error.code === "P2002") {
      throw new DatabaseError(
        "already_exists",
        "Resource already exists",
        error
      );
    }
    // Foreign key constraint violation
    if (error.code === "P2003") {
      throw new DatabaseError("not_found", "Related resource not found", error);
    }
    // Record not found
    if (error.code === "P2025") {
      throw new DatabaseError("not_found", "Resource not found", error);
    }
  }

  throw new DatabaseError(
    "internal_error",
    "An unexpected error occurred",
    error
  );
}
