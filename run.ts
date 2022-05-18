import { getCSVFromGoogleDocs } from "./mod.ts";

const results = await getCSVFromGoogleDocs({
  sheetId: "1J-0j9wSL4dgV-waFAlqdE1aG65VG2Ma2CbbQbl5Su9E",
  sheetName: "Winter",
});

console.log(results);
