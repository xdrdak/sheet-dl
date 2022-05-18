export async function getCSVFromGoogleDocs({
  sheetId,
  sheetName,
}: {
  sheetId: string;
  sheetName: string;
}) {
  const url =
    `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
  const data = await fetch(url);
  return data.text();
}
