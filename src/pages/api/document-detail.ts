// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { EventCollectionResponse } from "@/repository/eventRepository";
import { BaseResponse } from "@/types";
import { DocumentDetailCreateRequest } from "@/repository/documentRepository";
import { uploadFileToContentful } from "@/lib/contentful";

type EventRequest = NextApiRequest & {
  query: {
    eventId: string | undefined;
    documentId: string | undefined;
  };
  body: DocumentDetailCreateRequest;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

export default async function handler(
  req: EventRequest,
  res: NextApiResponse<EventCollectionResponse | BaseResponse>
) {
  if (req.method === "GET") {
    if (!req.query.eventId || !req.query.documentId) {
      res.status(400).end("Bad request. Some parameter is missing.");
      return;
    }
    let data: any = {};
    const docSnap = await getDoc(
      doc(
        db,
        "study-group-list",
        req.query.eventId as string,
        "documents",
        req.query.documentId as string
      )
    );
    if (docSnap.exists()) {
      data = docSnap.data();
    }
    res.status(200).json({ data });
  }
  if (req.method === "POST") {
    if (
      req.body.target_event === undefined ||
      req.body.user_id === undefined ||
      req.body.emoji === undefined ||
      req.body.file === undefined ||
      req.body.url === undefined ||
      req.body.name === undefined ||
      req.body.title === undefined
    ) {
      res.status(400).end("Bad request. Some parameter is missing.");
      return;
    }
    let docParams = {
      emoji: req.body.emoji,
      file: "",
      url: req.body.url,
      name: req.body.name,
      title: req.body.title,
    };
    // contentfulにアップロード
    if (req.body.file.data && req.body.file.type) {
      const asset = await uploadFileToContentful({
        data: req.body.file.data,
        extension: req.body.file.type,
        title: req.body.title,
      });
      docParams.file = asset.sys.id;
    }
    // データがあればfirestoreにアップロード
    if (docParams.file || docParams.url) {
      await setDoc(
        doc(
          db,
          "study-group-list",
          req.body.target_event,
          "documents",
          req.body.user_id
        ),
        docParams
      );
    }
    res.status(200).json({ status: "ok" });
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end("Method Not Allowed");
  }
}
