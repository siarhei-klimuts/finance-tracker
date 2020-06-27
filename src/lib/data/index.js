import { useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';

function useRequest(request, config) {
  return useSWR(
    request,
    () => axios(request).then((response) => response.data),
    config,
  );
}

function usePostData(url, data) {
  return useCallback((callbackData) => axios.post(url, callbackData || data), [url, data]);
}

function useDeleteRequest(url) {
  return useCallback(() => axios.delete(url), [url]);
}

export {
  useRequest,
  usePostData,
  useDeleteRequest,
};
