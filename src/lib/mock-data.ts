// Mock Data for NLACW Case Management System
// National Legal Aid Clinic for Women - Zambia

export type Office = "Lusaka" | "Ndola" | "Livingstone";
export type CaseStatus = "Active" | "Pending Review" | "Closed-Resolved" | "Closed-Unresolved" | "Awaiting Court";
export type CaseType = "GBV" | "Property Dispute" | "Child Custody" | "Maintenance" | "Domestic Violence" | "Land Dispute" | "Inheritance";
export type UserRole = "Admin" | "Lawyer" | "Paralegal" | "Intern";
export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "To Do" | "In Progress" | "Done";
export type DocumentCategory = "Intake Form" | "Affidavit" | "Court Order" | "Correspondence" | "Contract" | "Judgment";
export type CalendarEventType = "Court Hearing" | "Deadline" | "Meeting" | "Consultation";

export interface Staff {
  id: string;
  name: string;
  role: UserRole;
  office: Office;
  email: string;
  phone: string;
  activeCases: number;
  avatar: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  nrc: string;
  phone: string;
  email: string;
  address: string;
  town: string;
  province: string;
  category: CaseType;
  office: Office;
  registrationDate: string;
  status: "Active" | "Inactive" | "Pending";
  casesCount: number;
  notes: string;
}

export interface Case {
  id: string;
  clientId: string;
  clientName: string;
  type: CaseType;
  status: CaseStatus;
  assignedLawyer: string;
  assignedLawyerId: string;
  office: Office;
  description: string;
  opposingParty: string;
  filingDate: string;
  nextCourtDate: string | null;
  courtName: string | null;
  priority: "Urgent" | "High" | "Medium" | "Low";
  lastActivity: string;
  documentsCount: number;
  tasksCount: number;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: CalendarEventType;
  caseId: string;
  caseName: string;
  location: string;
  description: string;
}

export interface Document {
  id: string;
  name: string;
  category: DocumentCategory;
  caseId: string;
  caseName: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  status: "Final" | "Draft" | "Review";
}

export interface Task {
  id: string;
  title: string;
  description: string;
  caseId: string;
  caseName: string;
  assignedTo: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  createdDate: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  caseId: string;
  caseName: string;
  timestamp: string;
  type: "case" | "document" | "task" | "court" | "client";
}

// ==================== STAFF DATA ====================
export const staff: Staff[] = [
  {
    id: "STF001",
    name: "Mwamba Chisenga",
    role: "Admin",
    office: "Lusaka",
    email: "m.chisenga@nlacw.org.zm",
    phone: "+260 977 123 456",
    activeCases: 0,
    avatar: "MC",
  },
  {
    id: "STF002",
    name: "Chanda Banda",
    role: "Lawyer",
    office: "Lusaka",
    email: "c.banda@nlacw.org.zm",
    phone: "+260 977 234 567",
    activeCases: 18,
    avatar: "CB",
  },
  {
    id: "STF003",
    name: "Natasha Phiri",
    role: "Lawyer",
    office: "Lusaka",
    email: "n.phiri@nlacw.org.zm",
    phone: "+260 977 345 678",
    activeCases: 22,
    avatar: "NP",
  },
  {
    id: "STF004",
    name: "Thandiwe Moyo",
    role: "Lawyer",
    office: "Ndola",
    email: "t.moyo@nlacw.org.zm",
    phone: "+260 977 456 789",
    activeCases: 15,
    avatar: "TM",
  },
  {
    id: "STF005",
    name: "Bwalya Kapungwe",
    role: "Lawyer",
    office: "Livingstone",
    email: "b.kapungwe@nlacw.org.zm",
    phone: "+260 977 567 890",
    activeCases: 12,
    avatar: "BK",
  },
  {
    id: "STF006",
    name: "Grace Tembo",
    role: "Paralegal",
    office: "Lusaka",
    email: "g.tembo@nlacw.org.zm",
    phone: "+260 977 678 901",
    activeCases: 25,
    avatar: "GT",
  },
  {
    id: "STF007",
    name: "Mwape Mulenga",
    role: "Paralegal",
    office: "Ndola",
    email: "m.mulenga@nlacw.org.zm",
    phone: "+260 977 789 012",
    activeCases: 20,
    avatar: "MM",
  },
  {
    id: "STF008",
    name: "Chimwemwe Ngoma",
    role: "Paralegal",
    office: "Livingstone",
    email: "c.ngoma@nlacw.org.zm",
    phone: "+260 977 890 123",
    activeCases: 18,
    avatar: "CN",
  },
  {
    id: "STF009",
    name: "Linda Sichone",
    role: "Intern",
    office: "Lusaka",
    email: "l.sichone@nlacw.org.zm",
    phone: "+260 977 901 234",
    activeCases: 8,
    avatar: "LS",
  },
  {
    id: "STF010",
    name: "Mapenzi Mwale",
    role: "Intern",
    office: "Ndola",
    email: "m.mwale@nlacw.org.zm",
    phone: "+260 977 012 345",
    activeCases: 6,
    avatar: "MMap",
  },
];

// ==================== CLIENT DATA ====================
export const clients: Client[] = [
  {
    id: "CLT001",
    firstName: "Mercy",
    lastName: "Zulu",
    nrc: "123456/78/1",
    phone: "+260 966 111 222",
    email: "mercy.zulu@email.com",
    address: "Plot 12, Chelstone Township",
    town: "Lusaka",
    province: "Lusaka",
    category: "Domestic Violence",
    office: "Lusaka",
    registrationDate: "2025-01-15",
    status: "Active",
    casesCount: 2,
    notes: "Referred from Lusaka Central Hospital social work department.",
  },
  {
    id: "CLT002",
    firstName: "Blessings",
    lastName: "Chanda",
    nrc: "234567/89/2",
    phone: "+260 955 222 333",
    email: "",
    address: "House 5, Kitwe West",
    town: "Ndola",
    province: "Copperbelt",
    category: "Maintenance",
    office: "Ndola",
    registrationDate: "2025-02-03",
    status: "Active",
    casesCount: 1,
    notes: "Husband abandoned family, seeking child maintenance.",
  },
  {
    id: "CLT003",
    firstName: "Dorcas",
    lastName: "Mumba",
    nrc: "345678/90/3",
    phone: "+260 944 333 444",
    email: "dorcas.mumba@email.com",
    address: "Plot 8, Libuyu Township",
    town: "Livingstone",
    province: "Southern",
    category: "Property Dispute",
    office: "Livingstone",
    registrationDate: "2025-01-28",
    status: "Active",
    casesCount: 1,
    notes: "Dispute over deceased husband's property with in-laws.",
  },
  {
    id: "CLT004",
    firstName: "Esnart",
    lastName: "Phiri",
    nrc: "456789/01/4",
    phone: "+260 933 444 555",
    email: "",
    address: "Plot 23, Kalingalinga",
    town: "Lusaka",
    province: "Lusaka",
    category: "GBV",
    office: "Lusaka",
    registrationDate: "2025-03-10",
    status: "Active",
    casesCount: 2,
    notes: "Victim of gender-based violence, police report filed at Woodlands Police Station.",
  },
  {
    id: "CLT005",
    firstName: "Towela",
    lastName: "Sakala",
    nrc: "567890/12/5",
    phone: "+260 922 555 666",
    email: "towela.sakala@email.com",
    address: "Flat 4B, Kansenshi",
    town: "Ndola",
    province: "Copperbelt",
    category: "Child Custody",
    office: "Ndola",
    registrationDate: "2025-02-20",
    status: "Active",
    casesCount: 1,
    notes: "Custody battle after divorce. Two minor children involved.",
  },
  {
    id: "CLT006",
    firstName: "Hildah",
    lastName: "Mwanza",
    nrc: "678901/23/6",
    phone: "+260 911 666 777",
    email: "",
    address: "Plot 45, Maramba",
    town: "Livingstone",
    province: "Southern",
    category: "Land Dispute",
    office: "Livingstone",
    registrationDate: "2025-04-05",
    status: "Active",
    casesCount: 1,
    notes: "Customary land being claimed by husband's relatives.",
  },
  {
    id: "CLT007",
    firstName: "Prudence",
    lastName: "Banda",
    nrc: "789012/34/7",
    phone: "+260 977 777 888",
    email: "prudence.banda@email.com",
    address: "Plot 34, Mtendere East",
    town: "Lusaka",
    province: "Lusaka",
    category: "Inheritance",
    office: "Lusaka",
    registrationDate: "2025-01-22",
    status: "Active",
    casesCount: 1,
    notes: "Widow being dispossessed of marital property by deceased husband's family.",
  },
  {
    id: "CLT008",
    firstName: "Chimwemwe",
    lastName: "Ng'ombe",
    nrc: "890123/45/8",
    phone: "+260 966 888 999",
    email: "",
    address: "House 9, Twapia",
    town: "Ndola",
    province: "Copperbelt",
    category: "Domestic Violence",
    office: "Ndola",
    registrationDate: "2025-03-15",
    status: "Active",
    casesCount: 2,
    notes: "Severe domestic violence case. Protection order already obtained.",
  },
  {
    id: "CLT009",
    firstName: "Mwango",
    lastName: "Tembo",
    nrc: "901234/56/9",
    phone: "+260 955 999 000",
    email: "mwango.tembo@email.com",
    address: "Plot 67, Chawama",
    town: "Lusaka",
    province: "Lusaka",
    category: "Maintenance",
    office: "Lusaka",
    registrationDate: "2025-04-12",
    status: "Active",
    casesCount: 1,
    notes: "Father of three children refusing to pay maintenance.",
  },
  {
    id: "CLT010",
    firstName: "Loveness",
    lastName: "Kabwe",
    nrc: "012345/67/0",
    phone: "+260 944 000 111",
    email: "",
    address: "Plot 89, Dambwa Central",
    town: "Livingstone",
    province: "Southern",
    category: "GBV",
    office: "Livingstone",
    registrationDate: "2025-02-14",
    status: "Active",
    casesCount: 1,
    notes: "Survivor of sexual violence. Case reported at Livingstone Central Police.",
  },
  {
    id: "CLT011",
    firstName: "Violet",
    lastName: "Simwinga",
    nrc: "112233/44/1",
    phone: "+260 933 111 222",
    email: "violet.simwinga@email.com",
    address: "Plot 12, Chipata Compound",
    town: "Lusaka",
    province: "Lusaka",
    category: "Property Dispute",
    office: "Lusaka",
    registrationDate: "2025-05-01",
    status: "Pending",
    casesCount: 1,
    notes: "Property ownership dispute with former partner.",
  },
  {
    id: "CLT012",
    firstName: "Sylvia",
    lastName: "Mweene",
    nrc: "223344/55/2",
    phone: "+260 922 222 333",
    email: "",
    address: "House 7, Nkana East",
    town: "Ndola",
    province: "Copperbelt",
    category: "Inheritance",
    office: "Ndola",
    registrationDate: "2025-03-28",
    status: "Active",
    casesCount: 1,
    notes: "Deceased husband's family claiming all property under customary law.",
  },
  {
    id: "CLT013",
    firstName: "Ng'andwe",
    lastName: "Chisenga",
    nrc: "334455/66/3",
    phone: "+260 911 333 444",
    email: "ngandwe.chisenga@email.com",
    address: "Plot 56, Linda Township",
    town: "Livingstone",
    province: "Southern",
    category: "Child Custody",
    office: "Livingstone",
    registrationDate: "2025-04-20",
    status: "Active",
    casesCount: 1,
    notes: "Grandmother seeking custody of orphaned grandchildren.",
  },
  {
    id: "CLT014",
    firstName: "Mapenzi",
    lastName: "Kasonde",
    nrc: "445566/77/4",
    phone: "+260 977 444 555",
    email: "",
    address: "Plot 78, George Compound",
    town: "Lusaka",
    province: "Lusaka",
    category: "GBV",
    office: "Lusaka",
    registrationDate: "2025-05-10",
    status: "Active",
    casesCount: 2,
    notes: "Long-term domestic abuse situation. Children also at risk.",
  },
  {
    id: "CLT015",
    firstName: "Edina",
    lastName: "Milambo",
    nrc: "556677/88/5",
    phone: "+260 966 555 666",
    email: "edina.milambo@email.com",
    address: "Plot 90, Itawa",
    town: "Ndola",
    province: "Copperbelt",
    category: "Land Dispute",
    office: "Ndola",
    registrationDate: "2025-05-05",
    status: "Pending",
    casesCount: 1,
    notes: "Dispute over customary land allocation with village headman.",
  },
  {
    id: "CLT016",
    firstName: "Monde",
    lastName: "Siame",
    nrc: "667788/99/6",
    phone: "+260 955 666 777",
    email: "",
    address: "Plot 34, Maramba",
    town: "Livingstone",
    province: "Southern",
    category: "Domestic Violence",
    office: "Livingstone",
    registrationDate: "2025-04-30",
    status: "Active",
    casesCount: 1,
    notes: "Elderly woman facing abuse from son-in-law living on her property.",
  },
];

// ==================== CASE DATA ====================
export const cases: Case[] = [
  {
    id: "CS-2025-001",
    clientId: "CLT001",
    clientName: "Mercy Zulu",
    type: "Domestic Violence",
    status: "Active",
    assignedLawyer: "Chanda Banda",
    assignedLawyerId: "STF002",
    office: "Lusaka",
    description: "Client reports ongoing physical abuse from husband. Medical reports from UTH obtained. Children are also at risk. Protection order application in progress.",
    opposingParty: "Joseph Zulu",
    filingDate: "2025-01-20",
    nextCourtDate: "2026-06-15",
    courtName: "Lusaka Magistrates Court",
    priority: "Urgent",
    lastActivity: "2026-06-03",
    documentsCount: 5,
    tasksCount: 3,
  },
  {
    id: "CS-2025-002",
    clientId: "CLT002",
    clientName: "Blessings Chanda",
    type: "Maintenance",
    status: "Awaiting Court",
    assignedLawyer: "Thandiwe Moyo",
    assignedLawyerId: "STF004",
    office: "Ndola",
    description: "Client seeking maintenance for three children. Father employed at Mopani Copper Mines but refuses to support children. Maintenance application filed.",
    opposingParty: "Davis Chanda",
    filingDate: "2025-02-10",
    nextCourtDate: "2026-06-20",
    courtName: "Ndola Magistrates Court",
    priority: "High",
    lastActivity: "2026-06-01",
    documentsCount: 3,
    tasksCount: 2,
  },
  {
    id: "CS-2025-003",
    clientId: "CLT003",
    clientName: "Dorcas Mumba",
    type: "Property Dispute",
    status: "Active",
    assignedLawyer: "Bwalya Kapungwe",
    assignedLawyerId: "STF005",
    office: "Livingstone",
    description: "Deceased husband's family attempting to seize marital home. Property registered in both names. Will exists but being contested by in-laws.",
    opposingParty: "Mumba Family (represented by John Mumba)",
    filingDate: "2025-02-01",
    nextCourtDate: "2026-06-25",
    courtName: "Livingstone High Court",
    priority: "High",
    lastActivity: "2026-05-28",
    documentsCount: 7,
    tasksCount: 4,
  },
  {
    id: "CS-2025-004",
    clientId: "CLT004",
    clientName: "Esnart Phiri",
    type: "GBV",
    status: "Active",
    assignedLawyer: "Natasha Phiri",
    assignedLawyerId: "STF003",
    office: "Lusaka",
    description: "Victim of severe gender-based violence. Police report filed at Woodlands Police Station. Medical examination completed. Perpetrator arrested and released on bail.",
    opposingParty: "Steven Phiri",
    filingDate: "2025-03-15",
    nextCourtDate: "2026-06-12",
    courtName: "Lusaka High Court",
    priority: "Urgent",
    lastActivity: "2026-06-04",
    documentsCount: 8,
    tasksCount: 5,
  },
  {
    id: "CS-2025-005",
    clientId: "CLT005",
    clientName: "Towela Sakala",
    type: "Child Custody",
    status: "Pending Review",
    assignedLawyer: "Thandiwe Moyo",
    assignedLawyerId: "STF004",
    office: "Ndola",
    description: "Custody dispute over two minor children (ages 6 and 9). Divorce decree granted but custody arrangement contested. Children currently with father who is preventing mother's access.",
    opposingParty: "Mwansa Sakala",
    filingDate: "2025-02-25",
    nextCourtDate: "2026-07-02",
    courtName: "Ndola Family Court",
    priority: "High",
    lastActivity: "2026-05-30",
    documentsCount: 4,
    tasksCount: 3,
  },
  {
    id: "CS-2025-006",
    clientId: "CLT006",
    clientName: "Hildah Mwanza",
    type: "Land Dispute",
    status: "Active",
    assignedLawyer: "Bwalya Kapungwe",
    assignedLawyerId: "STF005",
    office: "Livingstone",
    description: "Customary land allocated to client by late husband being claimed by husband's younger brother. No written title but traditional allocation documented through village headman.",
    opposingParty: "Ackim Mwanza",
    filingDate: "2025-04-10",
    nextCourtDate: "2026-07-10",
    courtName: "Livingstone Magistrates Court",
    priority: "Medium",
    lastActivity: "2026-06-02",
    documentsCount: 3,
    tasksCount: 2,
  },
  {
    id: "CS-2025-007",
    clientId: "CLT007",
    clientName: "Prudence Banda",
    type: "Inheritance",
    status: "Awaiting Court",
    assignedLawyer: "Chanda Banda",
    assignedLawyerId: "STF002",
    office: "Lusaka",
    description: "Widow dispossessed of marital home and business property by husband's relatives under customary practice of property grabbing. Intestate succession applicable.",
    opposingParty: "Banda Family (represented by Patrick Banda)",
    filingDate: "2025-01-28",
    nextCourtDate: "2026-06-18",
    courtName: "Lusaka High Court",
    priority: "High",
    lastActivity: "2026-06-03",
    documentsCount: 6,
    tasksCount: 3,
  },
  {
    id: "CS-2025-008",
    clientId: "CLT008",
    clientName: "Chimwemwe Ng'ombe",
    type: "Domestic Violence",
    status: "Active",
    assignedLawyer: "Thandiwe Moyo",
    assignedLawyerId: "STF004",
    office: "Ndola",
    description: "Severe domestic violence case. Protection order obtained but being violated. Husband continues to threaten client. Breach of protection order application filed.",
    opposingParty: "Richard Ng'ombe",
    filingDate: "2025-03-20",
    nextCourtDate: "2026-06-22",
    courtName: "Ndola Magistrates Court",
    priority: "Urgent",
    lastActivity: "2026-06-04",
    documentsCount: 9,
    tasksCount: 4,
  },
  {
    id: "CS-2025-009",
    clientId: "CLT009",
    clientName: "Mwango Tembo",
    type: "Maintenance",
    status: "Awaiting Court",
    assignedLawyer: "Natasha Phiri",
    assignedLawyerId: "STF003",
    office: "Lusaka",
    description: "Father of three children employed at a construction company refuses to pay maintenance. Previous out-of-court agreement breached. Formal maintenance application filed.",
    opposingParty: "Peter Tembo",
    filingDate: "2025-04-15",
    nextCourtDate: "2026-06-28",
    courtName: "Lusaka Magistrates Court",
    priority: "Medium",
    lastActivity: "2026-05-25",
    documentsCount: 4,
    tasksCount: 2,
  },
  {
    id: "CS-2025-010",
    clientId: "CLT010",
    clientName: "Loveness Kabwe",
    type: "GBV",
    status: "Active",
    assignedLawyer: "Bwalya Kapungwe",
    assignedLawyerId: "STF005",
    office: "Livingstone",
    description: "Survivor of sexual assault. Case reported to police. Perpetrator known to victim. Criminal case running concurrently. Civil claim for damages being pursued.",
    opposingParty: "Name Withheld (Criminal Case CR/2025/0345)",
    filingDate: "2025-02-20",
    nextCourtDate: "2026-06-30",
    courtName: "Livingstone High Court",
    priority: "Urgent",
    lastActivity: "2026-06-01",
    documentsCount: 6,
    tasksCount: 3,
  },
  {
    id: "CS-2025-011",
    clientId: "CLT011",
    clientName: "Violet Simwinga",
    type: "Property Dispute",
    status: "Pending Review",
    assignedLawyer: "Chanda Banda",
    assignedLawyerId: "STF002",
    office: "Lusaka",
    description: "Property ownership dispute with former partner. Client contributed to purchase of property but title in partner's name only. Seeking declaration of beneficial interest.",
    opposingParty: "Kapila Simwinga",
    filingDate: "2025-05-05",
    nextCourtDate: null,
    courtName: null,
    priority: "Medium",
    lastActivity: "2026-05-20",
    documentsCount: 3,
    tasksCount: 2,
  },
  {
    id: "CS-2025-012",
    clientId: "CLT012",
    clientName: "Sylvia Mweene",
    type: "Inheritance",
    status: "Active",
    assignedLawyer: "Thandiwe Moyo",
    assignedLawyerId: "STF004",
    office: "Ndola",
    description: "Deceased husband's family claiming all property under customary law. Husband died intestate. Intestate Succession Act applies. Property includes house and small business.",
    opposingParty: "Mweene Family",
    filingDate: "2025-04-01",
    nextCourtDate: "2026-07-05",
    courtName: "Ndola High Court",
    priority: "High",
    lastActivity: "2026-05-28",
    documentsCount: 5,
    tasksCount: 3,
  },
  {
    id: "CS-2025-013",
    clientId: "CLT013",
    clientName: "Ng'andwe Chisenga",
    type: "Child Custody",
    status: "Active",
    assignedLawyer: "Bwalya Kapungwe",
    assignedLawyerId: "STF005",
    office: "Livingstone",
    description: "Grandmother seeking custody of three orphaned grandchildren. Parents died in road accident. Paternal uncle attempting to take children for labour purposes.",
    opposingParty: "Moses Chisenga (Uncle)",
    filingDate: "2025-04-25",
    nextCourtDate: "2026-07-08",
    courtName: "Livingstone Family Court",
    priority: "High",
    lastActivity: "2026-06-02",
    documentsCount: 4,
    tasksCount: 3,
  },
  {
    id: "CS-2025-014",
    clientId: "CLT014",
    clientName: "Mapenzi Kasonde",
    type: "GBV",
    status: "Active",
    assignedLawyer: "Natasha Phiri",
    assignedLawyerId: "STF003",
    office: "Lusaka",
    description: "Long-term domestic abuse case involving physical and emotional violence. Three minor children in the household. Emergency shelter arrangement in place.",
    opposingParty: "Marten Kasonde",
    filingDate: "2025-05-15",
    nextCourtDate: "2026-06-16",
    courtName: "Lusaka Magistrates Court",
    priority: "Urgent",
    lastActivity: "2026-06-04",
    documentsCount: 7,
    tasksCount: 4,
  },
  {
    id: "CS-2025-015",
    clientId: "CLT015",
    clientName: "Edina Milambo",
    type: "Land Dispute",
    status: "Pending Review",
    assignedLawyer: "Thandiwe Moyo",
    assignedLawyerId: "STF004",
    office: "Ndola",
    description: "Customary land allocation dispute. Client allocated land by late headman but current headman reallocating to family members. No formal title documents.",
    opposingParty: "Chief Kavubwe (through Headman Mumba)",
    filingDate: "2025-05-08",
    nextCourtDate: null,
    courtName: null,
    priority: "Medium",
    lastActivity: "2026-05-15",
    documentsCount: 2,
    tasksCount: 1,
  },
  {
    id: "CS-2025-016",
    clientId: "CLT016",
    clientName: "Monde Siame",
    type: "Domestic Violence",
    status: "Active",
    assignedLawyer: "Bwalya Kapungwe",
    assignedLawyerId: "STF005",
    office: "Livingstone",
    description: "Elderly woman facing verbal and physical abuse from son-in-law who lives on her property. Intimidation and threats reported. Seeking protection order and eviction.",
    opposingParty: "Darlington Siame (Son-in-law)",
    filingDate: "2025-05-05",
    nextCourtDate: "2026-07-12",
    courtName: "Livingstone Magistrates Court",
    priority: "High",
    lastActivity: "2026-05-30",
    documentsCount: 3,
    tasksCount: 2,
  },
  {
    id: "CS-2025-017",
    clientId: "CLT001",
    clientName: "Mercy Zulu",
    type: "Child Custody",
    status: "Closed-Resolved",
    assignedLawyer: "Chanda Banda",
    assignedLawyerId: "STF002",
    office: "Lusaka",
    description: "Successfully obtained custody of two minor children. Court granted full custody to mother with reasonable access to father.",
    opposingParty: "Joseph Zulu",
    filingDate: "2025-01-20",
    nextCourtDate: null,
    courtName: "Lusaka Family Court",
    priority: "Medium",
    lastActivity: "2026-03-15",
    documentsCount: 8,
    tasksCount: 0,
  },
  {
    id: "CS-2025-018",
    clientId: "CLT004",
    clientName: "Esnart Phiri",
    type: "Maintenance",
    status: "Closed-Resolved",
    assignedLawyer: "Natasha Phiri",
    assignedLawyerId: "STF003",
    office: "Lusaka",
    description: "Maintenance order successfully obtained. Father ordered to pay ZMW 3,500 per month for two children.",
    opposingParty: "Steven Phiri",
    filingDate: "2024-11-15",
    nextCourtDate: null,
    courtName: "Lusaka Magistrates Court",
    priority: "Low",
    lastActivity: "2026-02-28",
    documentsCount: 5,
    tasksCount: 0,
  },
  {
    id: "CS-2025-019",
    clientId: "CLT008",
    clientName: "Chimwemwe Ng'ombe",
    type: "Maintenance",
    status: "Closed-Unresolved",
    assignedLawyer: "Thandiwe Moyo",
    assignedLawyerId: "STF004",
    office: "Ndola",
    description: "Maintenance application dismissed due to insufficient evidence of respondent's income. Client advised to reapply with additional evidence.",
    opposingParty: "Richard Ng'ombe",
    filingDate: "2024-10-10",
    nextCourtDate: null,
    courtName: "Ndola Magistrates Court",
    priority: "Low",
    lastActivity: "2026-01-20",
    documentsCount: 4,
    tasksCount: 0,
  },
  {
    id: "CS-2025-020",
    clientId: "CLT014",
    clientName: "Mapenzi Kasonde",
    type: "Property Dispute",
    status: "Closed-Unresolved",
    assignedLawyer: "Chanda Banda",
    assignedLawyerId: "STF002",
    office: "Lusaka",
    description: "Property dispute resolved through mediation. Client accepted settlement of ZMW 45,000 as share of property value.",
    opposingParty: "Kapila Kasonde",
    filingDate: "2024-09-05",
    nextCourtDate: null,
    courtName: "Lusaka High Court",
    priority: "Low",
    lastActivity: "2025-12-10",
    documentsCount: 6,
    tasksCount: 0,
  },
  {
    id: "CS-2025-021",
    clientId: "CLT007",
    clientName: "Prudence Banda",
    type: "Property Dispute",
    status: "Awaiting Court",
    assignedLawyer: "Natasha Phiri",
    assignedLawyerId: "STF003",
    office: "Lusaka",
    description: "Additional property identified as part of the deceased estate. Bank accounts and vehicle also subject of the dispute. Application to amend court filings.",
    opposingParty: "Banda Family (represented by Patrick Banda)",
    filingDate: "2025-06-01",
    nextCourtDate: "2026-06-18",
    courtName: "Lusaka High Court",
    priority: "High",
    lastActivity: "2026-06-03",
    documentsCount: 4,
    tasksCount: 3,
  },
  {
    id: "CS-2025-022",
    clientId: "CLT009",
    clientName: "Mwango Tembo",
    type: "Child Custody",
    status: "Active",
    assignedLawyer: "Chanda Banda",
    assignedLawyerId: "STF002",
    office: "Lusaka",
    description: "Client also seeking custody arrangements for the three children. Father currently withholding children during school holidays.",
    opposingParty: "Peter Tembo",
    filingDate: "2025-04-20",
    nextCourtDate: "2026-07-15",
    courtName: "Lusaka Family Court",
    priority: "Medium",
    lastActivity: "2026-05-25",
    documentsCount: 3,
    tasksCount: 2,
  },
];

// ==================== CALENDAR EVENTS ====================
export const calendarEvents: CalendarEvent[] = [
  {
    id: "EVT001",
    title: "Court Hearing - Protection Order",
    date: "2026-06-12",
    time: "09:00",
    type: "Court Hearing",
    caseId: "CS-2025-004",
    caseName: "Esnart Phiri vs Steven Phiri",
    location: "Lusaka High Court, Court Room 3",
    description: "Hearing for protection order application under the Anti-GBV Act.",
  },
  {
    id: "EVT002",
    title: "Court Hearing - Maintenance Order",
    date: "2026-06-15",
    time: "10:30",
    type: "Court Hearing",
    caseId: "CS-2025-001",
    caseName: "Mercy Zulu vs Joseph Zulu",
    location: "Lusaka Magistrates Court, Court 5",
    description: "Maintenance hearing for domestic violence case.",
  },
  {
    id: "EVT003",
    title: "Filing Deadline - Inheritance Documents",
    date: "2026-06-17",
    time: "16:00",
    type: "Deadline",
    caseId: "CS-2025-007",
    caseName: "Prudence Banda vs Banda Family",
    location: "Lusaka High Court Registry",
    description: "Deadline for filing additional documents for inheritance claim.",
  },
  {
    id: "EVT004",
    title: "Client Consultation",
    date: "2026-06-13",
    time: "14:00",
    type: "Consultation",
    caseId: "CS-2025-005",
    caseName: "Towela Sakala vs Mwansa Sakala",
    location: "Ndola Office - Conference Room",
    description: "Pre-court consultation with client regarding custody arrangements.",
  },
  {
    id: "EVT005",
    title: "Court Hearing - Property Dispute",
    date: "2026-06-20",
    time: "09:30",
    type: "Court Hearing",
    caseId: "CS-2025-002",
    caseName: "Blessings Chanda vs Davis Chanda",
    location: "Ndola Magistrates Court, Court 2",
    description: "Maintenance application hearing.",
  },
  {
    id: "EVT006",
    title: "Case Strategy Meeting",
    date: "2026-06-14",
    time: "11:00",
    type: "Meeting",
    caseId: "CS-2025-003",
    caseName: "Dorcas Mumba vs Mumba Family",
    location: "Livingstone Office",
    description: "Strategy meeting with paralegal and client regarding property dispute.",
  },
  {
    id: "EVT007",
    title: "Court Hearing - Custody Application",
    date: "2026-06-25",
    time: "08:30",
    type: "Court Hearing",
    caseId: "CS-2025-003",
    caseName: "Dorcas Mumba vs Mumba Family",
    location: "Livingstone High Court",
    description: "Hearing for property dispute. Witness testimony expected.",
  },
  {
    id: "EVT008",
    title: "Deadline - Affidavit Filing",
    date: "2026-06-18",
    time: "12:00",
    type: "Deadline",
    caseId: "CS-2025-008",
    caseName: "Chimwemwe Ng'ombe vs Richard Ng'ombe",
    location: "Ndola High Court Registry",
    description: "Deadline for filing responding affidavit in protection order breach case.",
  },
  {
    id: "EVT009",
    title: "Court Hearing - GBV Case",
    date: "2026-06-16",
    time: "10:00",
    type: "Court Hearing",
    caseId: "CS-2025-014",
    caseName: "Mapenzi Kasonde vs Marten Kasonde",
    location: "Lusaka Magistrates Court",
    description: "Hearing for domestic violence protection order.",
  },
  {
    id: "EVT010",
    title: "Client Follow-up Meeting",
    date: "2026-06-19",
    time: "15:00",
    type: "Consultation",
    caseId: "CS-2025-006",
    caseName: "Hildah Mwanza vs Ackim Mwanza",
    location: "Livingstone Office",
    description: "Follow up with client on land dispute progress.",
  },
  {
    id: "EVT011",
    title: "Court Hearing - Inheritance",
    date: "2026-06-30",
    time: "09:00",
    type: "Court Hearing",
    caseId: "CS-2025-010",
    caseName: "Loveness Kabwe GBV Case",
    location: "Livingstone High Court",
    description: "Civil claim hearing for GBV damages.",
  },
  {
    id: "EVT012",
    title: "Team Review Meeting",
    date: "2026-06-22",
    time: "09:00",
    type: "Meeting",
    caseId: "",
    caseName: "General",
    location: "Lusaka Office - Main Conference Room",
    description: "Weekly case review meeting for all Lusaka office staff.",
  },
];

// ==================== DOCUMENTS DATA ====================
export const documents: Document[] = [
  {
    id: "DOC001",
    name: "Protection Order Application - Mercy Zulu",
    category: "Intake Form",
    caseId: "CS-2025-001",
    caseName: "Mercy Zulu vs Joseph Zulu",
    uploadedBy: "Grace Tembo",
    uploadDate: "2025-01-22",
    fileSize: "245 KB",
    status: "Final",
  },
  {
    id: "DOC002",
    name: "Medical Report - UTH",
    category: "Affidavit",
    caseId: "CS-2025-001",
    caseName: "Mercy Zulu vs Joseph Zulu",
    uploadedBy: "Chanda Banda",
    uploadDate: "2025-01-25",
    fileSize: "1.2 MB",
    status: "Final",
  },
  {
    id: "DOC003",
    name: "Maintenance Application - Blessings Chanda",
    category: "Intake Form",
    caseId: "CS-2025-002",
    caseName: "Blessings Chanda vs Davis Chanda",
    uploadedBy: "Mwape Mulenga",
    uploadDate: "2025-02-12",
    fileSize: "312 KB",
    status: "Final",
  },
  {
    id: "DOC004",
    name: "Property Title Search Results",
    category: "Court Order",
    caseId: "CS-2025-003",
    caseName: "Dorcas Mumba vs Mumba Family",
    uploadedBy: "Bwalya Kapungwe",
    uploadDate: "2025-02-15",
    fileSize: "890 KB",
    status: "Final",
  },
  {
    id: "DOC005",
    name: "Police Report - Woodlands Station",
    category: "Affidavit",
    caseId: "CS-2025-004",
    caseName: "Esnart Phiri vs Steven Phiri",
    uploadedBy: "Natasha Phiri",
    uploadDate: "2025-03-18",
    fileSize: "567 KB",
    status: "Final",
  },
  {
    id: "DOC006",
    name: "Divorce Decree - Sakala",
    category: "Court Order",
    caseId: "CS-2025-005",
    caseName: "Towela Sakala vs Mwansa Sakala",
    uploadedBy: "Thandiwe Moyo",
    uploadDate: "2025-02-28",
    fileSize: "445 KB",
    status: "Final",
  },
  {
    id: "DOC007",
    name: "Custody Application Draft",
    category: "Intake Form",
    caseId: "CS-2025-005",
    caseName: "Towela Sakala vs Mwansa Sakala",
    uploadedBy: "Mwape Mulenga",
    uploadDate: "2025-03-05",
    fileSize: "278 KB",
    status: "Draft",
  },
  {
    id: "DOC008",
    name: "Witness Statement - Village Headman",
    category: "Affidavit",
    caseId: "CS-2025-006",
    caseName: "Hildah Mwanza vs Ackim Mwanza",
    uploadedBy: "Chimwemwe Ngoma",
    uploadDate: "2025-04-15",
    fileSize: "189 KB",
    status: "Review",
  },
  {
    id: "DOC009",
    name: "Letter to Banda Family",
    category: "Correspondence",
    caseId: "CS-2025-007",
    caseName: "Prudence Banda vs Banda Family",
    uploadedBy: "Chanda Banda",
    uploadDate: "2025-02-05",
    fileSize: "134 KB",
    status: "Final",
  },
  {
    id: "DOC010",
    name: "Protection Order - Ng'ombe",
    category: "Court Order",
    caseId: "CS-2025-008",
    caseName: "Chimwemwe Ng'ombe vs Richard Ng'ombe",
    uploadedBy: "Thandiwe Moyo",
    uploadDate: "2025-03-25",
    fileSize: "356 KB",
    status: "Final",
  },
  {
    id: "DOC011",
    name: "Breach Application Draft",
    category: "Intake Form",
    caseId: "CS-2025-008",
    caseName: "Chimwemwe Ng'ombe vs Richard Ng'ombe",
    uploadedBy: "Mwape Mulenga",
    uploadDate: "2025-05-20",
    fileSize: "267 KB",
    status: "Draft",
  },
  {
    id: "DOC012",
    name: "Settlement Agreement - Kasonde Property",
    category: "Contract",
    caseId: "CS-2025-020",
    caseName: "Mapenzi Kasonde vs Kapila Kasonde",
    uploadedBy: "Chanda Banda",
    uploadDate: "2025-12-10",
    fileSize: "423 KB",
    status: "Final",
  },
  {
    id: "DOC013",
    name: "Employment Verification - Mopani",
    category: "Correspondence",
    caseId: "CS-2025-002",
    caseName: "Blessings Chanda vs Davis Chanda",
    uploadedBy: "Mwape Mulenga",
    uploadDate: "2025-03-10",
    fileSize: "156 KB",
    status: "Final",
  },
  {
    id: "DOC014",
    name: "Children's Birth Certificates",
    category: "Affidavit",
    caseId: "CS-2025-009",
    caseName: "Mwango Tembo vs Peter Tembo",
    uploadedBy: "Grace Tembo",
    uploadDate: "2025-04-18",
    fileSize: "2.1 MB",
    status: "Final",
  },
  {
    id: "DOC015",
    name: "Intestate Succession Guide",
    category: "Correspondence",
    caseId: "CS-2025-012",
    caseName: "Sylvia Mweene vs Mweene Family",
    uploadedBy: "Thandiwe Moyo",
    uploadDate: "2025-04-05",
    fileSize: "534 KB",
    status: "Final",
  },
];

// ==================== TASKS DATA ====================
export const tasks: Task[] = [
  {
    id: "TSK001",
    title: "Prepare protection order application",
    description: "Draft and file protection order application for Mercy Zulu including all supporting affidavits.",
    caseId: "CS-2025-001",
    caseName: "Mercy Zulu vs Joseph Zulu",
    assignedTo: "Grace Tembo",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-06-10",
    createdDate: "2026-06-01",
  },
  {
    id: "TSK002",
    title: "Obtain employment records from Mopani",
    description: "Follow up with Mopani Copper Mines HR department for respondent's employment and salary records.",
    caseId: "CS-2025-002",
    caseName: "Blessings Chanda vs Davis Chanda",
    assignedTo: "Mwape Mulenga",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-06-15",
    createdDate: "2026-05-28",
  },
  {
    id: "TSK003",
    title: "File property title documents",
    description: "Submit property title search results and deed documents to court registry.",
    caseId: "CS-2025-003",
    caseName: "Dorcas Mumba vs Mumba Family",
    assignedTo: "Chimwemwe Ngoma",
    priority: "High",
    status: "To Do",
    dueDate: "2026-06-12",
    createdDate: "2026-06-02",
  },
  {
    id: "TSK004",
    title: "Client interview - witness statements",
    description: "Conduct detailed interview with client and obtain witness statements from neighbors.",
    caseId: "CS-2025-004",
    caseName: "Esnart Phiri vs Steven Phiri",
    assignedTo: "Linda Sichone",
    priority: "High",
    status: "Done",
    dueDate: "2026-06-05",
    createdDate: "2026-05-30",
  },
  {
    id: "TSK005",
    title: "Prepare custody application",
    description: "Draft custody application with supporting documents and schedule for filing.",
    caseId: "CS-2025-005",
    caseName: "Towela Sakala vs Mwansa Sakala",
    assignedTo: "Mapenzi Mwale",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-06-20",
    createdDate: "2026-06-01",
  },
  {
    id: "TSK006",
    title: "Research customary land rights",
    description: "Research relevant case law on customary land rights for women in Southern Province.",
    caseId: "CS-2025-006",
    caseName: "Hildah Mwanza vs Ackim Mwanza",
    assignedTo: "Chimwemwe Ngoma",
    priority: "Medium",
    status: "To Do",
    dueDate: "2026-06-18",
    createdDate: "2026-06-03",
  },
  {
    id: "TSK007",
    title: "File additional estate documents",
    description: "File bank account and vehicle registration documents as part of the intestate estate.",
    caseId: "CS-2025-007",
    caseName: "Prudence Banda vs Banda Family",
    assignedTo: "Grace Tembo",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-06-17",
    createdDate: "2026-06-01",
  },
  {
    id: "TSK008",
    title: "Document protection order violations",
    description: "Compile evidence of all protection order violations including text messages and witness accounts.",
    caseId: "CS-2025-008",
    caseName: "Chimwemwe Ng'ombe vs Richard Ng'ombe",
    assignedTo: "Mwape Mulenga",
    priority: "Urgent" as TaskPriority,
    status: "In Progress",
    dueDate: "2026-06-08",
    createdDate: "2026-06-02",
  },
  {
    id: "TSK009",
    title: "Follow up on maintenance order compliance",
    description: "Check if maintenance payments are being made per court order. Contact client for update.",
    caseId: "CS-2025-018",
    caseName: "Esnart Phiri - Maintenance",
    assignedTo: "Grace Tembo",
    priority: "Low",
    status: "To Do",
    dueDate: "2026-06-25",
    createdDate: "2026-06-04",
  },
  {
    id: "TSK010",
    title: "Prepare pre-trial brief",
    description: "Draft pre-trial brief for the GBV civil claim including quantum of damages.",
    caseId: "CS-2025-010",
    caseName: "Loveness Kabwe GBV Case",
    assignedTo: "Chimwemwe Ngoma",
    priority: "High",
    status: "To Do",
    dueDate: "2026-06-22",
    createdDate: "2026-06-03",
  },
  {
    id: "TSK011",
    title: "Contact social welfare for home study",
    description: "Request social welfare department to conduct home study for custody evaluation.",
    caseId: "CS-2025-013",
    caseName: "Ng'andwe Chisenga Custody Case",
    assignedTo: "Chimwemwe Ngoma",
    priority: "Medium",
    status: "In Progress",
    dueDate: "2026-06-28",
    createdDate: "2026-05-25",
  },
  {
    id: "TSK012",
    title: "Arrange emergency shelter",
    description: "Coordinate with YWCA for emergency shelter placement for client and children.",
    caseId: "CS-2025-014",
    caseName: "Mapenzi Kasonde vs Marten Kasonde",
    assignedTo: "Linda Sichone",
    priority: "Urgent" as TaskPriority,
    status: "Done",
    dueDate: "2026-06-05",
    createdDate: "2026-06-03",
  },
  {
    id: "TSK013",
    title: "Schedule mediation session",
    description: "Contact mediation centre to schedule session for land dispute.",
    caseId: "CS-2025-015",
    caseName: "Edina Milambo Land Dispute",
    assignedTo: "Mapenzi Mwale",
    priority: "Low",
    status: "To Do",
    dueDate: "2026-07-01",
    createdDate: "2026-06-04",
  },
  {
    id: "TSK014",
    title: "Review grandmother's financial capacity",
    description: "Assess client's financial ability to care for three grandchildren. Collect supporting documents.",
    caseId: "CS-2025-013",
    caseName: "Ng'andwe Chisenga Custody Case",
    assignedTo: "Mapenzi Mwale",
    priority: "Medium",
    status: "To Do",
    dueDate: "2026-06-30",
    createdDate: "2026-06-04",
  },
  {
    id: "TSK015",
    title: "Update case management system",
    description: "Ensure all recent court outcomes and case developments are captured in the system.",
    caseId: "",
    caseName: "Administrative",
    assignedTo: "Linda Sichone",
    priority: "Low",
    status: "To Do",
    dueDate: "2026-06-12",
    createdDate: "2026-06-05",
  },
];

// ==================== ACTIVITY FEED ====================
export const activities: Activity[] = [
  {
    id: "ACT001",
    action: "Court date scheduled for protection order hearing",
    user: "Natasha Phiri",
    caseId: "CS-2025-004",
    caseName: "Esnart Phiri vs Steven Phiri",
    timestamp: "2026-06-04T14:30:00",
    type: "court",
  },
  {
    id: "ACT002",
    action: "New case intake completed for Violet Simwinga",
    user: "Grace Tembo",
    caseId: "CS-2025-011",
    caseName: "Violet Simwinga vs Kapila Simwinga",
    timestamp: "2026-06-04T11:15:00",
    type: "case",
  },
  {
    id: "ACT003",
    action: "Document uploaded: Breach Application Draft",
    user: "Mwape Mulenga",
    caseId: "CS-2025-008",
    caseName: "Chimwemwe Ng'ombe vs Richard Ng'ombe",
    timestamp: "2026-06-04T10:00:00",
    type: "document",
  },
  {
    id: "ACT004",
    action: "Task completed: Client interview and witness statements obtained",
    user: "Linda Sichone",
    caseId: "CS-2025-004",
    caseName: "Esnart Phiri vs Steven Phiri",
    timestamp: "2026-06-04T09:30:00",
    type: "task",
  },
  {
    id: "ACT005",
    action: "New client registered: Edina Milambo",
    user: "Mwape Mulenga",
    caseId: "CS-2025-015",
    caseName: "Edina Milambo Land Dispute",
    timestamp: "2026-06-03T16:45:00",
    type: "client",
  },
  {
    id: "ACT006",
    action: "Case status updated to Awaiting Court",
    user: "Chanda Banda",
    caseId: "CS-2025-007",
    caseName: "Prudence Banda vs Banda Family",
    timestamp: "2026-06-03T14:20:00",
    type: "case",
  },
  {
    id: "ACT007",
    action: "Court order received: Maintenance Order for Esnart Phiri",
    user: "Natasha Phiri",
    caseId: "CS-2025-018",
    caseName: "Esnart Phiri - Maintenance",
    timestamp: "2026-06-03T11:00:00",
    type: "court",
  },
  {
    id: "ACT008",
    action: "Emergency shelter arranged for Mapenzi Kasonde and children",
    user: "Linda Sichone",
    caseId: "CS-2025-014",
    caseName: "Mapenzi Kasonde vs Marten Kasonde",
    timestamp: "2026-06-03T09:15:00",
    type: "task",
  },
];

// ==================== DASHBOARD KPIs ====================
export const dashboardKPIs = {
  totalActiveCases: 247,
  newCasesThisMonth: 34,
  casesAwaitingCourt: 89,
  successRate: 73,
  totalClients: 1856,
  pendingReviews: 42,
};

// ==================== CHART DATA ====================
export const monthlyCaseIntake = [
  { month: "Jul", cases: 28 },
  { month: "Aug", cases: 35 },
  { month: "Sep", cases: 42 },
  { month: "Oct", cases: 31 },
  { month: "Nov", cases: 38 },
  { month: "Dec", cases: 22 },
  { month: "Jan", cases: 45 },
  { month: "Feb", cases: 39 },
  { month: "Mar", cases: 52 },
  { month: "Apr", cases: 41 },
  { month: "May", cases: 48 },
  { month: "Jun", cases: 34 },
];

export const casesByType = [
  { type: "GBV", count: 68, fill: "#0D9488" },
  { type: "Domestic Violence", count: 52, fill: "#14B8A6" },
  { type: "Maintenance", count: 38, fill: "#2DD4BF" },
  { type: "Property Dispute", count: 32, fill: "#F59E0B" },
  { type: "Child Custody", count: 28, fill: "#F97316" },
  { type: "Inheritance", count: 18, fill: "#EF4444" },
  { type: "Land Dispute", count: 11, fill: "#8B5CF6" },
];

export const casesByOffice = [
  { office: "Lusaka", count: 112, fill: "#0D9488" },
  { office: "Ndola", count: 78, fill: "#14B8A6" },
  { office: "Livingstone", count: 57, fill: "#2DD4BF" },
];

export const caseStatusBreakdown = [
  { status: "Active", count: 142, color: "#10B981" },
  { status: "Awaiting Court", count: 89, color: "#3B82F6" },
  { status: "Pending Review", count: 42, color: "#F59E0B" },
  { status: "Closed-Resolved", count: 156, color: "#6B7280" },
  { status: "Closed-Unresolved", count: 57, color: "#EF4444" },
];

// ==================== REPORTS DATA ====================
export const monthlyOutcomes = [
  { month: "Jan", resolved: 12, unresolved: 5, ongoing: 28 },
  { month: "Feb", resolved: 15, unresolved: 3, ongoing: 21 },
  { month: "Mar", resolved: 18, unresolved: 6, ongoing: 28 },
  { month: "Apr", resolved: 14, unresolved: 4, ongoing: 23 },
  { month: "May", resolved: 20, unresolved: 7, ongoing: 21 },
  { month: "Jun", resolved: 16, unresolved: 5, ongoing: 13 },
];

export const officePerformance = [
  { office: "Lusaka", totalCases: 156, resolved: 118, successRate: 76, avgDuration: "4.2 months" },
  { office: "Ndola", totalCases: 112, resolved: 79, successRate: 71, avgDuration: "4.8 months" },
  { office: "Livingstone", totalCases: 89, resolved: 62, successRate: 70, avgDuration: "5.1 months" },
];

export const caseTypeAnalysis = [
  { type: "GBV", totalCases: 89, resolved: 67, successRate: 75, avgDuration: "3.8 months" },
  { type: "Domestic Violence", totalCases: 72, resolved: 54, successRate: 75, avgDuration: "4.1 months" },
  { type: "Maintenance", totalCases: 56, resolved: 43, successRate: 77, avgDuration: "3.2 months" },
  { type: "Property Dispute", totalCases: 48, resolved: 30, successRate: 63, avgDuration: "6.5 months" },
  { type: "Child Custody", totalCases: 38, resolved: 28, successRate: 74, avgDuration: "5.2 months" },
  { type: "Inheritance", totalCases: 25, resolved: 15, successRate: 60, avgDuration: "7.1 months" },
  { type: "Land Dispute", totalCases: 18, resolved: 9, successRate: 50, avgDuration: "8.3 months" },
];

// Helper functions
export function getStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Pending Review":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Closed-Resolved":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "Closed-Unresolved":
      return "bg-red-100 text-red-800 border-red-200";
    case "Awaiting Court":
      return "bg-sky-100 text-sky-800 border-sky-200";
    case "Urgent":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case "Urgent":
      return "bg-red-100 text-red-800 border-red-200";
    case "High":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Low":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getClientStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Inactive":
      return "bg-gray-100 text-gray-800 border-gray-200";
    case "Pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getEventTypeColor(type: CalendarEventType): string {
  switch (type) {
    case "Court Hearing":
      return "bg-red-100 text-red-800 border-red-200";
    case "Deadline":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "Meeting":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "Consultation":
      return "bg-sky-100 text-sky-800 border-sky-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}
