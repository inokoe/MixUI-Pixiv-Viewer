import { TIME_OUT } from './config.js';
import { getRequestHeaders, getRequestPathData } from './utils.js';

interface RequestData {
  url: string;
  headers: HeadersInit;
}

async function getApiData(
  redirectUrl: string,
  BASE_URL: string,
  request: RequestData,
  timeout = TIME_OUT
) {
  const controller = new AbortController();
  const signal = controller.signal;

  const forwardUrl = redirectUrl || getRequestPathData(BASE_URL, request.url);
  const myHeaders = getRequestHeaders(request.headers) as HeadersInit;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(forwardUrl, {
      method: 'GET',
      headers: myHeaders,
      signal,
    });

    clearTimeout(timeoutId);

    const result = await response.json();

    return {
      result,
      status: response.status,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Fetch request timed out');
    } else {
      console.error('Fetch error:', error);
    }
    return null;
  }
}

export { getApiData };
