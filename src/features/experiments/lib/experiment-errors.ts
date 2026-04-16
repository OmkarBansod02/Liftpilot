export type ExperimentErrorCode =
  | "page_not_found"
  | "pending_variant_not_found"
  | "experiment_already_running";

export class ExperimentError extends Error {
  readonly code: ExperimentErrorCode;
  readonly status: number;

  constructor(code: ExperimentErrorCode, message: string, status: number) {
    super(message);
    this.name = "ExperimentError";
    this.code = code;
    this.status = status;
  }
}

export function toExperimentErrorResponse(error: ExperimentError): Response {
  return Response.json(
    {
      error: error.message,
      code: error.code,
    },
    { status: error.status },
  );
}
