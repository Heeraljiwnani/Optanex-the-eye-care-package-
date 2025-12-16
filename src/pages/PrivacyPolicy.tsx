import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertTriangle, Mail } from "lucide-react";



export default function PrivacyPolicy() {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">OptaNex - Complete Eye Care Companion</p>
          <p className="text-sm text-muted-foreground">Last Updated: January 2025</p>
        </div>
        <div className="mt-6">
          <a 
            href="/Privacy_Policy_for_Optanex.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FileText className="h-5 w-5" />
            View Complete Privacy Policy (PDF)
          </a>
        </div>
      </div>

      {/* Introduction */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-3">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                OptaNex ("we," "our," or "us") is committed to protecting your privacy and ensuring the security 
                of your personal and medical information. This Privacy Policy explains how we collect, use, 
                disclose, and safeguard your information when you use our eye care application and services, 
                in compliance with the Digital Personal Data Protection Act (DPDP Act) 2023 and international 
                privacy standards.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Information We Collect */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Information We Collect
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Name, email address, and contact information</li>
                <li>• Account credentials and authentication data</li>
                <li>• Profile information and preferences</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Medical Information</h3>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Eye examination results and screening data</li>
                <li>• Prescription information and medical history</li>
                <li>• Visual acuity measurements and eye power records</li>
                <li>• Retinal images and diagnostic test results</li>
                <li>• Blue light exposure and screen time data</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• Device information and browser type</li>
                <li>• Application usage patterns and interaction data</li>
                <li>• Performance and error logs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How We Use Your Information */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            How We Use Your Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">We use your information for the following purposes:</p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>• Providing and maintaining our eye care services</li>
              <li>• Conducting eye health screenings and assessments</li>
              <li>• Tracking your eye health progress over time</li>
              <li>• Generating personalized health insights and recommendations</li>
              <li>• Improving our AI-powered diagnostic tools</li>
              <li>• Ensuring application security and preventing fraud</li>
              <li>• Communicating important updates and health reminders</li>
              <li>• Complying with legal and regulatory requirements</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Data Protection & Security */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Data Protection & Security
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              We implement robust security measures to protect your data:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Technical Safeguards</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• End-to-end encryption for all data transmission</li>
                  <li>• AES-256 encryption for data at rest</li>
                  <li>• Multi-factor authentication</li>
                  <li>• Regular security audits and penetration testing</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Operational Safeguards</h4>
                <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                  <li>• Access controls and role-based permissions</li>
                  <li>• Employee training on data protection</li>
                  <li>• Incident response and data breach protocols</li>
                  <li>• Regular backup and disaster recovery procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Rights */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Your Rights Under DPDP Act 2023
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">You have the following rights regarding your personal data:</p>
            <div className="grid gap-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground">Right to Access</h4>
                <p className="text-sm text-muted-foreground">Request access to your personal data and how it's being processed</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground">Right to Correction</h4>
                <p className="text-sm text-muted-foreground">Request correction of inaccurate or incomplete personal data</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground">Right to Erasure</h4>
                <p className="text-sm text-muted-foreground">Request deletion of your personal data under certain circumstances</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground">Right to Data Portability</h4>
                <p className="text-sm text-muted-foreground">Request your data in a structured, machine-readable format</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <h4 className="font-semibold text-foreground">Right to Grievance Redressal</h4>
                <p className="text-sm text-muted-foreground">File complaints regarding data processing with our Data Protection Officer</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Sharing */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Data Sharing & Disclosure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              We do not sell, trade, or share your personal information except in the following limited circumstances:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li>• <strong>With your explicit consent:</strong> When you specifically authorize data sharing</li>
              <li>• <strong>For medical purposes:</strong> With healthcare providers you designate</li>
              <li>• <strong>Legal compliance:</strong> When required by law or legal process</li>
              <li>• <strong>Service providers:</strong> With trusted partners who assist in providing our services (under strict confidentiality agreements)</li>
              <li>• <strong>Emergency situations:</strong> To protect your vital interests or those of others</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle>Data Retention</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-muted-foreground">
              We retain your data only as long as necessary for the purposes outlined in this policy:
            </p>
            <ul className="space-y-1 text-muted-foreground ml-4">
              <li>• Medical records: Retained for 7 years after your last interaction (as per medical guidelines)</li>
              <li>• Account information: Retained until account deletion or 3 years of inactivity</li>
              <li>• Usage logs: Retained for 2 years for security and improvement purposes</li>
              <li>• Marketing communications: Until you unsubscribe or withdraw consent</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Us
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-foreground"><strong>Data Protection Officer</strong></p>
              <p className="text-muted-foreground">Email: privacy@optanex.com</p>
              <p className="text-muted-foreground">Phone: +91-XXXX-XXXXXX</p>
              <p className="text-muted-foreground">Address: [Company Address]</p>
            </div>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Grievance Redressal:</strong> We are committed to resolving any privacy-related concerns 
                within 72 hours of receiving your complaint. You may also file a complaint with the Data Protection 
                Board of India if you believe your rights have been violated.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates */}
      <Card className="bg-gradient-card border-0 shadow-custom-sm">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-foreground">Policy Updates</h3>
            <p className="text-sm text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of any material changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date. 
              Continued use of our services after such changes constitutes acceptance of the updated policy.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}