import { arc, ieee, iedc, nss, test2, test1, test3 } from "../Assets/index";

const ieeeProfile = {
  name: "IEEE",
  icons: ieee,
  carousel: [
    {
      img: test1,
    },
    {
      img: test2,
    },
    {
      img: test3,
    },
  ],
};
const iedcProfile = {
  name: "iedc",
  icons: iedc,
};
const nssProfile = {
  name: "nss",
  icons: nss,
};
const arcProfile = {
  name: "arc",
  icons: arc,
};
export { arcProfile, ieeeProfile, iedcProfile, nssProfile };
