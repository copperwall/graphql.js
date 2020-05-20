import { request as Request } from "@octokit/request";
import { graphql as ApiInterface, Query, RequestParameters } from "./types";
import { graphql } from "./graphql";

export function withDefaults(
  request: typeof Request,
  newDefaults: RequestParameters
): ApiInterface {
  const newRequest = request.defaults(newDefaults);
  const newApi = <T>(
    query: Query | RequestParameters,
    options?: RequestParameters
  ) => {
    return graphql<T>(newRequest, query, options);
  };

  return Object.assign(newApi, {
    defaults: (newDefaults: RequestParameters) => withDefaults(newRequest, newDefaults),
    endpoint: Request.endpoint,
  });
}
