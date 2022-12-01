import React, { memo, useMemo } from 'react'
import Link from "next/link";
import { DocumentCard } from "@/components/DocumentCard";
import { EventCollection } from '../types';
import { useEventListData } from '../hooks/useEventListData';
import { Group, Paper } from '@mantine/core';

interface Props {
    eventId: string
    data?: Record<string, EventCollection> 
}

const DocumentList: React.FC<Props> = memo(({eventId, data}) => {
    const {getUserList, getDocument} = useEventListData(data)
    const userList = useMemo(() => getUserList(eventId), [getUserList])
    return (
        <Paper bg="gray.0" p="md" radius="md" sx={{ minHeight: "140px", display: "flex", alignItems: "center", justifyContent: userList.length ? "flex-start" : "center" }}>
        {!userList.length ? (
          <span>アップロードされた資料はありません</span>
        ) : (
          <Group>
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
          </Group>
        )}
      </Paper>
    )
  })

export default DocumentList
