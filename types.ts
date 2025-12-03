// Data Models matching the Design Thinking Flow

export interface EmpathyMap {
  thinks: string;
  feels: string;
  says: string;
  does: string;
}

export interface ProblemStatement {
  user: string;
  need: string;
  insight: string;
}

export interface Idea {
  id: string;
  text: string;
  isFavorite: boolean;
}

export interface PrototypeData {
  description: string;
  features: string;
}

export interface TestMatrix {
  worked: string;
  notWorked: string;
  questions: string;
  ideas: string;
}

export interface ProjectData {
  id: string;
  studentName: string;
  projectName: string;
  createdAt: string;
  phase1: EmpathyMap;
  phase2: ProblemStatement;
  phase3: Idea[];
  phase4: PrototypeData;
  phase5: TestMatrix;
}

export type DesignPhase = 
  | 'dashboard'
  | 'phase1' 
  | 'phase2' 
  | 'phase3' 
  | 'phase4' 
  | 'phase5' 
  | 'report';