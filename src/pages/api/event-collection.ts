// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { EventCollectionResponse } from "@/repository/eventCollectionRepository";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventCollectionResponse>
) {
  const data: Record<string, any> = {};
  const querySnapshot = await getDocs(
    query(collection(db, "study-group-list"), orderBy("createdAt", "desc"))
  );
  await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      data[doc.id] = {};
      const subQuerySnapshot = await getDocs(
        collection(db, "study-group-list", doc.id, "documents")
      );
      await Promise.all(
        subQuerySnapshot.docs.map((subDoc) => {
          console.log(`${subDoc.id} => ${JSON.stringify(subDoc.data())}`);
          data[doc.id][subDoc.id] = subDoc.data();
        })
      );
    })
  );
  res.status(200).json({ data });
}
