export function decodeBase64JsonParam(encoded: string): any {
  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");
    return JSON.parse(decoded);
  } catch (e) {
    console.error("Decode failed", e);
    return [];
  }
}
