import { useState, useEffect } from 'react';
import { transformKeysToCamelCase } from '../utility/caseTransform';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchOptions extends RequestInit {
  autoFetch?: boolean;
}

export function useFetch<T>(url: string, options: FetchOptions = {}) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const fetchData = async (): Promise<AbortController> => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = await fetch(url, {
        ...options,
        signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = transformKeysToCamelCase(await response.json()) as T;
      setState({ data, loading: false, error: null });
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') return controller;

        setState({ data: null, loading: false, error });
      }
    }

    return controller;
  };

  useEffect(() => {
    let controller: AbortController | null = null;

    if (options.autoFetch !== false) {
      fetchData().then(abortController => {
        controller = abortController;
      });
    }

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [url]);

  return {
    ...state,
    refetch: fetchData,
  };
}
