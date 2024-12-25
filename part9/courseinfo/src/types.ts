interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDesc extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDesc {
  kind: "basic";
}

interface CoursePartBackground extends CoursePartBaseDesc {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartSpecial extends CoursePartBaseDesc {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
