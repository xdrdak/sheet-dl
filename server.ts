import { serve } from "https://deno.land/std@0.114.0/http/server.ts";
import { xmd } from "https://raw.githubusercontent.com/xdrdak/xmd/66db380a36a117b03e9ba6116631d9437f1cecee/mod.ts";

import { sheetdl } from "./mod.ts";

const html = await xmd({
  filename: "README.md",
  title: "sheet-dl.txt",
});

serve(async function handler(req) {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return new Response(html, {
      headers: {
        "content-type": "text/html",
      },
    });
  }

  const [, sheetId, sheet] = url.pathname.split("/");
  const [name, extension] = sheet.split(".");

  if (sheetId && name) {
    try {
      const data = await sheetdl({ sheetId, sheetName: name });
      return new Response(data, {
        headers: {
          "content-type": extension === "csv" ? "text/csv" : "text/html",
        },
      });
    } catch (_) {
      return new Response(
        `Could not retrieve [${sheetId}, ${name}]. Please check your sheetId and sheetName and make sure the sheet is publicly accessible.`,
        {
          status: 400,
          headers: {
            "content-type": "text/plain",
          },
        }
      );
    }
  }

  return new Response(null, {
    status: 404,
  });
});
