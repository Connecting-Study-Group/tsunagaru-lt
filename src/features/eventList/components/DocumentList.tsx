import { DocumentData } from '@/types/document'
import React, { memo, useMemo } from 'react'
import Link from "next/link";
import { DocumentCard } from "@/components/DocumentCard";
import { EventCollection } from '../types';
import { useEventListData } from '../hooks/useEventListData';

interface Props {
    eventId: string
    data?: Record<string, EventCollection> 
}

const DocumentList: React.FC<Props> = memo(({eventId, data}) => {
    const {getUserList, getDocument} = useEventListData(data)
    const userList = useMemo(() => getUserList(eventId), [getUserList])
    return (
        <div>
        {!userList.length ? (
          <span>アップロードされた資料はありません</span>
        ) : (
          <>
            {userList.map((userId) => {
              const document = getDocument(eventId, userId);
              if (!document) return <></>;
              return (
                <React.Fragment key={userId}>
                  <Link
                    href={`/events/${eventId}/documents/${userId}`}
                  >
                    <DocumentCard emoji={document.emoji} title={document.title} name={document.name} />
                  </Link>
                </React.Fragment>
              );
            })}
          </>
        )}
      </div>
    )
  })

export default DocumentList
