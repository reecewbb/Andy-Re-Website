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

  const values = [[
    row.submittedAt,
    row.ip ?? "",
    row.playerName,
    row.dob,
    row.gender,
    row.school,
    row.county,
    row.club,
    row.position,
    row.level ?? "",
    row.notes ?? "",
    row.parentName,
    row.parentEmail,
    row.parentPhone,
    row.hearAboutUs ?? "",
    row.message ?? "",
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}
