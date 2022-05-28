import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

import { sheetdl } from "./mod.ts";

serve(async function handler(req) {
  const url = new URL(req.url);

  if (url.pathname === "/") {
    return new Response(
      `
    <html>
      <head>
        <style type="text/css" media="all">
          body#manpage {margin:0}
          .mp {max-width:100ex;padding:0 9ex 1ex 4ex}
          .mp p,.mp pre,.mp ul,.mp ol,.mp dl {margin:0 0 20px 0}
          .mp h2 {margin:10px 0 0 0}
          .mp > p,.mp > pre,.mp > ul,.mp > ol,.mp > dl {margin-left:8ex}
          .mp h3 {margin:0 0 0 4ex}
          .mp dt {margin:0;clear:left}
          .mp dt.flush {float:left;width:8ex}
          .mp dd {margin:0 0 0 9ex}
          .mp h1,.mp h2,.mp h3,.mp h4 {clear:left}
          .mp pre {margin-bottom:20px}
          .mp pre+h2,.mp pre+h3 {margin-top:22px}
          .mp h2+pre,.mp h3+pre {margin-top:5px}
          .mp img {display:block;margin:auto}
          .mp h1.man-title {display:none}
          .mp,.mp code,.mp pre,.mp tt,.mp kbd,.mp samp,.mp h3,.mp h4 {font-family:monospace;font-size:14px;line-height:1.42857142857143}
          .mp h2 {font-size:16px;line-height:1.25}
          .mp h1 {font-size:20px;line-height:2}
          .mp {text-align:justify;background:#fff}
          .mp,.mp code,.mp pre,.mp pre code,.mp tt,.mp kbd,.mp samp {color:#131211}
          .mp h1,.mp h2,.mp h3,.mp h4 {color:#030201}
          .mp u {text-decoration:underline}
          .mp code,.mp strong,.mp b {font-weight:bold;color:#131211}
          .mp em,.mp var {font-style:italic;color:#232221;text-decoration:none}
          .mp a,.mp a:link,.mp a:hover,.mp a code,.mp a pre,.mp a tt,.mp a kbd,.mp a samp {color:#0000ff}
          .mp b.man-ref {font-weight:normal;color:#434241}
          .mp pre {padding:0 4ex}
          .mp pre code {font-weight:normal;color:#434241}
          .mp h2+pre,h3+pre {padding-left:0}
          .mp li { margin-bottom: 6px; }
          .mp ol { margin: 0px; }
          ol.man-decor,ol.man-decor li {margin:3px 0 10px 0;padding:0;float:left;width:33%;list-style-type:none;text-transform:uppercase;color:#999;letter-spacing:1px}
          ol.man-decor {width:100%}
          ol.man-decor li.tl {text-align:left}
          ol.man-decor li.tc {text-align:center;letter-spacing:4px}
          ol.man-decor li.tr {text-align:right;float:right}
        </style>
      </head>
      <body>
        <div class="mp">
          <ol class="man-decor man-head man head">
              <li class="tl">sheet-dl.txt</li>
          </ol>
          <h2 id="what-is-this">WHAT IS THIS?</h2>
          <p>A dumb way to download a single google sheet as a csv.</p>
          <h2 id="how-to">HOW TO USE</h2>
          <p>You can either visit <code>/[sheetId]/[sheetName]</code> to have the CSV rendered on screen.</p>
          <p>Alternatively, append the <strong>.csv</strong> extension like so: <code>/[sheetId]/[sheetName].csv</code> to download the CSV.</p>
          <p>Of course, feel free to use <strong>curl</strong> as well.</p>
          <h2 id="obtain-sheet-id">OBTAINING THE SHEET ID & SHEET NAME</h2>
          <p>You can obtain the sheetId from the url of the sheet.</p>
          <p>Given the following url:</p>
          <p><code>https://docs.google.com/spreadsheets/d/1J-0j9wSL4dgV-FaFAlqdE1aG65VG2Ma2CbbQbl5Su9E/edit#gid=0</code></p>
          <p>The sheetId would be the element right after <code>/d/</code>, so in the previous scenario, sheetId would be:</p>
          <p><code>1J-0j9wSL4dgV-FaFAlqdE1aG65VG2Ma2CbbQbl5Su9E</code><p>
          <p>The <code>[sheetName]</code> can be obtained via the selected tab at the bottom of the sheet.</p>
        </div>
      </body>
    </html>
    `,
      {
        headers: {
          "content-type": "text/html",
        },
      }
    );
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
