import {QueryClient} from "react-query";

type AnyOBJ = {
  [key: string]: any
}

export const getClient = (() => {
  let client: QueryClient | null = null
  return () => {
    if (!client) client = new QueryClient({
      defaultOptions: {
        queries: {
          cacheTime: 1000 * 60 * 60 * 244,
          staleTime: 1000,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchOnWindowFocus: false,
        }
      }
    })
    return client
  }
})();

const BASE_URL = 'https://fakestoreapi.com'


export const fetcher = async ({
                                path, method, body, params
                              }: {
  path: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body?: AnyOBJ,
  params?: AnyOBJ,
}) => {
  try {
    const url = `${BASE_URL}${path}`;
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': BASE_URL
      },
    }
    return await fetch(url, fetchOptions).then(d => d.json())

  } catch (e) {
    console.error(e);
  }
}


export const QueryKeys = {
  PRODUCTS: 'PRODUCTS'
}