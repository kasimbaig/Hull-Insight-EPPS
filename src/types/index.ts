// Hull Insight Core Types

export interface BaseModel {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface User extends BaseModel {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  is_active: boolean;
}

export type UserRole = 'initiator' | 'reviewer' | 'approver' | 'admin';

export type WorkflowStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'revision_requested';

// Master Data Models
export interface Unit extends BaseModel {
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface VesselType extends BaseModel {
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface ClassOfVessel extends BaseModel {
  code: string;
  name: string;
  description?: string;
  is_active: boolean;
}

export interface Command extends BaseModel {
  code: string;
  name: string;
  location: string;
  commander_name?: string;
  contact_email?: string;
  is_active: boolean;
}

export interface Dockyard extends BaseModel {
  code: string;
  name: string;
  location: string;
  capacity: number;
  contact_person?: string;
  contact_email?: string;
  is_active: boolean;
}

export interface Vessel extends BaseModel {
  hull_number: string;
  name: string;
  vessel_type: VesselType;
  class_of_vessel: ClassOfVessel;
  command: Command;
  commissioned_date: string;
  length: number;
  beam: number;
  displacement: number;
  is_active: boolean;
}

export interface HullCompartment extends BaseModel {
  code: string;
  name: string;
  description?: string;
  location: string;
  vessel_type: VesselType;
  is_critical: boolean;
  is_active: boolean;
}

export interface HullSystem extends BaseModel {
  code: string;
  name: string;
  description?: string;
  compartment: HullCompartment;
  system_type: string;
  is_critical: boolean;
  is_active: boolean;
}

export interface HullEquipment extends BaseModel {
  code: string;
  name: string;
  description?: string;
  system: HullSystem;
  manufacturer?: string;
  model?: string;
  serial_number?: string;
  installation_date?: string;
  is_active: boolean;
}

export interface DamageType extends BaseModel {
  code: string;
  name: string;
  description?: string;
  severity_levels: string[];
  is_active: boolean;
}

export interface Severity extends BaseModel {
  code: string;
  name: string;
  description?: string;
  color_code: string;
  priority_level: number;
  is_active: boolean;
}

// Transaction Models
export interface DockyardPlan extends BaseModel {
  plan_number: string;
  vessel: Vessel;
  dockyard: Dockyard;
  planned_start_date: string;
  planned_end_date: string;
  actual_start_date?: string;
  actual_end_date?: string;
  purpose: string;
  description?: string;
  status: WorkflowStatus;
  created_by: User;
  submitted_by?: User;
  reviewed_by?: User;
  approved_by?: User;
  comments?: string;
  attachments?: string[];
}

export interface QuarterlySurvey extends BaseModel {
  survey_number: string;
  vessel: Vessel;
  command: Command;
  survey_date: string;
  survey_quarter: string;
  survey_year: number;
  status: WorkflowStatus;
  created_by: User;
  submitted_by?: User;
  reviewed_by?: User;
  approved_by?: User;
  overall_condition: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  comments?: string;
}

export interface SurveyObservation extends BaseModel {
  survey: QuarterlySurvey;
  compartment: HullCompartment;
  system?: HullSystem;
  equipment?: HullEquipment;
  damage_type: DamageType;
  severity: Severity;
  description: string;
  location_details: string;
  corrective_action_required: boolean;
  corrective_action_description?: string;
  target_completion_date?: string;
  actual_completion_date?: string;
  photos?: string[];
  status: 'open' | 'in_progress' | 'completed' | 'deferred';
}

// Form Field Configuration
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'date' | 'select' | 'multiselect' | 'textarea' | 'checkbox' | 'file';
  required?: boolean;
  placeholder?: string;
  options?: { label: string; value: any }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
    message?: string;
  };
  dependsOn?: string;
  section?: string;
}

export interface FormConfig {
  title: string;
  description?: string;
  sections?: string[];
  fields: FormField[];
  submitButtonText?: string;
  cancelButtonText?: string;
}

// Dashboard & Reports
export interface KPICard {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  color?: 'primary' | 'success' | 'warning' | 'destructive';
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

// Drawing Canvas
export interface DrawingShape {
  id: string;
  type: 'rectangle' | 'circle' | 'polygon' | 'text';
  coordinates: { x: number; y: number }[];
  metadata?: {
    vessel_id?: string;
    compartment_id?: string;
    survey_id?: string;
    status?: string;
    description?: string;
  };
  style: {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  };
}

export interface Drawing extends BaseModel {
  name: string;
  description?: string;
  vessel?: Vessel;
  canvas_data: string; // JSON string of canvas state
  shapes: DrawingShape[];
  created_by: User;
  is_template: boolean;
}

interface HvacTrial {
  id: number;
  ship: string;
  date_of_trials: string;
  place_of_trials: string;
  document_no: string;
  occasion_of_trials: string;
  authority_for_trials: string;
}

interface AirFlow {
  id: number;
  compartment: string;
  served_by: string;
  no_of_ducts: number;
  duct_area?: number;
  air_flow?: number;
  flow_rate_at_duct?: number;
  design_air_flow_rate?: number;
  measured_air_flow_rate?: number;
  observations?: string;
  remarks?: string;
  isEditing?: boolean;
  hvac_trial?: number;
}

interface MachineryAirFlow extends AirFlow {}
