import { useState, useCallback } from 'react';
import { transformKeysToCamelCase, transformKeysToSnakeCase } from '../utility/caseTransform';

interface MutationState<TData, TError> {
  data: TData | null;
  error: TError | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface MutationOptions<TVariables> {
  method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  transformVariables?: (variables: TVariables) => any;
}

export function useMutation<TData = unknown, TError = Error, TVariables = unknown>(
  url: string,
  options: MutationOptions<TVariables> = {}
) {
  const [state, setState] = useState<MutationState<TData, TError>>({
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const mutate = useCallback(
    async (variables?: TVariables) => {
      setState({
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const transformedVariables = options.transformVariables
          ? options.transformVariables(variables as TVariables)
          : variables;

        const response = await fetch(url, {
          method: options.method || 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
          body: transformedVariables
            ? JSON.stringify(transformKeysToSnakeCase(transformedVariables))
            : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const data = transformKeysToCamelCase(responseData) as TData;

        setState({
          data,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });

        options.onSuccess?.(data);
        return data;
      } catch (error) {
        const errorObj = error as TError;
        setState({
          data: null,
          error: errorObj,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });

        options.onError?.(errorObj);
        throw errorObj;
      }
    },
    [url, options]
  );

  return {
    ...state,
    mutate,
    reset: () =>
      setState({
        data: null,
        error: null,
        isLoading: false,
        isSuccess: false,
        isError: false,
      }),
  };
} 