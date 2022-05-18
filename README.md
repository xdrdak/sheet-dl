# getCSVFromGoogleDocs

Fetch sheet data from google as a good old `.csv` file

## Caveats

The sheet MUST be publicly accessible.

## Obtaining the sheetId

You can obtain the sheetId from the url of the sheet.

Given the following url:

```
https://docs.google.com/spreadsheets/d/1J-0j9wSL4dgV-FaFAlqdE1aG65VG2Ma2CbbQbl5Su9E/edit#gid=0
```

The sheetId would be the element right after `/d/`, so in the previous scenario, sheetId would be:

```
1J-0j9wSL4dgV-FaFAlqdE1aG65VG2Ma2CbbQbl5Su9E
```

## Obtaining the sheetName

Simply check the selected tab at the bottom of Google Sheets and use the text AS IS.
