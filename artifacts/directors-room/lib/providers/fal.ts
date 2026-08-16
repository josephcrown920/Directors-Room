import { createFalClient } from "@fal-ai/client";

const key = process.env.FAL_KEY;
export const falClient = key ? createFalClient({ credentials: key }) : null;
