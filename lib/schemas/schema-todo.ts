import { z } from "zod";

const BASE_TODO = z.object({
  title: z.string(),
  description: z.string(),
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     ✨ FUNCTIONS ✨                        */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const SCHEMAS_TODO = {
  FORM: BASE_TODO,
  SERVER: BASE_TODO.extend({
    id: z.coerce.number(),
  }),
};

export type TTodo_Form = z.infer<typeof SCHEMAS_TODO.FORM>;
export type TTodo_Server = z.infer<typeof SCHEMAS_TODO.SERVER>;
