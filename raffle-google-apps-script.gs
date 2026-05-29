// ============================================================
//  Family Holiday Gala Raffle — Google Apps Script
//  Paste this into your Google Sheet's Apps Script editor,
//  then deploy as a Web App (see instructions below).
// ============================================================

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Add headers if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Full Name', 'Phone', 'Email', 'Raffle(s) Entered']);
      sheet.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#ffd700');
    }

    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date().toLocaleString(),
      data.name   || '',
      data.phone  || '',
      data.email  || '',
      data.raffles || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================================
//  HOW TO DEPLOY (takes about 2 minutes):
//
//  1. Open Google Sheets → create a new blank spreadsheet
//     and name it "Gala Raffle Entries" (or anything you like).
//
//  2. In the menu, click Extensions → Apps Script.
//
//  3. Delete any existing code in the editor, then paste
//     the entire contents of this file.
//
//  4. Click Save (floppy disk icon).
//
//  5. Click Deploy → New Deployment.
//
//  6. Click the gear icon next to "Select type" and choose
//     "Web App".
//
//  7. Set the following:
//       - Description: Raffle Form
//       - Execute as: Me
//       - Who has access: Anyone
//
//  8. Click Deploy → Authorize access → Allow.
//
//  9. Copy the Web App URL that appears.
//
// 10. Open family-gala-raffle.html in a text editor,
//     find this line near the top of the <script> section:
//
//       const SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL_HERE';
//
//     Replace YOUR_APPS_SCRIPT_URL_HERE with the URL you copied.
//     Save the file. You're done!
// ============================================================
