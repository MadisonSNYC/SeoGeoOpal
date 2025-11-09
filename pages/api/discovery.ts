import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.json({
    name: "SEO GEO Visual Review",
    description: "Displays SEO and GEO audit data in an interactive format.",
    tools: [
      {
        id: "seo-geo-review",
        name: "SEO GEO Viewer",
        description: "Displays an interactive canvas of audit data. Returns selected items.",
        input_schema: {
          type: "object",
          required: ["pages"],
          properties: {
            pages: {
              type: "array",
              items: { type: "object" }
            }
          }
        },
        output_schema: {
          type: "object",
          required: ["products"],
          properties: {
            products: {
              type: "array",
              items: {
                type: "object",
                required: ["id", "selectedDescription", "todos"],
                properties: {
                  id: { type: "string" },
                  selectedDescription: { type: "string" },
                  todos: {
                    type: "array",
                    items: { type: "string" }
                  }
                }
              }
            }
          }
        },
        execution_url: "/api/tools/seo-geo-report",
        mime_type: "application/json"
      }
    ]
  });
}
