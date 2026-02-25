import { google } from "googleapis";

type ApplicationRow = {
  submittedAt: string;
  playerName: string;
  dob: string;
  gender: string;
  school: string;
  county: string;
  club: string;
  position: string;
  level?: string;
  highlightVideo: string;
  extraLink1?: string;
  extraLink2?: string;
  extraLink3?: string;
  notes?: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  hearAboutUs?: string;
  message?: string;
  ip?: string;
};

function getSheetsClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_JSON");

  const creds = JSON.parse(raw);

  const auth = new google.auth.GoogleAuth({
    credentials: creds,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

export async function appendApplicationRow(row: ApplicationRow) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  const tab = process.env.GOOGLE_SHEETS_TAB || "Sheet1";
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEETS_ID");

  const sheets = getSheetsClient();

  // MUST match your header order in the sheet:
  const values = [[
    row.submittedAt,          // submitted_at
    row.ip ?? "",             // ip
    row.playerName,           // playerName
    row.dob,                  // dob
    row.gender,               // gender
    row.school,               // school
    row.county,               // county
    row.club,                 // club
    row.position,             // position
    row.level ?? "",          // level
    row.highlightVideo,       // highlightVideo
    row.extraLink1 ?? "",     // extraLink1
    row.extraLink2 ?? "",     // extraLink2
    row.extraLink3 ?? "",     // extraLink3
    row.notes ?? "",          // notes
    row.parentName,           // parentName
    row.parentEmail,          // parentEmail
    row.parentPhone,          // parentPhone
    row.hearAboutUs ?? "",    // hearAboutUs
    row.message ?? "",        // message
]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}