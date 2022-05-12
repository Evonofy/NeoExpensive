import { NextRouter, useRouter } from 'next/router';

type TypeSafeRouter<QueryParams> = NextRouter & {
  query: QueryParams;
};

// prettier-ignore
export function useTypeSafeRouter<RouteQuery = {}>(): TypeSafeRouter<RouteQuery> {
  return useRouter() as TypeSafeRouter<RouteQuery>;
}
