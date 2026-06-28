export type DatabasePerson = {
  id: string;
  slug: string;
  full_name: string;
  branch: string;
  title: string;
  about: string;
  photo_url: string;
};

export type DatabaseSocialLink = {
  id: string;
  person_id: string;
  label: string;
  url: string;
};

export type DatabaseRelationship = {
  id: string;
  parent_id: string;
  child_id: string;
  relationship_type: "parent" | "spouse";
};
