export function success(data: Record<string, any>) {
  return {
    status: "success",
    response: {
      ...data,
    },
  };
}

export function failed(data: Record<string, any>) {
  return {
    status: "failed",
    reason: {
      ...data,
    },
  };
}
