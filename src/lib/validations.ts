import { z } from 'zod'

// Employee validation schemas
export const employeeSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  hireDate: z.string().min(1, 'Hire date is required'),
  department: z.string().min(1, 'Department is required'),
  position: z.string().min(1, 'Position is required'),
  payType: z.enum(['salary', 'hourly']),
  payRate: z.number().min(0.01, 'Pay rate must be greater than 0'),
  manager: z.string().optional(),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2),
  zipCode: z.string().min(5, 'ZIP code must be at least 5 digits'),
  country: z.string().min(1, 'Country is required'),
  emergencyName: z.string().min(1, 'Emergency contact name is required'),
  emergencyRelationship: z.string().min(1, 'Emergency contact relationship is required'),
  emergencyPhone: z.string().min(10, 'Emergency contact phone is required'),
  ssn: z.string().min(9, 'SSN must be 9 digits').max(11),
  filingStatus: z.enum(['single', 'married_joint', 'married_separate', 'head_of_household']),
  allowances: z.number().min(0).max(20),
  additionalWithholding: z.number().min(0),
})

// Time entry validation schemas
export const timeEntrySchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  clockIn: z.date(),
  clockOut: z.date().optional(),
  breakTime: z.number().min(0).default(0),
  notes: z.string().optional(),
  location: z.string().optional(),
})

// Leave request validation schemas
export const leaveRequestSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  type: z.enum(['pto', 'sick', 'personal', 'bereavement', 'jury_duty', 'unpaid']),
  startDate: z.date(),
  endDate: z.date(),
  reason: z.string().min(1, 'Reason is required').max(500),
})

// Payroll run validation schemas
export const payrollRunSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  payrollPeriodId: z.string().min(1, 'Payroll period ID is required'),
  regularHours: z.number().min(0),
  overtimeHours: z.number().min(0),
  bonuses: z.number().min(0).default(0),
  commissions: z.number().min(0).default(0),
})

// Benefit enrollment validation schemas
export const benefitEnrollmentSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  benefitId: z.string().min(1, 'Benefit ID is required'),
  enrollmentDate: z.date(),
  endDate: z.date().optional(),
  employeeContribution: z.number().min(0),
  dependents: z.array(z.string()).default([]),
})

// Company settings validation schemas
export const companySettingsSchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  street: z.string().min(1, 'Street address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(2, 'State is required').max(2),
  zipCode: z.string().min(5, 'ZIP code is required'),
  country: z.string().min(1, 'Country is required'),
  taxId: z.string().min(1, 'Tax ID is required'),
  payrollFrequency: z.enum(['weekly', 'bi_weekly', 'semi_monthly', 'monthly']),
  overtimeThreshold: z.number().min(0).max(168),
  overtimeMultiplier: z.number().min(1).max(3),
  defaultPayDate: z.number().min(1).max(31),
  timezone: z.string().min(1, 'Timezone is required'),
  currency: z.string().min(3, 'Currency code is required').max(3),
})

// Time clock validation schemas
export const timeClockSchema = z.object({
  employeeId: z.string().min(1, 'Employee ID is required'),
  action: z.enum(['clock_in', 'clock_out', 'break_start', 'break_end']),
  timestamp: z.date(),
  location: z.string().optional(),
  notes: z.string().optional(),
})

// Report generation validation schemas
export const reportSchema = z.object({
  type: z.enum(['payroll_summary', 'tax_liability', 'employee_costs', 'year_end', 'custom']),
  name: z.string().min(1, 'Report name is required'),
  startDate: z.date(),
  endDate: z.date(),
  parameters: z.record(z.any()).default({}),
})

// Search and filter schemas
export const employeeSearchSchema = z.object({
  query: z.string().optional(),
  department: z.string().optional(),
  status: z.enum(['active', 'inactive', 'terminated', 'on_leave']).optional(),
  payType: z.enum(['salary', 'hourly']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.enum(['firstName', 'lastName', 'hireDate', 'department', 'payRate']).default('lastName'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

export const timeEntrySearchSchema = z.object({
  employeeId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(['active', 'completed', 'approved', 'rejected']).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
})

export const payrollPeriodSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  payDate: z.date(),
})

// Form validation helpers
export type EmployeeFormData = z.infer<typeof employeeSchema>
export type TimeEntryFormData = z.infer<typeof timeEntrySchema>
export type LeaveRequestFormData = z.infer<typeof leaveRequestSchema>
export type PayrollRunFormData = z.infer<typeof payrollRunSchema>
export type BenefitEnrollmentFormData = z.infer<typeof benefitEnrollmentSchema>
export type CompanySettingsFormData = z.infer<typeof companySettingsSchema>
export type TimeClockFormData = z.infer<typeof timeClockSchema>
export type ReportFormData = z.infer<typeof reportSchema>
export type EmployeeSearchParams = z.infer<typeof employeeSearchSchema>
export type TimeEntrySearchParams = z.infer<typeof timeEntrySearchSchema>
export type PayrollPeriodFormData = z.infer<typeof payrollPeriodSchema>