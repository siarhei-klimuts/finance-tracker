import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios'

import { useUser } from 'lib/auth';

function useRequest(request, config) {
  return useSWR(
    request,
    () => axios(request).then(response => response.data),
    config,
  );
}

function usePostData(url, data) {
  const user = useUser();

  return useCallback((callbackData) => axios.post(url, callbackData || data), [url, user, data]);
}

export {
  useRequest,
  usePostData,
};
