import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pages } = req.body;

  if (!pages || !Array.isArray(pages)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const output = {
    products: pages.map((page: any) => ({
      id: page.id,
      title: page.title,
      selectedDescription: "balanced",
      completedItems: ["description"],
      todos: page.seo.recommendations.map((_: any, i: number) => `seo-${i}`)
    }))
  };

  res.status(200).json(output);
}
