export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export const handleApiError = (error) => {
  if (error.status === 502) {
    return new ApiError(
      "Server is currently unavailable. Please try again later.",
      502
    );
  }
  return new ApiError("An unexpected error occurred.", 500);
};
