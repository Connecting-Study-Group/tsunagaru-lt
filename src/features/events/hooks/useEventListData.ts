import { EventId } from '@/types';
import {useCallback, useMemo} from 'react';
import { EventCollection } from '../types';

export const useEventListData = (data: Record<EventId, EventCollection> | undefined) => {
  /** 
   * イベントごとのキー情報
   * 
   * @type {string[]}
   */
    const eventCollectionKeys = useMemo(() => {
    if (data) {
      return Object.keys(data);
    }
    return [];
  }, [data]);
    
  /**
   * イベントに資料を登録したユーザー一覧の取得
   * 
 * @param {string}  eventId イベントID
 * @return {string[]} ユーザー一覧
 */
   const getUserList = useCallback(
    (eventId: string) => {
      if (data) {
        const eventData = data[eventId];
        return Object.keys(eventData);
      }
      return [];
    },
    [data]
  );
  
  
  /**
   * 資料データの取得
   * 
 * @param {string}  eventId イベントID
 * @param {string}  userId ユーザーID
 * @return {DocumentData | null} ドキュメント情報
 */
  const getDocument = useCallback(
    (eventId: string, userId: string) => {
      if (data) {
        const eventData = data[eventId][userId];
        return eventData || null;
      }
      return null;
    },
    [data]
  );
  return { eventCollectionKeys, getUserList, getDocument };
};
