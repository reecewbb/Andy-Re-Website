// server/googleSheetsSummerClinics.ts
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

type FoundRegistration = {
  rowNumber: number; // 1-indexed sheet row number
  registrationId: string;
  clinic: string;
  playerName: string;
  parentEmail: string;
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

function getTabName(): string {
  return (process.env.GOOGLE_SHEETS_SUMMER_TAB || "SummerClinics").trim();
}

// IMPORTANT: A1 notation quoting for tab names with spaces/special chars
function a1Tab(tab: string): string {
  return `'${tab.replace(/'/g, "''")}'`;
}

/**
 * Finds a registration by registrationId in column B.
 * Assumes headers are in row 1.
 */
export async function findSummerClinicRegistration(registrationId: string): Promise<FoundRegistration | null> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEETS_ID");

  const tab = getTabName();
  const sheets = getSheetsClient();

  // Pull columns A:T (matches your 20 columns incl ip)
  const range = `${a1Tab(tab)}!A:T`;

  const resp = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  const values = resp.data.values || [];
  if (values.length < 2) return null; // header only / empty

  // Columns based on your header order:
  // A timestamp
  // B registrationId
  // C clinic
  // D playerName
  // ...
  // O parentEmail (15th col => index 14)
  const REG_ID_COL = 1; // B
  const CLINIC_COL = 2; // C
  const PLAYER_COL = 3; // D
  const PARENT_EMAIL_COL = 14; // O

  const target = registrationId.trim();

  for (let r = 1; r < values.length; r++) { // start at row index 1 (sheet row 2)
    const row = values[r] || [];
    const rid = String(row[REG_ID_COL] ?? "").trim();
    if (rid === target) {
      return {
        rowNumber: r + 1, // convert array index -> sheet row number
        registrationId: rid,
        clinic: String(row[CLINIC_COL] ?? "").trim(),
        playerName: String(row[PLAYER_COL] ?? "").trim(),
        parentEmail: String(row[PARENT_EMAIL_COL] ?? "").trim(),
      };
    }
  }

  return null;
}

/**
 * Updates paymentStatus (column R) and notes (column S) for the row.
 * Your headers: ... termsAccepted(Q), paymentStatus(R), notes(S), ip(T)
 */
export async function updateSummerClinicPaymentStatus(params: {
  registrationId: string;
  paymentStatus: "Paid" | "Failed";
  notes?: string;
}): Promise<boolean> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEETS_ID");

  const tab = getTabName();
  const sheets = getSheetsClient();

  const found = await findSummerClinicRegistration(params.registrationId);
  if (!found) return false;

  const rowNum = found.rowNumber;

  // Column R = paymentStatus, Column S = notes
  const range = `${a1Tab(tab)}!R${rowNum}:S${rowNum}`;

  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[params.paymentStatus, params.notes ?? ""]],
    },
  });

  return true;
}

export async function appendSummerClinicRow(row: SummerClinicRow) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEETS_ID");

  const tab = getTabName();
  const sheets = getSheetsClient();

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
    range: `${a1Tab(tab)}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });
}