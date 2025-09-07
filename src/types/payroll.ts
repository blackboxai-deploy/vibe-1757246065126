export interface Employee {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: Date
  hireDate: Date
  terminationDate?: Date
  status: 'active' | 'inactive' | 'terminated' | 'on_leave'
  department: string
  position: string
  payType: 'salary' | 'hourly'
  payRate: number
  manager?: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  emergencyContact: {
    name: string
    relationship: string
    phone: string
  }
  taxInformation: {
    ssn: string
    filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_of_household'
    allowances: number
    additionalWithholding: number
  }
  createdAt: Date
  updatedAt: Date
}

export interface PayrollPeriod {
  id: string
  startDate: Date
  endDate: Date
  payDate: Date
  status: 'open' | 'processing' | 'closed' | 'paid'
  payrollRuns: PayrollRun[]
  createdAt: Date
  updatedAt: Date
}

export interface PayrollRun {
  id: string
  employeeId: string
  payrollPeriodId: string
  grossPay: number
  netPay: number
  regularHours: number
  overtimeHours: number
  regularRate: number
  overtimeRate: number
  bonuses: number
  commissions: number
  deductions: PayrollDeduction[]
  taxes: PayrollTax[]
  status: 'draft' | 'approved' | 'paid'
  createdAt: Date
  updatedAt: Date
}

export interface PayrollDeduction {
  id: string
  payrollRunId: string
  type: 'health_insurance' | '401k' | 'dental' | 'vision' | 'life_insurance' | 'garnishment' | 'other'
  description: string
  amount: number
  isPreTax: boolean
  createdAt: Date
  updatedAt: Date
}

export interface PayrollTax {
  id: string
  payrollRunId: string
  type: 'federal_income' | 'state_income' | 'social_security' | 'medicare' | 'unemployment' | 'disability'
  description: string
  rate: number
  amount: number
  taxableWages: number
  createdAt: Date
  updatedAt: Date
}

export interface TimeEntry {
  id: string
  employeeId: string
  clockIn: Date
  clockOut?: Date
  breakTime: number // minutes
  totalHours: number
  status: 'active' | 'completed' | 'approved' | 'rejected'
  notes?: string
  location?: string
  approvedBy?: string
  approvedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface LeaveRequest {
  id: string
  employeeId: string
  type: 'pto' | 'sick' | 'personal' | 'bereavement' | 'jury_duty' | 'unpaid'
  startDate: Date
  endDate: Date
  totalDays: number
  reason: string
  status: 'pending' | 'approved' | 'denied'
  requestedAt: Date
  reviewedBy?: string
  reviewedAt?: Date
  notes?: string
}

export interface Benefit {
  id: string
  name: string
  type: 'health' | 'dental' | 'vision' | 'life' | '401k' | 'disability' | 'other'
  description: string
  employerContribution: number
  employeeContribution: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface BenefitEnrollment {
  id: string
  employeeId: string
  benefitId: string
  enrollmentDate: Date
  endDate?: Date
  employeeContribution: number
  dependents: string[]
  status: 'active' | 'inactive' | 'pending'
  createdAt: Date
  updatedAt: Date
}

export interface PayrollReport {
  id: string
  type: 'payroll_summary' | 'tax_liability' | 'employee_costs' | 'year_end' | 'custom'
  name: string
  parameters: Record<string, any>
  data: Record<string, any>
  generatedAt: Date
  generatedBy: string
}

export interface TaxBracket {
  id: string
  jurisdiction: 'federal' | 'state' | 'local'
  state?: string
  filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_of_household'
  minIncome: number
  maxIncome: number
  rate: number
  flatAmount: number
  year: number
  isActive: boolean
}

export interface CompanySettings {
  id: string
  name: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  taxId: string
  payrollFrequency: 'weekly' | 'bi_weekly' | 'semi_monthly' | 'monthly'
  overtimeThreshold: number
  overtimeMultiplier: number
  defaultPayDate: number // day offset from period end
  timezone: string
  currency: string
  logo?: string
  createdAt: Date
  updatedAt: Date
}

export interface DashboardMetrics {
  totalEmployees: number
  activeEmployees: number
  totalPayroll: number
  averageSalary: number
  upcomingPayroll: {
    date: Date
    amount: number
    employeeCount: number
  }
  pendingTimeEntries: number
  pendingLeaveRequests: number
  complianceAlerts: number
}

// Form types for components
export interface EmployeeFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  hireDate: string
  department: string
  position: string
  payType: 'salary' | 'hourly'
  payRate: number
  manager?: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  emergencyName: string
  emergencyRelationship: string
  emergencyPhone: string
  ssn: string
  filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_of_household'
  allowances: number
  additionalWithholding: number
}

export interface TimeClockData {
  employeeId: string
  action: 'clock_in' | 'clock_out' | 'break_start' | 'break_end'
  timestamp: Date
  location?: string
  notes?: string
}