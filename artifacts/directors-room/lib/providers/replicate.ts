import Replicate from "replicate";

const token = process.env.REPLICATE_API_TOKEN;
export const replicateClient = token ? new Replicate({ auth: token }) : null;
