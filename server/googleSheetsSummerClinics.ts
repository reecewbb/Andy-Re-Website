import { google } from "googleapis";

export type SummerClinicRow = {
  timestamp: string;
  registrationId: string;
  clinic: string;

  playerName: string;
  dob: string;
  gender: string;
  county: string;
  club: string;
  position: string;
  levelLeague: string;

  medicalInfo?: string;

  emergencyName: string;
  emergencyPhone: string;

  parentName: string;
  parentEmail: string;
  parentPhone: string;

  termsAccepted: boolean;
  paymentStatus: "Pending" | "Paid" | "Failed";
  notes?: string;

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

export async function appendSummerClinicRow(row: SummerClinicRow) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEETS_ID");

  // New tab you created:
  const tab = process.env.GOOGLE_SHEETS_SUMMER_TAB || "SummerClinics";

  const sheets = getSheetsClient();

  // Must match header order in your SummerClinics tab:
  // timestamp, registrationId, clinic, playerName, dob, gender, county, club, position, levelLeague,
  // medicalInfo, emergencyName, emergencyPhone, parentName, parentEmail, parentPhone,
  // termsAccepted, paymentStatus, notes, ip
  const values = [[
    row.timestamp,
    row.registrationId,
    row.clinic,

    row.playerName,
    row.dob,
    row.gender,
    row.county,
    row.club,
    row.position,
    row.levelLeague,

    row.medicalInfo ?? "",

    row.emergencyName,
    row.emergencyPhone,

    row.parentName,
    row.parentEmail,
    row.parentPhone,

    row.termsAccepted ? "TRUE" : "FALSE",
    row.paymentStatus,
    row.notes ?? "",
    row.ip ?? "",
  ]];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}