import { Illust, PixivShowResponse } from '@/api/http/base.types';
import getShow from '@/api/http/show';
import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toastMsg } from '@/utils/pixiv/Tools';
import { MyNProgress } from '@/lib/utils';

const useShowData = () => {
  const [result, setResult] = useState<Illust | null>(null);
  const flag = useRef(true);
  const { id } = useParams();

  const requestShowData = useCallback(async () => {
    if (!id) return;
    let retryCound = 3;
    while (retryCound > 0) {
      const res = (await getShow(id)) as PixivShowResponse;
      if ('illusts' in res.api && !Array.isArray(res.api.illusts)) {
        setResult(res.api.illusts);
        MyNProgress.done();
        return;
      } else {
        toastMsg('请求失败', '⚠️将在1秒后重试');
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      retryCound--;
    }
    toastMsg('请求次数限制', '⚠️无法获取更多数据，可能已经全部加载了喔');
  }, [id]);

  useEffect(() => {
    if (id && /^\d+$/.test(id)) {
      if (flag.current) {
        MyNProgress.start();
        requestShowData();
        flag.current = false;
      }
    } else {
      toastMsg('ID错误', '⚠️请检查ID是否正确');
    }
  }, [requestShowData]);

  return result;
};

export default useShowData;
