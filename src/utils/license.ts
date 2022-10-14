import {
  TrampolineLicense,
  trampolineLicenses,
} from "@/data/trampolineLicenses";

export function getAtheleteInfo(license: TrampolineLicense) {
  return trampolineLicenses[license];
}
