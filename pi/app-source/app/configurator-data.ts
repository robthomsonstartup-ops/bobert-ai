export type ConfigStatus = "ready" | "review" | "factory" | "photometric" | "keep";

export type Fixture = {
  type: string; area: "Interior" | "Exterior"; specified: string; specifiedCatalog: string;
  description: string; qty: number; qtySource: string; alternate: string; family: string;
  status: ConfigStatus; exception: string; requirements: string[]; alternateCatalog?: string;
};

const f = (type:string, area:"Interior"|"Exterior", specified:string, specifiedCatalog:string, description:string, qty:number, alternate:string, family:string, status:ConfigStatus, exception="", requirements:string[]=[]):Fixture =>
  ({type,area,specified,specifiedCatalog,description,qty,qtySource:area==="Interior"?"E-200 plan takeoff":"ES-2 / ES-3 takeoff",alternate,family,status,exception,requirements});

export const valleyFord: Fixture[] = [
 f("D1","Interior","Cooper Portfolio","ELDSQ4C-15-97-30-D010-SQ-2-H",'4" square recessed downlight · 1,500 lm',117,"LSI","LADSQ square downlight","factory","Confirm 3000K availability; published family options require verification.",["3000K","277V","0-10V","recessed"]),
 f("D2","Interior","Cooper Portfolio","ELDSQ4C-15-97-30-D010-SQ-1-H",'4" square recessed downlight · self-flanged',44,"LSI","LADSQ square downlight","factory","Confirm 3000K and self-flanged configuration.",["3000K","277V","1500 lm"]),
 f("DA2/DA3","Interior","Cooper Portfolio","LDSQ4AA-10-90-30-DED10-LAR35FL-4LSQA1-H","Square adjustable slope wall wash · 35°",11,"LSI","Adjustable square downlight","review","Match aiming, aperture, and wall-wash optic.",["3000K","277V","1000 lm"]),
 f("DM1","Interior","Halo","HCM4-930-ED010-MW-HCM15SP-L111","4-head recessed multiple · 15°",18,"LSI","Recessed multiple","review","Configure four-head multiple and verify 15° optic.",["3000K","277V","4800 lm"]),
 f("DM2","Interior","Halo","HCM4-930-ED010-MB-HCM40FL-L111","2-head recessed multiple · black housing",11,"LSI","Recessed multiple","review","Verify black housing with white flange.",["3000K","277V","2400 lm"]),
 f("DM4","Interior","Halo","HCM4-930-ED010-MW-HCM40FL-L111","2-head recessed multiple · white",2,"LSI","Recessed multiple","review","Configure white two-head multiple.",["3000K","277V","2400 lm"]),
 f("DP1","Interior","Fritz Hansen","P1.5-COLOR","Decorative pendant",5,"Fritz Hansen","P1.5","keep","Keep specified pending decorative selection.",["3000K","277V"]),
 f("L4","Interior","Cooper NeoRay","S122-DS-H-290D-9-30-JB-8FO/8-1-U-DD",'2" surface direct linear · 8 ft',16,"LSI","S-Series linear","review","Confirm continuous-run layout, feed, and 8-foot sections.",["3000K","277V","surface"]),
 f("L5","Interior","Cooper NeoRay","S122-DS-H-290D-9-30-JB-12FO/8-1-U-DD",'2" surface direct linear · 12 ft',4,"LSI","S-Series linear","review","Confirm 12-foot run and joiner arrangement.",["3000K","277V","surface"]),
 f("L8","Interior","Cooper NeoRay","S124-DIP-C-1020D-1035U-9-30-C10-JB-10FO-1-U-DD-F4-W",'4" pendant direct/indirect · 10 ft',4,"LSI","Direct/indirect linear","review","Match direct/indirect distribution and suspension.",["3000K","277V","10 ft"]),
 f("L10","Interior","Cooper NeoRay","S124-DIP-C-1020D-1035U-9-30-C10-JB-12FO-1-U-DD-F-W",'4" pendant direct linear · 12 ft',8,"LSI","Architectural linear","review","Confirm distribution and 12-foot configuration.",["3000K","277V","12 ft"]),
 f("L14.1","Interior","Cooper NeoRay","S124-DIP-C-1020D-1035U-9-30-C10-JB-W-12FO-1-U-DD-F-W",'2" wall/trestle linear · 32 ft',4,"LSI","Architectural linear","review","Verify four 32-foot runs, hardware, and finish.",["3000K","277V","wall"]),
 f("L14.2","Interior","Axis","EX2WD-300-90-SO-8'-FINISH-UNV-DP-1",'2" wall linear · 8 ft',36,"Coronet","Wall-mounted linear","review","Configure Coronet family, mounting, finish, and eight-foot length.",["3000K","277V","300 lm/ft"]),
 f("L15","Interior","Metalux","8SNX-200HL-FDL-UNV-L840-CD-1-U","8-foot pendant strip · clear lens",55,"LSI","8-foot strip","ready","Preferred-vendor family assigned; exact order string needs catalog engine.",["4000K","277V","19062 lm"]),
 f("L17","Interior","Metalux","4SNX-100HL-LW-UNV-L840-CD-1-U","4-foot surface strip · clear lens",30,"LSI","4-foot strip","ready","Preferred-vendor family assigned; exact order string needs catalog engine.",["4000K","277V","9356 lm"]),
 f("L18","Interior","Acolyte","CHAS23-SM-COLOR-C + RB90SWS2653.030 + DRVRPWDW2490120","Recessed wall channel with ribbon tape",3,"Acolyte","Channel + tape + driver","keep","Keep specified until an LED tape vendor is selected.",["3000K","277V"]),
 f("TR1","Interior","Metalux","24EN-LD2-25-UNV-L930-CD-1-U","2×2 recessed troffer · 2,500 lm",72,"LSI","2×2 troffer","ready","Preferred-vendor family assigned; verify 3000K SKU.",["3000K","277V","2500 lm"]),
 f("HB1","Interior","Metalux","OHBL-24SE-W-UNV-L840-CD-UPL12","4-foot high bay · wide distribution",18,"LSI","Linear high bay","ready","Preferred-vendor family assigned; compare output and uplight.",["4000K","277V","24786 lm"]),
 f("X","Interior","Cooper Atlite","ACX Series or approved equal","Red exit sign · AC only",11,"LSI","Exit sign","ready","Preferred-vendor family assigned; verify faces and arrows.",["277V","red","AC only"]),
 f("PA1","Exterior","McGraw Edison","GALN-SB9D-940-XX-5WQ-AP-MA1193","Four-head site pole · 30 ft",3,"LSI","Site/area luminaire","photometric","Requires LSI photometric substitution and pole loading review.",["4000K","480V","67937 lm"]),
 f("PA2","Exterior","McGraw Edison","GALN-SB9C-940-XX-5WQ-AP-MA1193","Four-head site pole · 30 ft",6,"LSI","Site/area luminaire","photometric","Requires LSI photometric substitution and pole loading review.",["4000K","480V","46000 lm"]),
 f("PA3","Exterior","McGraw Edison","GALN-SB9D-940-XX-5WQ-AP-MA1193","Three-head site pole · 30 ft",2,"LSI","Site/area luminaire","photometric","Requires LSI photometric substitution and pole loading review.",["4000K","480V","62500 lm"]),
 f("PA4","Exterior","McGraw Edison","GALN-SB9D-940-XX-AFL-AP-MA1036","Single site pole · AFL",6,"LSI","Site/area luminaire","photometric","AFL distribution must be modeled with LSI photometry.",["4000K","480V","63000 lm"]),
 f("PA5","Exterior","McGraw Edison","GALN-SB9D-940-XX-T4W-AP-MA1193","Single site pole · Type IV wide",22,"LSI","Site/area luminaire","photometric","Type IV wide distribution must be modeled.",["4000K","480V","63000 lm"]),
 f("EWM1","Exterior","Cooper Streetworks","GAW-SA2D-740-U-T4W-BK","Wall-mounted site fixture · black",13,"LSI","Exterior wall mount","photometric","Verify Type IV distribution and mounting height.",["4000K","277V","16080 lm"]),
 f("EWM2","Exterior","Cooper Lumiere","303-W1-LEDB2-4000K-UNV-T4-DM10-WT","Compact wall mount · white",4,"LSI","Compact wall mount","review","Match scale, white finish, and Type IV optic.",["4000K","277V","1035 lm"]),
 f("PS1","Exterior","BK Products","RS4-H2090-12-HU-X112-NSP-9-A-C10-MT-SAP","Two-head spot on 12-foot pole",13,"BK Products","RS4 system","keep","Keep specified pending landscape/site-lighting direction.",["4000K","277V","2 heads"]),
 f("PS2","Exterior","BK Products","CUS-1774-XX-RS4-V3045+V3315+12-HVX12-NSP-4-A-1-010-MT-SAP","Six-head spot on 12-foot pole",1,"BK Products","Custom RS4 system","keep","Custom assembly; keep specified pending direction.",["4000K","277V","6 heads"]),
 f("SS","Exterior","Lithonia","DSXF2LED-P1-40K-70CRI-WFL-MVOLT-THK-DDBXD","In-ground monument-sign flood",2,"LSI","Floodlight","photometric","Verify in-ground application and sign photometrics.",["4000K","277V","7489 lm"]),
 f("SF","Exterior","Lithonia","DSXF3LED-6-P1-40K-70CRI-NSP-MVOLT-THK-DDBXD","In-ground flag-pole flood",1,"LSI","Floodlight","photometric","Verify in-ground application and flag-pole photometrics.",["4000K","277V","11816 lm"]),
];

export const vendorRules = [
 {match:"Cooper / Eaton brands", target:"LSI", includes:"Portfolio, Halo, NeoRay, Metalux, Atlite, McGraw Edison, Streetworks, Lumiere"},
 {match:"Lithonia", target:"LSI", includes:"All Lithonia fixture families"},
 {match:"Axis", target:"Coronet", includes:"Architectural linear fixtures"},
];

export const potbelly = [
 f("L109","Interior","Quanta","Drawing schedule","Cylinder pendant",3,"Lumenture","C70","ready","Verified Potbelly baseline",["3000K","90+ CRI"]),
 f("L207","Interior","Solais incandescent","Drawing schedule","Track head · menu",14,"Solais","Xd20","ready","Verified Potbelly baseline",["3000K","1100 lm","25°"]),
 f("L208","Interior","Solais incandescent","Drawing schedule","Track head · wall flood",18,"Solais","Xd20","ready","Verified Potbelly baseline",["3000K","1100 lm","40°"]),
 f("L300","Interior","Elite","Drawing schedule","Recessed downlight",4,"Nora","NLOPAC","ready","Reviewed Potbelly baseline",["90 CRI","white"]),
 f("L500","Interior","Cooper","Drawing schedule","Emergency unit",7,"BEST Lighting","OEMW","ready","Reviewed Potbelly baseline",["90-minute battery"]),
 f("L502","Interior","Cooper","Drawing schedule","Exit/emergency combo",6,"BEST Lighting","CEMRW","ready","Reviewed Potbelly baseline",["red","90-minute battery"]),
];
