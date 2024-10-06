import type { AxiosResponse } from "axios";
import type { z } from "zod";

interface ValidateConfig<T extends z.ZodTypeAny> {
  res: AxiosResponse;
  schema: T;
}

export function validateHTTPResponse<T extends z.ZodTypeAny>(
  config: ValidateConfig<T>,
): z.infer<T> {
  const { schema, res } = config;

  const parseResult = schema.safeParse(res.data);

  if (parseResult.success) {
    return parseResult.data;
  }

  const { error } = parseResult;
  captureError(`API Validation Error: ${res.config.url}`, {
    data: res.data,
    issues: error.issues,
  });

  throw error;
}

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

const captureError = (message: string, extra = {}): void => {
  if (process.env.NODE_ENV !== "production") {
    console.error(message, extra);
  }
};
