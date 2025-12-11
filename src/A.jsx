import React, { useState } from 'react';
import { 
  User, Phone, Briefcase, Wallet, Calendar, FileText, MapPin, 
  LayoutDashboard, Laptop, FolderOpen, ChevronLeft, ChevronRight, 
  Save, Send, Check, Shield, Upload, Zap, Heart, GraduationCap
} from 'lucide-react';

// Brand Colors
const colors = {
  primary: '#3D3A5C',
  secondary: '#8B85A8',
  gradientMid: '#5E5980',
  beige: '#E5C9A0',
  coral: '#E8A99A',
};


const quickFormSteps = [
  {
    id: 'identity', title: 'Identity & Basic Info', subtitle: 'Personal identification as per CNIC', icon: User,
    fields: [
      { name: 'Employee Code', type: 'text', required: true, placeholder: 'Auto-generated', disabled: true },
      { name: 'First Name', type: 'text', required: true, placeholder: 'As per CNIC', compliance: 'NADRA' },
      { name: 'Last Name', type: 'text', required: true, placeholder: 'As per CNIC', compliance: 'NADRA' },
      { name: "Father's/Husband's Name", type: 'text', required: true, compliance: 'EOBI' },
      { name: 'Date of Birth', type: 'date', required: true, compliance: 'EOBI' },
      { name: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'], compliance: 'SS' },
      { name: 'CNIC Number', type: 'text', required: true, placeholder: 'XXXXX-XXXXXXX-X', compliance: 'NADRA' },
      { name: 'CNIC Issue Date', type: 'date', required: true },
      { name: 'CNIC Expiry Date', type: 'date', required: true },
    ]
  },
  {
    id: 'contact', title: 'Contact Information', subtitle: 'Communication and emergency details', icon: Phone,
    fields: [
      { name: 'Mobile Number', type: 'tel', required: true, placeholder: '03XX-XXXXXXX' },
      { name: 'Personal Email', type: 'email', required: false, placeholder: 'name@email.com' },
      { name: 'Current Address', type: 'textarea', required: true, placeholder: 'House #, Street, Area, City', compliance: 'EOBI' },
      { name: 'Permanent Address', type: 'textarea', required: true, compliance: 'EOBI' },
      { name: 'Emergency Contact Name', type: 'text', required: true, compliance: 'Safety' },
      { name: 'Emergency Contact Phone', type: 'tel', required: true },
      { name: 'Emergency Relation', type: 'select', required: true, options: ['Father', 'Mother', 'Spouse', 'Sibling', 'Friend'] },
    ]
  },
  {
    id: 'employment', title: 'Employment Details', subtitle: 'Job position and organization', icon: Briefcase,
    fields: [
      { name: 'Date of Joining', type: 'date', required: true },
      { name: 'Company', type: 'select', required: true, options: ['Flexi IT Services', 'HR Perfect Solutions'], compliance: 'EOBI' },
      { name: 'Branch/Location', type: 'select', required: true, options: ['Head Office - Lahore', 'Karachi', 'Islamabad'] },
      { name: 'Department', type: 'select', required: true, options: ['Engineering', 'Product', 'Sales', 'HR', 'Finance', 'Operations'] },
      { name: 'Designation', type: 'select', required: true, options: ['Director', 'Manager', 'Team Lead', 'Senior Executive', 'Executive'], compliance: 'Standing Orders' },
      { name: 'Employment Class', type: 'select', required: true, options: ['White Collar', 'Blue Collar', 'Labor', 'Contractual', 'Intern'] },
      { name: 'Employment Type', type: 'select', required: true, options: ['Permanent', 'Probation', 'Contract', 'Daily Wage'] },
      { name: 'Reporting Manager', type: 'select', required: true, options: ['Select manager...'] },
      { name: 'Probation (months)', type: 'number', required: true, placeholder: '3' },
      { name: 'Notice Period (days)', type: 'number', required: true, placeholder: '30' },
    ]
  },
  {
    id: 'salary', title: 'Salary & Statutory', subtitle: 'Compensation and compliance', icon: Wallet,
    fields: [
      { name: 'Basic Salary (PKR)', type: 'number', required: true, placeholder: 'Min. Rs. 37,000', compliance: 'Min Wage' },
      { name: 'Salary Mode', type: 'select', required: true, options: ['Bank Transfer', 'Mobile Wallet', 'Cash', 'Cheque'] },
      { name: 'Bank Name', type: 'select', required: false, options: ['HBL', 'MCB', 'UBL', 'Allied Bank', 'Meezan', 'Bank Alfalah'] },
      { name: 'Bank Account / IBAN', type: 'text', required: false, placeholder: 'PK00XXXX0000000000000000' },
      { name: 'Account Title', type: 'text', required: false },
      { name: 'NTN', type: 'text', required: true, placeholder: '0000000-0', compliance: 'FBR' },
      { name: 'Filer Status', type: 'select', required: true, options: ['Filer', 'Non-Filer', 'Late Filer'], compliance: 'FBR' },
      { name: 'EOBI UAN', type: 'text', required: true, compliance: 'EOBI' },
      { name: 'EOBI Registration Date', type: 'date', required: true, compliance: 'EOBI' },
      { name: 'PESSI/SESSI Number', type: 'text', required: true, compliance: 'SS' },
      { name: 'SS Province', type: 'select', required: true, options: ['Punjab (PESSI)', 'Sindh (SESSI)', 'KPK', 'Balochistan'] },
      { name: 'SS Registration Date', type: 'date', required: true },
    ]
  },
  {
    id: 'attendance', title: 'Attendance & Leaves', subtitle: 'Work schedule and entitlements', icon: Calendar,
    fields: [
      { name: 'Default Shift', type: 'select', required: true, options: ['General (9-6)', 'Morning', 'Evening', 'Night', 'Flexible'] },
      { name: 'Weekly Off Pattern', type: 'select', required: true, options: ['Sunday Only', 'Sat-Sun', 'Friday Only', 'Rotating'] },
      { name: 'Leave Policy', type: 'select', required: true, options: ['Standard (14 AL + 10 CL)', 'Senior (21 AL)', 'Executive (30 AL)'] },
      { name: 'Holiday List', type: 'select', required: true, options: ['Pakistan Federal 2025', 'Punjab Provincial', 'Sindh Provincial'] },
      { name: 'Overtime Eligible', type: 'checkbox', required: false, label: 'Employee is eligible for overtime pay' },
    ]
  },
  {
    id: 'documents', title: 'Documents & Consent', subtitle: 'Required uploads and agreements', icon: FileText,
    fields: [
      { name: 'CNIC Front Image', type: 'file', required: true, compliance: 'NADRA' },
      { name: 'CNIC Back Image', type: 'file', required: true, compliance: 'NADRA' },
      { name: 'Passport Size Photo', type: 'file', required: true },
      { name: 'E-Consent: Data Accuracy', type: 'checkbox', required: true, label: 'I confirm all information is accurate and true' },
      { name: 'E-Consent: Background Check', type: 'checkbox', required: true, label: 'I authorize background verification checks' },
      { name: 'Code of Conduct', type: 'checkbox', required: true, label: 'I agree to abide by the Company Code of Conduct' },
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// DETAILED FORM WIZARD - 8 Steps, 150+ Fields - ALL POPULATED
// ═══════════════════════════════════════════════════════════════════════════
const detailedFormSteps = [
  {
    id: 'overview', title: 'Overview', subtitle: 'Core identity and employment', icon: LayoutDashboard,
    fields: [
      { name: 'Employee Code', type: 'text', required: true, placeholder: 'Auto-generated', disabled: true },
      { name: 'First Name', type: 'text', required: true, placeholder: 'As per CNIC', compliance: 'NADRA' },
      { name: 'Middle Name', type: 'text', required: false },
      { name: 'Last Name', type: 'text', required: true, compliance: 'NADRA' },
      { name: "Father's/Husband's Name", type: 'text', required: true, compliance: 'EOBI' },
      { name: 'Date of Birth', type: 'date', required: true, compliance: 'EOBI' },
      { name: 'Gender', type: 'select', required: true, options: ['Male', 'Female', 'Other'] },
      { name: 'CNIC Number', type: 'text', required: true, placeholder: 'XXXXX-XXXXXXX-X', compliance: 'NADRA' },
      { name: 'CNIC Issue Date', type: 'date', required: true },
      { name: 'CNIC Expiry Date', type: 'date', required: true },
      { name: 'Date of Joining', type: 'date', required: true },
      { name: 'Company', type: 'select', required: true, options: ['Flexi IT Services', 'HR Perfect Solutions'] },
      { name: 'Department', type: 'select', required: true, options: ['Engineering', 'Product', 'Sales', 'HR', 'Finance'] },
      { name: 'Designation', type: 'select', required: true, options: ['Director', 'Manager', 'Team Lead', 'Executive'] },
      { name: 'Employment Class', type: 'select', required: true, options: ['White Collar', 'Blue Collar', 'Labor', 'Intern'] },
    ]
  },
  {
    id: 'address', title: 'Address & Contacts', subtitle: 'Complete address and communication', icon: MapPin,
    fields: [
      { name: 'Mobile (Primary)', type: 'tel', required: true, placeholder: '03XX-XXXXXXX' },
      { name: 'Mobile (Secondary)', type: 'tel', required: false },
      { name: 'Landline', type: 'tel', required: false },
      { name: 'Personal Email', type: 'email', required: false },
      { name: 'Company Email', type: 'email', required: false, disabled: true },
      { name: 'Current Address Line 1', type: 'text', required: true, compliance: 'EOBI' },
      { name: 'Current Address Line 2', type: 'text', required: false },
      { name: 'Current City', type: 'select', required: true, options: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Other'] },
      { name: 'Current Province', type: 'select', required: true, options: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad'] },
      { name: 'Current Postal Code', type: 'text', required: false },
      { name: 'Residing Since', type: 'date', required: false },
      { name: 'Residence Type', type: 'select', required: false, options: ['Owned', 'Rented', 'Company', 'Family'] },
      { name: 'Permanent Address Line 1', type: 'text', required: true },
      { name: 'Permanent Address Line 2', type: 'text', required: false },
      { name: 'Permanent City', type: 'select', required: true, options: ['Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Other'] },
      { name: 'Permanent Province', type: 'select', required: true, options: ['Punjab', 'Sindh', 'KPK', 'Balochistan'] },
      { name: 'Emergency #1 Name', type: 'text', required: true, compliance: 'Safety' },
      { name: 'Emergency #1 Phone', type: 'tel', required: true },
      { name: 'Emergency #1 Relation', type: 'select', required: true, options: ['Father', 'Mother', 'Spouse', 'Sibling', 'Friend'] },
      { name: 'Emergency #1 Address', type: 'textarea', required: false },
      { name: 'Emergency #2 Name', type: 'text', required: false },
      { name: 'Emergency #2 Phone', type: 'tel', required: false },
      { name: 'Emergency #2 Relation', type: 'select', required: false, options: ['Father', 'Mother', 'Spouse', 'Sibling'] },
    ]
  },
  {
    id: 'attendance', title: 'Attendance & Leaves', subtitle: 'Work schedule and leave config', icon: Calendar,
    fields: [
      { name: 'Branch/Location', type: 'select', required: true, options: ['Head Office', 'Karachi', 'Islamabad', 'Remote'] },
      { name: 'Default Shift', type: 'select', required: true, options: ['General (9-6)', 'Morning', 'Evening', 'Night', 'Flexible'] },
      { name: 'Shift Start Time', type: 'text', required: false, placeholder: '09:00 AM' },
      { name: 'Shift End Time', type: 'text', required: false, placeholder: '06:00 PM' },
      { name: 'Break Duration (mins)', type: 'number', required: false, placeholder: '60' },
      { name: 'Weekly Off Pattern', type: 'select', required: true, options: ['Sunday Only', 'Sat-Sun', 'Friday Only', 'Rotating'] },
      { name: 'Roster Pattern', type: 'select', required: false, options: ['Fixed', 'Weekly Rotating', 'Monthly Rotating'] },
      { name: 'Leave Policy', type: 'select', required: true, options: ['Standard', 'Senior', 'Executive', 'Contractual'] },
      { name: 'Holiday List', type: 'select', required: true, options: ['Pakistan Federal 2025', 'Punjab', 'Sindh'] },
      { name: 'Leave Approver', type: 'select', required: true, options: ['Direct Manager', 'Dept Head', 'HR Manager'] },
      { name: 'Attendance Approver', type: 'select', required: false, options: ['Direct Manager', 'HR Manager'] },
      { name: 'Biometric Device ID', type: 'text', required: false },
      { name: 'Biometric Enrollment Date', type: 'date', required: false },
      { name: 'Face Recognition', type: 'checkbox', required: false, label: 'Enrolled in facial recognition' },
      { name: 'Overtime Eligible', type: 'checkbox', required: false, label: 'Eligible for overtime pay' },
      { name: 'Flexible Timing', type: 'checkbox', required: false, label: 'Flexible arrival/departure' },
      { name: 'Remote Work Allowed', type: 'checkbox', required: false, label: 'Permitted to work remotely' },
    ]
  },
  {
    id: 'salary', title: 'Salary & Statutory', subtitle: 'Compensation and compliance', icon: Wallet,
    fields: [
      { name: 'Basic Salary (PKR)', type: 'number', required: true, placeholder: 'Min. Rs. 37,000', compliance: 'Min Wage' },
      { name: 'Gross Salary (PKR)', type: 'number', required: false },
      { name: 'Currency', type: 'select', required: true, options: ['PKR', 'USD', 'AED', 'GBP'] },
      { name: 'Pay Frequency', type: 'select', required: true, options: ['Monthly', 'Bi-Weekly', 'Weekly'] },
      { name: 'Pay Cut-off Day', type: 'number', required: false, placeholder: '1-28' },
      { name: 'Salary Mode', type: 'select', required: true, options: ['Bank', 'Mobile Wallet', 'Cash', 'Cheque'] },
      { name: 'Bank Name', type: 'select', required: false, options: ['HBL', 'MCB', 'UBL', 'Allied', 'Meezan', 'Alfalah'] },
      { name: 'Branch Name', type: 'text', required: false },
      { name: 'Account Number', type: 'text', required: false },
      { name: 'IBAN', type: 'text', required: false, placeholder: 'PK00XXXX...' },
      { name: 'Account Title', type: 'text', required: false },
      { name: 'Wallet Provider', type: 'select', required: false, options: ['JazzCash', 'Easypaisa', 'NayaPay', 'SadaPay'] },
      { name: 'Wallet Number', type: 'text', required: false },
      { name: 'NTN', type: 'text', required: true, placeholder: '0000000-0', compliance: 'FBR' },
      { name: 'Filer Status', type: 'select', required: true, options: ['Filer', 'Non-Filer'], compliance: 'FBR' },
      { name: 'Tax Exemption', type: 'checkbox', required: false, label: 'Has tax exemption certificate' },
      { name: 'EOBI UAN', type: 'text', required: true, compliance: 'EOBI' },
      { name: 'EOBI Reg Date', type: 'date', required: true, compliance: 'EOBI' },
      { name: 'Previous EOBI Employer', type: 'text', required: false },
      { name: 'PESSI/SESSI Number', type: 'text', required: true, compliance: 'SS' },
      { name: 'SS Province', type: 'select', required: true, options: ['Punjab (PESSI)', 'Sindh (SESSI)', 'KPK', 'Balochistan'] },
      { name: 'SS Reg Date', type: 'date', required: true },
      { name: 'Gratuity Applicable', type: 'checkbox', required: false, label: 'Eligible for gratuity' },
      { name: 'PF Applicable', type: 'checkbox', required: false, label: 'Enrolled in Provident Fund' },
    ]
  },
  {
    id: 'personal', title: 'Personal Details', subtitle: 'Personal info, health, family', icon: Heart,
    fields: [
      { name: 'Marital Status', type: 'select', required: false, options: ['Single', 'Married', 'Divorced', 'Widowed'] },
      { name: 'Spouse Name', type: 'text', required: false },
      { name: 'Marriage Date', type: 'date', required: false },
      { name: 'Number of Children', type: 'number', required: false },
      { name: 'Number of Dependents', type: 'number', required: false },
      { name: 'Blood Group', type: 'select', required: false, options: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
      { name: 'Religion', type: 'select', required: false, options: ['Islam', 'Christianity', 'Hinduism', 'Other'] },
      { name: 'Nationality', type: 'select', required: false, options: ['Pakistani', 'Other'] },
      { name: 'Domicile Province', type: 'select', required: false, options: ['Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad'] },
      { name: 'Domicile District', type: 'text', required: false },
      { name: 'Medical Fitness Date', type: 'date', required: false, compliance: 'Safety' },
      { name: 'Medical Validity', type: 'date', required: false },
      { name: 'Medical Conditions', type: 'textarea', required: false, placeholder: 'Allergies, conditions...' },
      { name: 'Disability Status', type: 'checkbox', required: false, label: 'Person with Disability' },
      { name: 'Disability Type', type: 'text', required: false },
      { name: 'Insurance Provider', type: 'select', required: false, options: ['None', 'Jubilee', 'Adamjee', 'EFU', 'State Life'] },
      { name: 'Insurance Policy #', type: 'text', required: false },
      { name: 'Coverage (PKR)', type: 'number', required: false },
      { name: 'Passport Number', type: 'text', required: false },
      { name: 'Passport Issue Date', type: 'date', required: false },
      { name: 'Passport Expiry', type: 'date', required: false },
      { name: 'Passport Issue Place', type: 'text', required: false },
      { name: 'Driving License', type: 'text', required: false },
      { name: 'License Expiry', type: 'date', required: false },
      { name: 'Shirt Size', type: 'select', required: false, options: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
      { name: 'Trouser Size', type: 'text', required: false },
      { name: 'Shoe Size', type: 'text', required: false },
    ]
  },
  {
    id: 'profile', title: 'Profile & Experience', subtitle: 'Education and work history', icon: GraduationCap,
    fields: [
      { name: 'Professional Summary', type: 'textarea', required: false, placeholder: 'Brief background...' },
      { name: 'LinkedIn Profile', type: 'text', required: false },
      { name: 'Highest Education', type: 'select', required: false, options: ['Matric', 'Inter', 'Bachelors', 'Masters', 'PhD', 'Other'] },
      { name: 'Degree Title', type: 'text', required: false, placeholder: 'e.g., BS Computer Science' },
      { name: 'Institution Name', type: 'text', required: false },
      { name: 'Year of Passing', type: 'number', required: false },
      { name: 'Grade/CGPA', type: 'text', required: false },
      { name: 'Education Field', type: 'select', required: false, options: ['CS', 'Engineering', 'Business', 'Commerce', 'Arts', 'Medical'] },
      { name: 'Second Degree', type: 'text', required: false },
      { name: 'Second Institution', type: 'text', required: false },
      { name: 'Second Year', type: 'number', required: false },
      { name: 'Certifications', type: 'textarea', required: false },
      { name: 'Total Experience (Years)', type: 'number', required: false },
      { name: 'Previous Company 1', type: 'text', required: false },
      { name: 'Previous Designation 1', type: 'text', required: false },
      { name: 'Previous Duration 1', type: 'text', required: false, placeholder: 'Jan 2020 - Dec 2023' },
      { name: 'Previous Salary 1', type: 'number', required: false },
      { name: 'Reason for Leaving 1', type: 'select', required: false, options: ['Career Growth', 'Better Opportunity', 'Relocation', 'Personal'] },
      { name: 'Previous Company 2', type: 'text', required: false },
      { name: 'Previous Designation 2', type: 'text', required: false },
      { name: 'Previous Duration 2', type: 'text', required: false },
      { name: 'Reference 1 Name', type: 'text', required: false },
      { name: 'Reference 1 Contact', type: 'text', required: false },
      { name: 'Reference 1 Relation', type: 'text', required: false, placeholder: 'e.g., Former Manager' },
      { name: 'Reference 2 Name', type: 'text', required: false },
      { name: 'Reference 2 Contact', type: 'text', required: false },
      { name: 'Skills & Expertise', type: 'textarea', required: false },
      { name: 'Languages Known', type: 'text', required: false, placeholder: 'English, Urdu, Punjabi...' },
    ]
  },
  {
    id: 'assets', title: 'Assets & IT Access', subtitle: 'Equipment and credentials', icon: Laptop,
    fields: [
      { name: 'Company ID Card #', type: 'text', required: false },
      { name: 'ID Issue Date', type: 'date', required: false },
      { name: 'ID Expiry Date', type: 'date', required: false },
      { name: 'Access Card / RFID', type: 'text', required: false },
      { name: 'Building Access Level', type: 'select', required: false, options: ['General', 'Restricted', 'Server Room', 'Executive', 'All'] },
      { name: 'Parking Assigned', type: 'checkbox', required: false, label: 'Has assigned parking' },
      { name: 'Parking Slot #', type: 'text', required: false },
      { name: 'Email Account', type: 'email', required: false, disabled: true },
      { name: 'AD Username', type: 'text', required: false },
      { name: 'VPN Access', type: 'checkbox', required: false, label: 'VPN enabled' },
      { name: 'ERP Access', type: 'checkbox', required: false, label: 'ERP system access' },
      { name: 'HRMS Self-Service', type: 'checkbox', required: false, label: 'HRMS portal access' },
      { name: 'Company SIM #', type: 'text', required: false },
      { name: 'SIM Provider', type: 'select', required: false, options: ['Jazz', 'Telenor', 'Zong', 'Ufone'] },
      { name: 'Monthly Limit (PKR)', type: 'number', required: false },
      { name: 'Asset 1 Category', type: 'select', required: false, options: ['Laptop', 'Desktop', 'Monitor', 'Mobile', 'Tablet', 'Vehicle', 'Other'] },
      { name: 'Asset 1 Brand/Model', type: 'text', required: false, placeholder: 'Dell Latitude 5540' },
      { name: 'Asset 1 Serial #', type: 'text', required: false },
      { name: 'Asset 1 Tag #', type: 'text', required: false },
      { name: 'Asset 1 Condition', type: 'select', required: false, options: ['New', 'Excellent', 'Good', 'Fair'] },
      { name: 'Asset 1 Issue Date', type: 'date', required: false },
      { name: 'Asset 2 Category', type: 'select', required: false, options: ['Laptop', 'Desktop', 'Monitor', 'Mobile', 'Other'] },
      { name: 'Asset 2 Brand/Model', type: 'text', required: false },
      { name: 'Asset 2 Serial #', type: 'text', required: false },
      { name: 'Vehicle Assigned', type: 'checkbox', required: false, label: 'Company vehicle assigned' },
      { name: 'Vehicle Registration', type: 'text', required: false },
      { name: 'Vehicle Model', type: 'text', required: false },
    ]
  },
  {
    id: 'documents', title: 'Documents & Consent', subtitle: 'Uploads and acknowledgments', icon: FolderOpen,
    fields: [
      { name: 'CNIC Front Image', type: 'file', required: true, compliance: 'NADRA' },
      { name: 'CNIC Back Image', type: 'file', required: true, compliance: 'NADRA' },
      { name: 'Passport Size Photo', type: 'file', required: true },
      { name: 'Matriculation Certificate', type: 'file', required: false },
      { name: 'Intermediate Certificate', type: 'file', required: false },
      { name: 'Degree/Transcript', type: 'file', required: false },
      { name: 'Experience Letters', type: 'file', required: false },
      { name: 'Last Salary Slip', type: 'file', required: false },
      { name: 'Bank Statement', type: 'file', required: false },
      { name: 'Medical Fitness', type: 'file', required: false, compliance: 'Safety' },
      { name: 'Police Verification', type: 'file', required: false },
      { name: 'Passport Copy', type: 'file', required: false },
      { name: 'Driving License Copy', type: 'file', required: false },
      { name: 'Professional Certificates', type: 'file', required: false },
      { name: 'Data Accuracy', type: 'checkbox', required: true, label: 'I confirm all information is accurate and true' },
      { name: 'Background Check', type: 'checkbox', required: true, label: 'I authorize background verification checks' },
      { name: 'Data Processing', type: 'checkbox', required: true, label: 'I consent to data collection and processing' },
      { name: 'Code of Conduct', type: 'checkbox', required: true, label: 'I agree to abide by the Company Code of Conduct' },
      { name: 'IT Policy', type: 'checkbox', required: false, label: 'I agree to the IT Acceptable Use Policy' },
      { name: 'NDA', type: 'checkbox', required: false, label: 'I agree to the Non-Disclosure Agreement' },
      { name: 'Conflict of Interest', type: 'checkbox', required: false, label: 'I declare no conflict of interest' },
    ]
  }
];

// ═══════════════════════════════════════════════════════════════════════════
// UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const FlexiLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.primary} 100%)` }}>
      <span className="text-white font-bold">F</span>
    </div>
    <div>
      <h1 className="font-bold text-base leading-none" style={{ color: colors.primary }}>Flexi HRMS</h1>
      <p className="text-[10px] text-gray-500">Employee Enrollment</p>
    </div>
  </div>
);

const ComplianceBadge = ({ label }) => {
  const styles = {
    EOBI: { bg: '#F4E8D4', color: '#A67F45' },
    NADRA: { bg: '#F1F1F3', color: '#5C5966' },
    FBR: { bg: '#D1FAE5', color: '#065F46' },
    SS: { bg: '#E3E1EB', color: '#625D78' },
    'Min Wage': { bg: '#F9D9D4', color: '#A55444' },
    Safety: { bg: '#F9D9D4', color: '#A55444' },
    'Standing Orders': { bg: '#E3E1EB', color: '#514D64' },
  };
  const style = styles[label] || { bg: '#F1F1F3', color: '#5C5966' };
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold ml-1"
      style={{ backgroundColor: style.bg, color: style.color }}>{label}</span>
  );
};

const FormInput = ({ field }) => {
  const baseStyle = {
    border: '2px solid #E5E4E8',
    borderRadius: '8px',
    padding: '6px 10px',
    fontSize: '13px',
    fontWeight: '500',
    color: colors.primary,
    width: '100%',
    outline: 'none',
    background: field.disabled ? '#F8F8F9' : 'white',
  };

  if (field.type === 'select') {
    return (
      <select style={{ ...baseStyle, cursor: 'pointer' }} disabled={field.disabled}>
        <option>Select...</option>
        {field.options?.map((opt, i) => <option key={i}>{opt}</option>)}
      </select>
    );
  }
  if (field.type === 'textarea') {
    return <textarea style={{ ...baseStyle, minHeight: '60px', resize: 'vertical' }} placeholder={field.placeholder} disabled={field.disabled} />;
  }
  if (field.type === 'checkbox') {
    return (
      <label className="flex items-start gap-2 cursor-pointer py-1">
        <input type="checkbox" className="mt-0.5" style={{ accentColor: colors.primary }} />
        <span className="text-xs font-medium leading-tight" style={{ color: colors.primary }}>{field.label}</span>
      </label>
    );
  }
  if (field.type === 'file') {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer" style={{ border: '2px dashed #D2D0D7', background: 'white' }}>
        <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>
          <Upload className="w-3.5 h-3.5 text-white" />
        </div>
        <div>
          <p className="text-[10px] font-semibold" style={{ color: colors.primary }}>Click to upload</p>
          <p className="text-[9px] text-gray-400">PNG, JPG, PDF</p>
        </div>
      </div>
    );
  }
  return <input type={field.type} style={baseStyle} placeholder={field.placeholder} disabled={field.disabled} />;
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN WIZARD COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function FlexiEnrollmentWizard() {
  const [mode, setMode] = useState('quick');
  const [step, setStep] = useState(0);

  const steps = mode === 'quick' ? quickFormSteps : detailedFormSteps;
  const current = steps[step];
  const total = steps.length;
  const progress = ((step + 1) / total) * 100;
  const totalFields = steps.reduce((s, st) => s + st.fields.length, 0);
  const requiredFields = steps.reduce((s, st) => s + st.fields.filter(f => f.required).length, 0);
  const currentFields = current.fields.length;
  const currentRequired = current.fields.filter(f => f.required).length;

  const Icon = current.icon;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #F8F7FA 0%, #F0EFF4 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-3 h-12 flex items-center justify-between">
          <FlexiLogo />
          <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ background: '#F1F1F3' }}>
            {['quick', 'detailed'].map(m => (
              <button key={m} onClick={() => { setMode(m); setStep(0); }}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1"
                style={{ background: mode === m ? 'white' : 'transparent', color: mode === m ? colors.primary : '#706C7A', boxShadow: mode === m ? '0 1px 2px rgba(0,0,0,0.08)' : 'none' }}>
                {m === 'quick' ? <><Zap className="w-3 h-3" /> Quick</> : <><LayoutDashboard className="w-3 h-3" /> Detailed</>}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-3 py-4">
        {/* Progress Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="font-bold text-lg" style={{ color: colors.primary }}>Employee Enrollment</h1>
              <p className="text-[11px] text-gray-500">{mode === 'quick' ? 'Quick Form' : 'Detailed Form'} • {total} Steps • {totalFields} Fields • {requiredFields} Required</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-[11px] font-semibold mb-1">
              <span style={{ color: colors.primary }}>Step {step + 1} of {total}</span>
              <span style={{ color: colors.secondary }}>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})` }} />
            </div>
          </div>

          {/* Step Pills */}
          <div className="flex items-center justify-center gap-1 flex-wrap">
            {steps.map((s, idx) => {
              const StepIcon = s.icon;
              const isActive = idx === step;
              const isCompleted = idx < step;
              return (
                <button key={s.id} onClick={() => setStep(idx)}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-all"
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` : isCompleted ? '#F4E8D4' : '#F1F1F3',
                    color: isActive ? 'white' : isCompleted ? '#A67F45' : '#8A8694',
                  }}>
                  {isCompleted ? <Check className="w-3 h-3" /> : <StepIcon className="w-3 h-3" />}
                  <span className="hidden sm:inline">{s.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Step Header */}
          <div className="px-4 py-3 border-b border-gray-100" style={{ background: '#F8F7FA' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="font-bold text-base" style={{ color: colors.primary }}>{current.title}</h2>
                <p className="text-[11px] text-gray-500">{current.subtitle}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-500">{currentFields} fields</span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: '#F9D9D4', color: '#A55444' }}>{currentRequired} req</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {current.fields.map((field, idx) => (
                <div key={idx} className={`${field.type === 'textarea' ? 'md:col-span-2' : ''} ${field.type === 'checkbox' ? 'md:col-span-2 lg:col-span-3' : ''}`}>
                  {field.type !== 'checkbox' && (
                    <label className="flex items-center gap-1 text-[11px] font-semibold mb-1" style={{ color: colors.primary }}>
                      {field.name}
                      {field.required && <span className="w-1 h-1 rounded-full" style={{ background: colors.coral }} />}
                      {field.compliance && <ComplianceBadge label={field.compliance} />}
                    </label>
                  )}
                  <FormInput field={field} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Footer */}
          <div className="px-4 py-3 border-t border-gray-100" style={{ background: '#FAFAFA' }}>
            <div className="flex items-center justify-between gap-2">
              <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}
                className="px-3 py-1.5 rounded-lg font-semibold text-xs border-2 flex items-center gap-1 disabled:opacity-40"
                style={{ borderColor: '#D5D3E0', color: colors.primary }}>
                <ChevronLeft className="w-3.5 h-3.5" /> Previous
              </button>

              <div className="flex items-center gap-1">
                {steps.map((_, idx) => (
                  <button key={idx} onClick={() => setStep(idx)} className="h-1.5 rounded-full transition-all"
                    style={{ width: idx === step ? '14px' : '6px', background: idx === step ? `linear-gradient(90deg, ${colors.secondary}, ${colors.primary})` : idx < step ? colors.secondary : '#D2D0D7' }} />
                ))}
              </div>

              <div className="flex gap-2">
                <button className="px-2 py-1.5 rounded-lg font-semibold text-xs flex items-center gap-1 hover:bg-gray-100" style={{ color: '#706C7A' }}>
                  <Save className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => step < total - 1 ? setStep(step + 1) : alert('Form Submitted!')}
                  className="px-3 py-1.5 rounded-lg font-semibold text-xs text-white flex items-center gap-1"
                  style={{ background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})` }}>
                  {step === total - 1 ? <><Send className="w-3.5 h-3.5" /> Submit</> : <>Next <ChevronRight className="w-3.5 h-3.5" /></>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { label: 'Total', value: totalFields, color: colors.primary },
            { label: 'Required', value: requiredFields, color: '#A55444' },
            { label: 'Done', value: step, color: '#A67F45' },
            { label: 'Left', value: total - step - 1, color: colors.secondary },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-lg p-2 border border-gray-200 text-center">
              <p className="text-[10px] font-semibold text-gray-500">{stat.label}</p>
              <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 rounded-xl p-3 text-white text-center"
          style={{ background: `linear-gradient(135deg, ${colors.primary}, #232135)` }}>
          <div className="flex items-center justify-center gap-1.5 mb-1.5">
            <Shield className="w-3.5 h-3.5" style={{ color: colors.beige }} />
            <span className="font-bold text-xs">Pakistan Labor Law Compliance</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-[10px]">
            {['EOBI Act', 'Provincial SS', 'FBR Tax', 'Standing Orders'].map(law => (
              <span key={law} className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: colors.beige }} />
                {law}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
