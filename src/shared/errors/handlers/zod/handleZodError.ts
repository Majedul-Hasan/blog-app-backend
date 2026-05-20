// import { IGenericErrorItem, IGenericErrorResponse } from "@app/interfaces/error";
import { ZodError, ZodIssue } from "zod";

import { IGenericErrorItem, IGenericErrorResponse } from "../../types/GenericErrorResponse";

const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errorMessages: IGenericErrorItem[] = error.issues.map(
    (issue: ZodIssue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessages,
  };
};



export default handleZodError;
