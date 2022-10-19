import { Figathlete } from '@prisma/client';
import axios from 'axios';

export async function getFigLicense(license: string) {
  return await axios
    .get<Figathlete[]>(
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
        'Content-Type': 'image/jpeg',
        'Access-Control-Allow-Origin': 'GET',
        mode: 'no-cors',
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function searchFigLicense(license: string, slice: number) {
  if (!isNaN(Number(license))) {
    return await queryFigLicenseByLicense(license, 1);
  } else {
    const licenseSearch = license.split(' ');
    if (licenseSearch.length === 1) {
      return await queryFigLicenseByName(slice, licenseSearch[0]);
    } else if (licenseSearch.length > 1) {
      if (licenseSearch[1] && licenseSearch[1].length > 1) {
        return await queryFigLicenseByName(slice, licenseSearch[1]);
      }
    } else {
      return undefined;
    }
  }
}

async function queryFigLicenseByLicense(license: string, slice: number) {
  return await axios
    .get<Figathlete[]>(
      `https://www.gymnastics.sport/api/athletes.php?function=searchLicenses&discipline=&country=&idlicense=${license}&lastname=`
    )
    .then(async (res) => {
      return res.data.slice(0, slice);
    });
}

async function queryFigLicenseByName(slice: number, name?: string) {
  return await axios
    .get<Figathlete[]>(
      `https://www.gymnastics.sport/api/athletes.php?function=searchLicenses&discipline=&country=&idlicense=&lastname=${name}`
    )
    .then(async (res) => {
      return res.data.slice(0, slice);
    });
}
