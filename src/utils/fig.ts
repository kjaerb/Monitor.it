import { FIGAthlete } from "@prisma/client";
import axios from "axios";

export async function getFigLicense(license: string) {
  return await axios
    .get<FIGAthlete[]>(
      `https://www.gymnastics.sport/api/athletes.php?function=searchLicenses&discipline=&country=&idlicense=${license}&lastname=`
    )
    .then(async (res) => {
      const athlete = res.data[0];
      if (athlete) {
        return {
          ...athlete,
          figImgUrl: `https://www.gymnastics.sport/asset.php?id=bpic_${athlete.gymnastid}`,
        };
      }
    });
}

export async function getFigImg(gymnastId: number): Promise<string> {
  return await axios
    .get(`https://www.gymnastics.sport/asset.php?id=bpic_${gymnastId}`, {
      headers: {
        "Content-Type": "image/jpeg",
        "Access-Control-Allow-Origin": "GET",
        mode: "no-cors",
      },
    })
    .then((res) => {
      return res.data;
    });
}
