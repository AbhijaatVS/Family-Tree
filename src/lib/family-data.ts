export type SocialLink = {
  label: string;
  href: string;
};

export type TreeMember = {
  name: string;
  slug: string;
};

export type TreeNode = {
  id: string;
  note?: string;
  members: TreeMember[];
  children: TreeNode[];
};

export type Person = {
  slug: string;
  name: string;
  title: string;
  about: string;
  branch: string;
  photo: string;
  parents: string[];
  children: string[];
  socials: SocialLink[];
  nodeId: string;
  birthday?: string;
};

type RawTreeNode = {
  members: string[];
  note?: string;
  children?: RawTreeNode[];
};

const rawFamilyTree: RawTreeNode = {
  members: ["Sri Shiv Niranjan Singh", "Dhanvantri Devi"],
  note: "7 daughters and 1 son",
  children: [
    {
      members: ["Sunaina Singh", "Udai Pratap Singh"],
      children: [
        {
          members: ["Anil Kumar Singh", "Shail Singh"],
          children: [
            {
              members: ["Abhishek Singh", "Priyanka"],
              children: [
                { members: ["Yashswini"], children: [] },
                { members: ["Tejaswini"], children: [] }
              ]
            },
            {
              members: ["Nidhi Singh"],
              children: [{ members: ["Vidhushi Singh"], children: [] }]
            }
          ]
        },
        {
          members: ["Nilima Singh", "Abhaya Singh"],
          children: [
            { members: ["Saurabh Singh", "Puja"], children: [] },
            {
              members: ["Aditya Singh", "Komil Sharma"],
              children: [{ members: ["Aarush Devin"], children: [] }]
            }
          ]
        },
        {
          members: ["Pradeep Singh", "Lata Singh"],
          children: [
            {
              members: ["Anurag Singh", "Shikha Singh"],
              children: [{ members: ["Rohil Singh"], children: [] }]
            },
            { members: ["Tanushree Singh"], children: [] }
          ]
        },
        {
          members: ["Poonam Shah", "Sanjeev Shah"],
          children: [
            { members: ["Tanvi Shah"], children: [] },
            { members: ["Prateek Shah"], children: [] }
          ]
        },
        {
          members: ["Sushma Singh", "R.P. Singh"],
          children: [
            {
              members: ["Siddharth Singh", "Pratibha"],
              children: [{ members: ["child"], children: [] }]
            },
            { members: ["Shevangae Singh"], children: [] }
          ]
        }
      ]
    },
    {
      members: ["Gunaina Singh", "DP Singh"],
      children: [
        {
          members: ["Vinod Singh", "Alka Singh"],
          children: [
            {
              members: ["Shipra Singh", "Sankalp Singh"],
              children: [{ members: ["Drishti"], children: [] }]
            },
            {
              members: ["Dhruv Singh", "Shweta Singh"],
              children: [
                { members: ["Naina"], children: [] },
                { members: ["Tara"], children: [] }
              ]
            }
          ]
        },
        {
          members: ["Dr. Archana", "S.B. Singh"],
          children: [
            {
              members: ["Rahul Gautam", "Sujata"],
              children: [
                { members: ["Devika"], children: [] },
                { members: ["Naomi"], children: [] }
              ]
            },
            { members: ["Sidhart Gautam", "Swati"], children: [{ members: ["Avni"], children: [] }] }
          ]
        },
        { members: ["Vivek Singh", "Shailja"], children: [{ members: ["Manu"], children: [] }] },
        { members: ["Rajeev Singh", "Rita"], children: [{ members: ["Priya"], children: [] }] },
        { members: ["Amrita Singh", "Anant Singh"], children: [{ members: ["Srishti"], children: [] }] }
      ]
    },
    {
      members: ["Gayatri Singh", "RP Singh"],
      children: [
        {
          members: ["Ravi Prakash Singh", "Neerja Singh"],
          children: [
            { members: ["Richa Singh", "Vivek"], children: [{ members: ["Vivan"], children: [] }] },
            { members: ["Ruchir Singh", "Srishti"], children: [{ members: ["Rudvik Pratap"], children: [] }] }
          ]
        }
      ]
    },
    {
      members: ["NainBala Singh", "Samar Bahadur Singh"],
      children: [
        {
          members: ["Pankaj Singh", "Suman Singh"],
          children: [{ members: ["Sibbu Shivendra Bahadur", "Shivangi"], children: [] }]
        },
        {
          members: ["Dr. Neeraj Singh", "Dr. Amita Singh"],
          children: [
            { members: ["Chitrangda Singh", "Keval Shah"], children: [] },
            { members: ["Shruti Singh"], children: [] }
          ]
        },
        { members: ["Jalaj Singh", "Nimisha Singh"], children: [{ members: ["Aditya Vikram Singh"], children: [] }] },
        {
          members: ["Vandana Singh", "Rakesh Singh"],
          children: [
            { members: ["Karan", "Dhwani"], children: [] },
            { members: ["Yasharth"], children: [] }
          ]
        }
      ]
    },
    {
      members: ["Abha Singh", "Udairaj Singh"],
      children: [
        { members: ["Sanjaya Singh", "Anu Singh"], children: [{ members: ["Ajit Singh"], children: [] }] },
        {
          members: ["Archana Singh", "Jitendra Bahadur Singh"],
          children: [
            { members: ["Chitrangda Singh", "Lokesh"], children: [{ members: ["Ameika Singh"], children: [] }] },
            {
              members: ["Vasundhara Singh", "Harshal"],
              children: [{ members: ["Ivaan Singh Petkar"], children: [] }]
            },
            { members: ["Charu Vikram Singh"], children: [] }
          ]
        },
        { members: ["Dhananjaya Singh", "Anjali Singh"], children: [{ members: ["Aditi Singh"], children: [] }, { members: ["Anshuman Singh"], children: [] }] }
      ]
    },
    {
      members: ["Rajeshwari Singh", "Vijay Bahadur Singh"],
      children: [
        {
          members: ["Vibha Shah", "Rajiv Shah"],
          children: [
            { members: ["Pralabhya Pratap Shah", "Drishti Shah"], children: [] },
            { members: ["Praveen Pratap Shah"], children: [] }
          ]
        },
        {
          members: ["Neeta Singh", "Sandeep Singh"],
          children: [
            { members: ["Sanya Singh", "Rishiraj Singh"], children: [{ members: ["Sarannya"], children: [] }] },
            { members: ["Shashank Shekhar Singh"], children: [] }
          ]
        },
        { members: ["Ajay Singh", "Pratibha Singh"], children: [{ members: ["Jayank"], children: [] }, { members: ["Shashwat"], children: [] }] },
        {
          members: ["Ritu Sahi", "Anand Sahi"],
          children: [
            { members: ["Sambhavi Singh", "Amoolya Pratap Singh"], children: [] },
            { members: ["Saanvika Sahi"], children: [] }
          ]
        }
      ]
    },
    {
      members: ["Sudha Singh", "DP Singh"],
      children: [
        {
          members: ["Sangeeta Singh", "Ajay Singh"],
          children: [{ members: ["Yasha Singh"], children: [] }, { members: ["Shasya Singh"], children: [] }]
        },
        {
          members: ["Sanjeev Singh", "Priya Singh"],
          children: [{ members: ["Devyani Singh"], children: [] }, { members: ["Abhijaat Vikram Singh"], children: [] }]
        }
      ]
    },
    {
      members: ["Rakesh Singh", "Manju Singh"],
      children: [
        { members: ["Meghna Singh", "Satish Kumar Singh"], children: [{ members: ["Shourya"], children: [] }] },
        {
          members: ["Himja Singh", "Darpan Patel"],
          children: [{ members: ["Rudra"], children: [] }, { members: ["Vaishvi Patel"], children: [] }]
        },
        { members: ["Kanika Singh", "Sanchit Mendiratta"], children: [{ members: ["Riana"], children: [] }] }
      ]
    }
  ]
};

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function avatarDataUrl(name: string, branch: string) {
  const seed = `${name}-${branch}`;
  const hash = hashString(seed);
  const hue = 32 + (hash % 30);
  const sat = 45 + (hash % 15);
  const light = 45 + (hash % 10);
  const secHue = 32 + ((hash + 15) % 30);
  const secSat = 35 + (hash % 15);
  const secLight = 32 + (hash % 8);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="hsl(${hue} ${sat}% ${light}%)" />
          <stop offset="100%" stop-color="hsl(${secHue} ${secSat}% ${secLight}%)" />
        </linearGradient>
      </defs>
      <rect width="900" height="900" rx="180" fill="url(#g)" />
      <circle cx="450" cy="330" r="150" fill="rgba(255,255,255,0.18)" />
      <text x="450" y="540" fill="white" text-anchor="middle" font-family="Arial, sans-serif" font-size="180" font-weight="700">${initialsFromName(name)}</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function formatTitle(depth: number, memberCount: number) {
  if (depth === 0) {
    return "Family founders";
  }
  if (memberCount > 1) {
    return depth === 1 ? "Branch couple" : "Family couple";
  }
  return depth === 1 ? "Branch member" : "Family member";
}

function formatAbout(names: string[], branch: string, depth: number) {
  const joinedNames = names.join(" and ");
  if (depth === 0) {
    return `${joinedNames} are the root of the family tree.`;
  }
  return `${joinedNames} belong to the ${branch} branch of the tree.`;
}

type BuildResult = {
  node: TreeNode;
  memberSlugs: string[];
};

const generatedPeople: Person[] = [];
const personBySlug = new Map<string, Person>();
const slugCounts = new Map<string, number>();

function uniqueSlug(name: string) {
  const base = slugify(name);
  const count = (slugCounts.get(base) ?? 0) + 1;
  slugCounts.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

function buildTree(rawNode: RawTreeNode, depth: number, branch: string, parentMemberSlugs: string[], nodeId: string): BuildResult {
  const memberRecords: TreeMember[] = rawNode.members.map((name) => {
    const slug = uniqueSlug(name);
    const record: Person = {
      slug,
      name,
      title: formatTitle(depth, rawNode.members.length),
      about: formatAbout(rawNode.members, branch, depth),
      branch,
      photo: avatarDataUrl(name, branch),
      parents: [...parentMemberSlugs],
      children: [],
      socials: [],
      nodeId
    };
    generatedPeople.push(record);
    personBySlug.set(slug, record);
    return { name, slug };
  });

  const childResults = (rawNode.children ?? []).map((childNode, index) => {
    const childBranch = depth === 0 ? childNode.members[0] : branch;
    return buildTree(childNode, depth + 1, childBranch, memberRecords.map((member) => member.slug), `${nodeId}.${index + 1}`);
  });

  const childMemberSlugs = childResults.flatMap((child) => child.memberSlugs);
  for (const member of memberRecords) {
    const person = personBySlug.get(member.slug);
    if (person) {
      person.children = [...childMemberSlugs];
    }
  }

  return {
    node: {
      id: nodeId,
      note: rawNode.note,
      members: memberRecords,
      children: childResults.map((child) => child.node)
    },
    memberSlugs: memberRecords.map((member) => member.slug)
  };
}

const rootResult = buildTree(rawFamilyTree, 0, "Family root", [], "root");

export const familyTree = rootResult.node;
export const familyMembers = generatedPeople;

export function getPerson(slug: string) {
  return familyMembers.find((person) => person.slug === slug);
}

export function getChildrenOf(slug: string) {
  return familyMembers.filter((person) => person.parents.includes(slug));
}

export function getPeopleInBranch(branch: string) {
  return familyMembers.filter((person) => person.branch === branch);
}

export function findNodeBySlug(node: TreeNode, slug: string): TreeNode | null {
  if (node.members.some((member) => member.slug === slug)) {
    return node;
  }
  for (const child of node.children) {
    const found = findNodeBySlug(child, slug);
    if (found) return found;
  }
  return null;
}

export function countMembers(node: TreeNode): number {
  let count = node.members.length;
  for (const child of node.children) {
    count += countMembers(child);
  }
  return count;
}
