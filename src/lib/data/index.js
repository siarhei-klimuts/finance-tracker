import { useCallback } from 'react';
import useSWR, { mutate } from 'swr';
import axios from 'axios'

import { useUser } from 'lib/auth';

function useRequest(request, config) {
  const user = useUser();

  return useSWR(
    [request, user],
    () => axios(request, {
      headers: {
        // 'authorization': user ? user._id : '',
      },
    }).then(response => response.data),
    config,
  );
}

function usePostData(url, data) {
  const user = useUser();

  return useCallback(() => axios.post(url, data, {
    headers: {
      // 'authorization': user ? user._id : '',
    },
  }), [url, user, data]);
}

export {
  useRequest,
  usePostData,
};
