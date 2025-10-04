import { Images } from "../assets/images";

export type NetworkType = "dashboard" | "emida" | "epay";


export interface Network {
  id: number;
  name: string;
  img: string;
  bg: string;
  type: NetworkType;
  route?: string;   
  value?: number;   
  vc?: string;     
  networkId?: number; 
}

const networks = [
    // 🔹 Dashboard Items
    { id: 1, name: "LinkUp", type: "dashboard", route: "/linkup", img: Images.logos.linkup, bg: "bg-linkup" },
    { id: 2, name: "Surf", type: "dashboard", route: "/SurfDashboard", img: Images.logos.surf, bg: "bg-surfdashbpard" },
    { id: 3, name: "Boom", type: "dashboard", route: "/BoomDashboard", img: Images.logos.boom, bg: "bg-boomdashboard" },
    { id: 4, name: "T-Mobile", type: "dashboard", route: "/TMODashboard", img: Images.logos.tmobile, bg: "bg-tmodashboard" },
    { id: 5, name: "Wifly", type: "dashboard", route: "/WiflyDashboard", img: Images.logos.wifly, bg: "bg-tmodashboard" },
    { id: 6, name: "Unidata", type: "dashboard", route: "/UnidataDashboard", img: Images.logos.unidata, bg: "bg-unidatadashboard" },
    { id: 7, name: "Ultra", type: "dashboard", route: "/UltraDashboard", img: Images.logos.ultra, bg: "bg-ultradashboard" },
    { id: 8, name: "Rivertel", type: "dashboard", route: "/RivertelDashboard", img: Images.logos.rivertel, bg: "bg-riverteldashboard" },

        // 🔹 Epay Networks
        { id: 201, name: "AT&T", type: "epay", networkId: 66, img: Images.logos.att, bg: "bg-atnt" },


    // 🔹 Emida Networks
    { id: 101, name: "Varizon", type: "emida", value: 67, vc: "VeriZon", img: Images.logos.varizon, bg: "bg-verizon" },
    { id: 102, name: "H2O Wireless", type: "emida",  value: 15, vc: "H2OMOB", img: Images.logos.h2o, bg: "bg-h2o" },
    { id: 103, name: "Boss Rev", type: "emida", value: 16, vc: "BossMOB", img: Images.logos.bossrev, bg: "bg-boss" },
    { id: 104, name: "Genmobile", type: "emida", value: 22, vc: "GenMOB", img: Images.logos.genmobile, bg: "bg-genmobile" },
    { id: 105, name: "Liberty", type: "emida",  value: 23, vc: "LibertyMOB",  img: Images.logos.liberty, bg: "bg-liberty" },
    { id: 106, name: "Red Pocket", type: "emida",  value: 24, vc: "RedPocket", img: Images.logos.redpocket, bg: "bg-redpocket" },
    { id: 107, name: "Simple Mobile", type: "emida", value: 25, vc: "SimpleMOB", img: Images.logos.simplemobile, bg: "bg-simple" },
    { id: 108, name: "Safe Link", type: "emida", value: 26, vc: "SafeLink", img: Images.logos.safelink, bg: "bg-safelink" },
    { id: 109, name: "Sin Pin", type: "emida", value: 27, vc: "SinPin", img: Images.logos.sinpin, bg: "bg-sinpin" },
    { id: 110, name: "Total Wireless", type: "emida", value: 28, vc: "TotalWire", img: Images.logos.totalwireless, bg: "bg-totalwire" },
    { id: 111, name: "Telcel", type: "emida", value: 29, vc: "Telcel",  img: Images.logos.telcel, bg: "bg-telcel" },
    { id: 112, name: "Tracfone", type: "emida", value: 30, vc: "Tracfone", img: Images.logos.tracfone, bg: "bg-tracfone" },
    { id: 113, name: "Net10", type: "emida", value: 31, vc: "Net10", img: Images.logos.net10, bg: "bg-net10" },
    { id: 114, name: "Go Smart", type: "emida", value: 32, vc: "GoSmart", img: Images.logos.gosmart, bg: "bg-gosmart" },
    { id: 115, name: "lyca", type: "emida", value: 68, vc: "lyca", img: Images.logos.lyca, bg: "bg-verizon" },

];

export default networks;
