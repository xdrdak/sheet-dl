export async function sheetdl({
  sheetId,
  sheetName,
}: {
  sheetId: string;
  sheetName: string;
}) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${sheetName}`;
  const data = await fetch(url);
  const text = await data.text();

  if (
    text.includes('class="errorMessage"') &&
    text.includes("the file you have requested does not exist")
  ) {
    throw new Error(
      `The following sheet: ${sheetId}/${sheetName} does not exist.`
    );
  }

  return text;
}
