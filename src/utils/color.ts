import seedColor from "seed-color";

export function colorFromSeed(seed: string) {
  return seedColor(seed).toHex();
}
