export type Strength = "LOW" | "MEDIUM" | "HIGH";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export async function generatePassword(strength: Strength, length: number): Promise<string> {
  const response = await fetch(`${API_URL}/api/password/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ strength, length }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate password");
  }

  return await response.text();
}

export function analyzePassword(password: string) {
  let letters = 0, numbers = 0, symbols = 0;
  for (const ch of password) {
    if (/[a-zA-Z]/.test(ch)) letters++;
    else if (/[0-9]/.test(ch)) numbers++;
    else symbols++;
  }
  return { letters, numbers, symbols };
}

export function getStrengthScore(strength: Strength, length: number): number {
  const base = strength === "LOW" ? 20 : strength === "MEDIUM" ? 50 : 80;
  const lengthBonus = Math.min((length / 128) * 20, 20);
  return Math.min(base + lengthBonus, 100);
}
