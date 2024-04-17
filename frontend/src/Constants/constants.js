import {
  arc,
  ieee,
  iedc,
  nss,
  ieee1,
  ieee2,
  ieee3,
  iedc1,
  iedc2,
  iedc3,
  nss1,
  nss2,
  nss3,
  arc1,
  arc2,
  arc3,
} from "../Assets/index"

const ieeeProfile = {
  name: "IEEE",
  icons: ieee,
  carousel: [
    {
      img: ieee1,
    },
    {
      img: ieee2,
    },
    {
      img: ieee3,
    },
  ],
  chair: "Nived G",
  vice_Chair: "Shijin",
}
const iedcProfile = {
  name: "iedc",
  icons: iedc,
  carousel: [
    {
      img: iedc1,
    },
    {
      img: iedc2,
    },
    {
      img: iedc3,
    },
  ],
  chair: "Fuhad Sanin",
  vice_Chair: "Jerry Sanju Johns",
}
const nssProfile = {
  name: "nss",
  icons: nss,
  carousel: [
    {
      img: nss1,
    },
    {
      img: nss2,
    },
    {
      img: nss3,
    },
  ],
  chair: "Akshay Hari",
  vice_Chair: "Aarya Karunakaran",
}
const arcProfile = {
  name: "arc",
  icons: arc,
  carousel: [
    {
      img: arc1,
    },
    {
      img: arc2,
    },
    {
      img: arc3,
    },
  ],
  chair: "Ananthu M",
  vice_Chair: "Aparna S",
}

export { arcProfile, ieeeProfile, iedcProfile, nssProfile }
