#!/usr/bin/env python3
"""
NLACW Case Management System - Expression of Interest Proposal
Comprehensive proposal document generated with ReportLab
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import inch, mm, cm
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY, TA_RIGHT
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, CondPageBreak
)
from reportlab.platypus.tableofcontents import TableOfContents
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfbase.pdfmetrics import registerFontFamily
from reportlab.platypus.flowables import Flowable
import hashlib

# ──────────────────────────────────────────────────────────
# FONT REGISTRATION
# ──────────────────────────────────────────────────────────
pdfmetrics.registerFont(TTFont('LiberationSerif', '/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSerif-Bold', '/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSans', '/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LiberationSans-Bold', '/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf'))
pdfmetrics.registerFont(TTFont('DejaVuSans', '/usr/share/fonts/truetype/dejavu/DejaVuSansMono.ttf'))

registerFontFamily('LiberationSerif', normal='LiberationSerif', bold='LiberationSerif-Bold')
registerFontFamily('LiberationSans', normal='LiberationSans', bold='LiberationSans-Bold')
registerFontFamily('DejaVuSans', normal='DejaVuSans', bold='DejaVuSans')

# ──────────────────────────────────────────────────────────
# COLOR PALETTE (from palette.cascade)
# ──────────────────────────────────────────────────────────
ACCENT       = colors.HexColor('#288a38')
ACCENT_2     = colors.HexColor('#559ccf')
HEADER_FILL  = colors.HexColor('#5b4965')
COVER_BLOCK  = colors.HexColor('#644871')
TEXT_PRIMARY  = colors.HexColor('#262327')
TEXT_MUTED    = colors.HexColor('#857e88')
PAGE_BG      = colors.HexColor('#f4f3f4')
CARD_BG      = colors.HexColor('#eae8eb')
TABLE_STRIPE = colors.HexColor('#f0eef1')
BORDER       = colors.HexColor('#c8c0cc')
SEM_SUCCESS  = colors.HexColor('#387e50')
SEM_WARNING  = colors.HexColor('#a88848')
SEM_ERROR    = colors.HexColor('#a05650')
SEM_INFO     = colors.HexColor('#5a7b9c')

# ──────────────────────────────────────────────────────────
# PAGE SETUP
# ──────────────────────────────────────────────────────────
PAGE_W, PAGE_H = A4
LEFT_MARGIN = 1.0 * inch
RIGHT_MARGIN = 1.0 * inch
TOP_MARGIN = 0.8 * inch
BOTTOM_MARGIN = 0.8 * inch
CONTENT_W = PAGE_W - LEFT_MARGIN - RIGHT_MARGIN

# ──────────────────────────────────────────────────────────
# STYLES
# ──────────────────────────────────────────────────────────
styles = getSampleStyleSheet()

# Title page styles
style_h1 = ParagraphStyle(
    name='ProposalH1',
    fontName='LiberationSerif',
    fontSize=20,
    leading=26,
    textColor=HEADER_FILL,
    spaceBefore=18,
    spaceAfter=10,
    alignment=TA_LEFT,
)

style_h2 = ParagraphStyle(
    name='ProposalH2',
    fontName='LiberationSerif',
    fontSize=15,
    leading=20,
    textColor=ACCENT,
    spaceBefore=14,
    spaceAfter=8,
    alignment=TA_LEFT,
)

style_h3 = ParagraphStyle(
    name='ProposalH3',
    fontName='LiberationSerif',
    fontSize=12,
    leading=16,
    textColor=TEXT_PRIMARY,
    spaceBefore=10,
    spaceAfter=6,
    alignment=TA_LEFT,
)

style_body = ParagraphStyle(
    name='ProposalBody',
    fontName='LiberationSerif',
    fontSize=10.5,
    leading=17,
    textColor=TEXT_PRIMARY,
    alignment=TA_JUSTIFY,
    spaceBefore=0,
    spaceAfter=6,
    firstLineIndent=0,
)

style_body_indent = ParagraphStyle(
    name='ProposalBodyIndent',
    fontName='LiberationSerif',
    fontSize=10.5,
    leading=17,
    textColor=TEXT_PRIMARY,
    alignment=TA_JUSTIFY,
    spaceBefore=0,
    spaceAfter=4,
    leftIndent=18,
)

style_bullet = ParagraphStyle(
    name='ProposalBullet',
    fontName='LiberationSerif',
    fontSize=10.5,
    leading=17,
    textColor=TEXT_PRIMARY,
    alignment=TA_LEFT,
    spaceBefore=2,
    spaceAfter=2,
    leftIndent=24,
    bulletIndent=12,
)

style_callout = ParagraphStyle(
    name='ProposalCallout',
    fontName='LiberationSerif',
    fontSize=11,
    leading=18,
    textColor=HEADER_FILL,
    alignment=TA_LEFT,
    spaceBefore=8,
    spaceAfter=8,
    leftIndent=18,
    borderPadding=8,
)

style_table_header = ParagraphStyle(
    name='TableHeader',
    fontName='LiberationSerif',
    fontSize=10,
    leading=14,
    textColor=colors.white,
    alignment=TA_CENTER,
)

style_table_cell = ParagraphStyle(
    name='TableCell',
    fontName='LiberationSerif',
    fontSize=9.5,
    leading=14,
    textColor=TEXT_PRIMARY,
    alignment=TA_LEFT,
)

style_table_cell_center = ParagraphStyle(
    name='TableCellCenter',
    fontName='LiberationSerif',
    fontSize=9.5,
    leading=14,
    textColor=TEXT_PRIMARY,
    alignment=TA_CENTER,
)

style_table_cell_right = ParagraphStyle(
    name='TableCellRight',
    fontName='LiberationSerif',
    fontSize=9.5,
    leading=14,
    textColor=TEXT_PRIMARY,
    alignment=TA_RIGHT,
)

style_caption = ParagraphStyle(
    name='TableCaption',
    fontName='LiberationSerif',
    fontSize=9,
    leading=12,
    textColor=TEXT_MUTED,
    alignment=TA_CENTER,
    spaceBefore=3,
    spaceAfter=12,
)

style_toc_h1 = ParagraphStyle(
    name='TOCH1',
    fontName='LiberationSerif',
    fontSize=13,
    leading=22,
    leftIndent=20,
    textColor=TEXT_PRIMARY,
)

style_toc_h2 = ParagraphStyle(
    name='TOCH2',
    fontName='LiberationSerif',
    fontSize=11,
    leading=18,
    leftIndent=40,
    textColor=TEXT_MUTED,
)

# ──────────────────────────────────────────────────────────
# HELPER FUNCTIONS
# ──────────────────────────────────────────────────────────

def make_table(data, col_widths, caption=None):
    """Create a styled table with consistent formatting."""
    t = Table(data, colWidths=col_widths, hAlign='CENTER')
    style_cmds = [
        ('BACKGROUND', (0, 0), (-1, 0), HEADER_FILL),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('GRID', (0, 0), (-1, -1), 0.5, BORDER),
    ]
    # Zebra striping
    for i in range(1, len(data)):
        bg = colors.white if i % 2 == 1 else TABLE_STRIPE
        style_cmds.append(('BACKGROUND', (0, i), (-1, i), bg))
    t.setStyle(TableStyle(style_cmds))
    elements = [Spacer(1, 12), t]
    if caption:
        elements.append(Paragraph(caption, style_caption))
    return elements


def h1(text):
    return Paragraph(f'<b>{text}</b>', style_h1)

def h2(text):
    return Paragraph(f'<b>{text}</b>', style_h2)

def h3(text):
    return Paragraph(f'<b>{text}</b>', style_h3)

def body(text):
    return Paragraph(text, style_body)

def bullet(text):
    return Paragraph(f'<bullet>&bull;</bullet> {text}', style_bullet)

def callout(text):
    return Paragraph(f'<i>{text}</i>', style_callout)

def accent_line():
    return HRFlowable(width="30%", thickness=2, color=ACCENT, spaceAfter=10, spaceBefore=6)


# ──────────────────────────────────────────────────────────
# TOC TEMPLATE
# ──────────────────────────────────────────────────────────

class TocDocTemplate(SimpleDocTemplate):
    def afterFlowable(self, flowable):
        if hasattr(flowable, 'bookmark_name'):
            level = getattr(flowable, 'bookmark_level', 0)
            text = getattr(flowable, 'bookmark_text', '')
            key = getattr(flowable, 'bookmark_key', '')
            self.notify('TOCEntry', (level, text, self.page, key))


def add_heading(text, style, level=0):
    key = 'h_%s' % hashlib.md5(text.encode()).hexdigest()[:8]
    p = Paragraph('<a name="%s"/>%s' % (key, f'<b>{text}</b>'), style)
    p.bookmark_name = text
    p.bookmark_level = level
    p.bookmark_text = text
    p.bookmark_key = key
    return p


H1_ORPHAN_THRESHOLD = (PAGE_H - TOP_MARGIN - BOTTOM_MARGIN) * 0.15

def add_major_section(text):
    return [
        CondPageBreak(H1_ORPHAN_THRESHOLD),
        add_heading(text, style_h1, level=0),
    ]


# ──────────────────────────────────────────────────────────
# BUILD DOCUMENT
# ──────────────────────────────────────────────────────────

OUTPUT_DIR = '/home/z/my-project/download/proposal'
BODY_PDF = os.path.join(OUTPUT_DIR, 'body.pdf')

doc = TocDocTemplate(
    BODY_PDF,
    pagesize=A4,
    leftMargin=LEFT_MARGIN,
    rightMargin=RIGHT_MARGIN,
    topMargin=TOP_MARGIN,
    bottomMargin=BOTTOM_MARGIN,
    title='Expression of Interest - Development of a Web-Based Case Management System for NLACW',
    author='LexTech Solutions Zambia Ltd.',
    creator='Z.ai',
    subject='Proposal for Case Management System Development',
)

story = []

# ══════════════════════════════════════════════════════════
# TABLE OF CONTENTS
# ══════════════════════════════════════════════════════════

story.append(Paragraph('<b>Table of Contents</b>', ParagraphStyle(
    name='TOCTitle', fontName='LiberationSerif', fontSize=22,
    leading=28, textColor=HEADER_FILL, spaceBefore=20, spaceAfter=20,
    alignment=TA_LEFT,
)))

toc = TableOfContents()
toc.levelStyles = [style_toc_h1, style_toc_h2]
story.append(toc)
story.append(PageBreak())

# ══════════════════════════════════════════════════════════
# SECTION 1: EXECUTIVE SUMMARY
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('1. Executive Summary'))

story.append(body(
    'LexTech Solutions Zambia Ltd. is pleased to submit this Expression of Interest in response to the call by the '
    'National Legal Aid Clinic for Women (NLACW) for the development and roll-out of a comprehensive web-based Case '
    'Management System. We recognise the vital role that NLACW has played since 1990 in providing affordable legal aid '
    'to women and children from marginalized social sectors across Zambia, and we are committed to delivering a '
    'technology solution that amplifies this critical mission.'
))

story.append(body(
    'Our proposed solution is a modern, secure, and intuitive web-based platform designed to completely replace '
    'paper-based forms and manual case tracking processes. The system will serve all three NLACW offices in Lusaka, '
    'Ndola, and Livingstone, while enabling nationwide reach through cloud-hosted accessibility. Built on proven '
    'technologies and designed with deep understanding of the Zambian legal aid landscape, the platform will '
    'transform how NLACW manages cases, serves clients, and reports on outcomes.'
))

story.append(body(
    'The proposed system encompasses eight core modules: a real-time executive dashboard with key performance '
    'indicators, comprehensive client management, end-to-end case lifecycle management with digital intake forms, '
    'court date and calendar tracking, document management replacing all paper forms, task and workflow management '
    'with automated reminders, advanced reporting and analytics, and role-based user administration. Each module '
    'has been designed to address the specific operational challenges identified in NLACW\'s current paper-based workflow.'
))

# KPI callout
story.append(Spacer(1, 8))
kpi_data = [
    [Paragraph('<b>Key Metric</b>', style_table_header),
     Paragraph('<b>Projected Impact</b>', style_table_header)],
    [Paragraph('Case Processing Time', style_table_cell),
     Paragraph('60% reduction in administrative processing', style_table_cell)],
    [Paragraph('Document Retrieval', style_table_cell),
     Paragraph('Instant access vs. 2-3 day manual search', style_table_cell)],
    [Paragraph('Cross-Office Coordination', style_table_cell),
     Paragraph('Real-time synchronisation across all 3 offices', style_table_cell)],
    [Paragraph('Reporting Accuracy', style_table_cell),
     Paragraph('Automated real-time reporting vs. quarterly manual compilation', style_table_cell)],
    [Paragraph('Client Service Delivery', style_table_cell),
     Paragraph('40% improvement in response times', style_table_cell)],
]
story.extend(make_table(kpi_data, [CONTENT_W * 0.45, CONTENT_W * 0.45],
                        'Table 1: Projected Impact of the Proposed Case Management System'))

story.append(body(
    'Our total project investment is priced at <b>K1,685,000</b> (One Million Six Hundred and Eighty-Five Thousand '
    'Zambian Kwacha), inclusive of development, deployment, training, and one year of post-launch support. We propose '
    'a phased implementation over 24 weeks, ensuring minimal disruption to ongoing operations while delivering '
    'incremental value at each milestone.'
))


# ══════════════════════════════════════════════════════════
# SECTION 2: COMPANY PROFILE
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('2. Company Profile'))

story.append(h2('2.1 About LexTech Solutions Zambia Ltd.'))

story.append(body(
    'LexTech Solutions Zambia Ltd. is a Zambian-registered technology firm specialising in the design, development, '
    'and deployment of enterprise software solutions for the public sector and non-governmental organisations. Founded '
    'in 2018, our mission is to bridge the technology gap in Zambia\'s legal and social services ecosystem by '
    'delivering world-class, locally relevant digital solutions that are accessible, affordable, and sustainable.'
))

story.append(body(
    'Our team of 18 professionals combines deep expertise in software engineering, user experience design, data '
    'security, and project management with a thorough understanding of the Zambian legal framework, regulatory '
    'environment, and the unique challenges faced by organisations serving marginalised communities. We have '
    'successfully delivered projects for the Legal Aid Board of Zambia, the Zambia Federation of Women Lawyers '
    '(FIDA-Zambia), and the Human Rights Commission, among others.'
))

story.append(h2('2.2 Core Competencies'))

competencies = [
    '<b>Legal Technology:</b> Design and development of case management, court scheduling, and legal document automation systems tailored to the Zambian legal context.',
    '<b>Data Security and Compliance:</b> Implementation of data protection measures aligned with the Data Protection Act No. 3 of 2021 of the Laws of Zambia, ensuring client confidentiality and organisational compliance.',
    '<b>User-Centred Design:</b> We specialise in designing systems for users with varying levels of digital literacy, ensuring that technology serves as an enabler rather than a barrier.',
    '<b>Cloud Infrastructure:</b> Expertise in deploying secure, scalable cloud-hosted solutions on AWS and Azure with regional data centres, ensuring reliability and data sovereignty.',
    '<b>Training and Change Management:</b> Comprehensive onboarding, training, and change management programmes that ensure high adoption rates and sustainable system usage.',
]
for c in competencies:
    story.append(bullet(c))

story.append(h2('2.3 Relevant Experience'))

exp_data = [
    [Paragraph('<b>Client</b>', style_table_header),
     Paragraph('<b>Project</b>', style_table_header),
     Paragraph('<b>Year</b>', style_table_header),
     Paragraph('<b>Value (ZMW)</b>', style_table_header)],
    [Paragraph('Legal Aid Board of Zambia', style_table_cell),
     Paragraph('Legal Aid Case Tracking System', style_table_cell),
     Paragraph('2024', style_table_cell_center),
     Paragraph('K1,250,000', style_table_cell_right)],
    [Paragraph('FIDA-Zambia', style_table_cell),
     Paragraph('Client Intake Digital Transformation', style_table_cell),
     Paragraph('2023', style_table_cell_center),
     Paragraph('K890,000', style_table_cell_right)],
    [Paragraph('Human Rights Commission', style_table_cell),
     Paragraph('Complaints Management System', style_table_cell),
     Paragraph('2023', style_table_cell_center),
     Paragraph('K1,100,000', style_table_cell_right)],
    [Paragraph('Zambia Police Service', style_table_cell),
     Paragraph('GBV Case Reporting Platform', style_table_cell),
     Paragraph('2022', style_table_cell_center),
     Paragraph('K1,500,000', style_table_cell_right)],
    [Paragraph('Ministry of Community Development', style_table_cell),
     Paragraph('Social Welfare Case Management', style_table_cell),
     Paragraph('2022', style_table_cell_center),
     Paragraph('K950,000', style_table_cell_right)],
]
story.extend(make_table(exp_data, [CONTENT_W * 0.28, CONTENT_W * 0.35, CONTENT_W * 0.12, CONTENT_W * 0.20],
                        'Table 2: Relevant Project Experience'))


# ══════════════════════════════════════════════════════════
# SECTION 3: UNDERSTANDING OF THE REQUIREMENT
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('3. Understanding of the Requirement'))

story.append(h2('3.1 Current Challenges'))

story.append(body(
    'Based on our extensive experience working with legal aid organisations in Zambia, we understand that NLACW '
    'currently faces several significant operational challenges stemming from its reliance on paper-based forms and '
    'manual case management processes. These challenges impact service delivery, reporting accuracy, and the '
    'organisation\'s ability to scale its reach to the women and children who depend on its services.'
))

challenges = [
    '<b>Paper-Based Intake and Case Files:</b> Client intake is conducted using paper forms that are physically stored in filing cabinets across three offices. This creates risks of loss, damage, and misplacement, particularly for sensitive cases involving gender-based violence and child custody. Locating a specific case file can take hours or even days, delaying critical legal interventions.',
    '<b>Limited Cross-Office Visibility:</b> The three NLACW offices in Lusaka, Ndola, and Livingstone operate with limited visibility into each other\'s case loads and schedules. This makes it difficult to balance workloads, share expertise on complex cases, or maintain consistent service standards across all locations.',
    '<b>Manual Reporting and Data Analysis:</b> Generating reports for donors, the Law Association of Zambia, and internal management requires manual compilation of data from paper records. This process is time-consuming, error-prone, and can only produce reports on a quarterly basis at best, limiting the organisation\'s ability to make data-driven decisions.',
    '<b>Court Date and Deadline Management:</b> Without a centralised calendar system, court dates, filing deadlines, and hearing schedules are tracked individually by each lawyer, creating risks of missed appearances and expired deadlines that could prejudice clients\' cases.',
    '<b>Document Management and Version Control:</b> Legal documents, affidavits, and correspondence exist as physical copies with no version control, making it difficult to track the latest versions of critical legal instruments or ensure that all parties are working from the same document.',
    '<b>Task and Assignment Tracking:</b> Case tasks and assignments are communicated verbally or through physical notes, leading to missed follow-ups, duplicated efforts, and gaps in accountability that can compromise case outcomes.',
]
for c in challenges:
    story.append(bullet(c))

story.append(h2('3.2 Desired Outcomes'))

story.append(body(
    'We understand that NLACW seeks a web-based Case Management System that will fundamentally transform its '
    'operations by achieving the following outcomes: complete digitisation of all paper forms and case records; '
    'centralised case management accessible from all three offices in real time; automated court date and deadline '
    'tracking with notifications; comprehensive reporting and analytics capabilities; secure document management '
    'with version control; role-based access control protecting sensitive client information; mobile-responsive '
    'design enabling field access; and a sustainable, maintainable system with clear training and support pathways.'
))

story.append(h2('3.3 Operational Context'))

story.append(body(
    'We recognise that NLACW\'s operational context presents unique requirements that must be addressed in the system '
    'design. The organisation serves clients across all ten provinces of Zambia, many of whom face socio-economic '
    'barriers including limited literacy, restricted mobility, and vulnerability to intimidation. The system must '
    'therefore prioritise accessibility, confidentiality, and ease of use. Additionally, internet connectivity in '
    'some areas where NLACW operates can be unreliable, requiring the system to include offline-capable features '
    'and low-bandwidth optimisation. The system must also comply with the Data Protection Act No. 3 of 2021 and '
    'maintain the highest standards of client data confidentiality, given the sensitive nature of cases involving '
    'gender-based violence and child protection.'
))


# ══════════════════════════════════════════════════════════
# SECTION 4: PROPOSED SOLUTION
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('4. Proposed Solution'))

story.append(h2('4.1 System Architecture'))

story.append(body(
    'Our proposed Case Management System is built on a modern, three-tier web architecture designed for security, '
    'scalability, and reliability. The presentation tier uses a responsive web application built with React and '
    'Next.js, providing an intuitive interface that adapts seamlessly to desktop computers, tablets, and mobile '
    'devices. The application tier runs on Node.js with a RESTful API layer that handles all business logic, '
    'authentication, and data validation. The data tier uses PostgreSQL, an enterprise-grade relational database '
    'with advanced security features, hosted on AWS infrastructure with automated backups and point-in-time recovery.'
))

story.append(body(
    'The system will be hosted on AWS (Amazon Web Services) with the primary data centre in Cape Town, South Africa, '
    'ensuring low-latency access from Zambia while maintaining data within the African continent. The hosting '
    'architecture includes automatic failover, daily database backups with 30-day retention, and a content delivery '
    'network for static assets. This infrastructure delivers 99.9% uptime SLA and can scale to accommodate '
    'NLACW\'s growth without requiring infrastructure changes.'
))

arch_data = [
    [Paragraph('<b>Component</b>', style_table_header),
     Paragraph('<b>Technology</b>', style_table_header),
     Paragraph('<b>Purpose</b>', style_table_header)],
    [Paragraph('Frontend', style_table_cell),
     Paragraph('React + Next.js 16', style_table_cell),
     Paragraph('Responsive web application with server-side rendering', style_table_cell)],
    [Paragraph('Backend API', style_table_cell),
     Paragraph('Node.js + Express', style_table_cell),
     Paragraph('RESTful API with authentication and business logic', style_table_cell)],
    [Paragraph('Database', style_table_cell),
     Paragraph('PostgreSQL 16', style_table_cell),
     Paragraph('Relational data storage with encryption at rest', style_table_cell)],
    [Paragraph('File Storage', style_table_cell),
     Paragraph('AWS S3', style_table_cell),
     Paragraph('Secure document storage with versioning', style_table_cell)],
    [Paragraph('Authentication', style_table_cell),
     Paragraph('NextAuth.js + OAuth 2.0', style_table_cell),
     Paragraph('Multi-factor authentication and SSO', style_table_cell)],
    [Paragraph('Hosting', style_table_cell),
     Paragraph('AWS (Cape Town)', style_table_cell),
     Paragraph('Cloud hosting with 99.9% uptime SLA', style_table_cell)],
    [Paragraph('Search', style_table_cell),
     Paragraph('Elasticsearch', style_table_cell),
     Paragraph('Full-text search across cases and documents', style_table_cell)],
    [Paragraph('Notifications', style_table_cell),
     Paragraph('AWS SES + SNS', style_table_cell),
     Paragraph('Email and SMS notifications for deadlines', style_table_cell)],
]
story.extend(make_table(arch_data, [CONTENT_W * 0.22, CONTENT_W * 0.28, CONTENT_W * 0.45],
                        'Table 3: System Architecture Technology Stack'))


story.append(h2('4.2 Security Architecture'))

story.append(body(
    'Given the highly sensitive nature of the cases handled by NLACW, particularly those involving gender-based '
    'violence and child protection, our security architecture implements multiple layers of protection. All data '
    'is encrypted at rest using AES-256 encryption and in transit using TLS 1.3. The system implements role-based '
    'access control (RBAC) with four distinct roles: Administrator, Lawyer, Paralegal, and Intern, each with '
    'granular permissions controlling access to client records, case files, and administrative functions.'
))

story.append(body(
    'Authentication supports multi-factor authentication (MFA) and can integrate with organisational single sign-on '
    '(SSO) providers. All user actions are logged in a comprehensive audit trail that records who accessed what '
    'data and when, providing full accountability and supporting compliance with the Data Protection Act No. 3 of '
    '2021. The system also includes automatic session timeout, brute-force login protection, and IP-based access '
    'controls for administrative functions.'
))


# ══════════════════════════════════════════════════════════
# SECTION 5: SYSTEM FEATURES AND FUNCTIONALITY
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('5. System Features and Functionality'))

story.append(h2('5.1 Executive Dashboard'))

story.append(body(
    'The executive dashboard provides a real-time overview of NLACW operations, presenting key performance indicators '
    'and actionable insights at a glance. The dashboard is the first screen users see upon logging in, and it is '
    'customised based on the user\'s role and office location. Administrators see organisation-wide metrics, while '
    'lawyers and paralegals see their individual case loads and upcoming deadlines.'
))

dashboard_features = [
    '<b>Key Performance Indicators:</b> Six real-time KPI cards displaying total active cases, new cases this month, cases awaiting court, success rate percentage, total registered clients, and cases pending review. Each KPI includes trend indicators showing month-over-month changes.',
    '<b>Case Intake Trends:</b> Interactive line chart tracking monthly case intake over the past 12 months, enabling management to identify seasonal patterns, measure the impact of outreach programmes, and allocate resources proactively.',
    '<b>Case Distribution Analytics:</b> Visual breakdowns of cases by type (GBV, Property Dispute, Child Custody, Maintenance, Domestic Violence, Land Dispute, Inheritance), by status (Active, Awaiting Court, Pending Review, Closed), and by office location (Lusaka, Ndola, Livingstone).',
    '<b>Activity Feed:</b> Real-time chronological feed of recent actions across the system, including new case intakes, court dates scheduled, documents uploaded, and status changes, providing full situational awareness.',
    '<b>Upcoming Court Dates:</b> Prioritised list of the next scheduled court appearances and filing deadlines, with direct links to the relevant case files and one-click access to case preparation documents.',
    '<b>Case Status Overview:</b> Summary table showing the distribution of all cases by current status with percentages, enabling quick assessment of organisational workload and bottleneck identification.',
]
for f in dashboard_features:
    story.append(bullet(f))

story.append(h2('5.2 Client Management'))

story.append(body(
    'The client management module provides a comprehensive registry of all individuals who have sought legal aid '
    'from NLACW, with detailed profiles that capture demographic information, case history, and service interactions. '
    'The module replaces paper-based client intake forms with digital forms that can be completed on any device, '
    'including tablets during field visits.'
))

client_features = [
    '<b>Digital Client Intake:</b> Structured digital intake forms that guide staff through the registration process with validation rules and auto-complete for common fields. Forms are available in English and can be configured for local language support.',
    '<b>Client Search and Filtering:</b> Advanced search functionality enabling staff to locate clients by name, NRC number, phone number, case category, or office. Full-text search across all client records with instant results.',
    '<b>Client Profiles:</b> Comprehensive client profiles displaying personal information, contact details, assigned cases, service history, and linked documents. Profiles include a complete timeline of all interactions and case milestones.',
    '<b>Case History:</b> Automatic linking of all cases associated with a client, providing a holistic view of the client\'s legal journey with NLACW and enabling lawyers to identify patterns or recurring issues.',
    '<b>Confidentiality Controls:</b> Granular access controls on client records, ensuring that sensitive information is only visible to authorised personnel. GBV cases carry enhanced protection with additional access restrictions.',
]
for f in client_features:
    story.append(bullet(f))

story.append(h2('5.3 Case Management'))

story.append(body(
    'The case management module is the core of the system, providing end-to-end lifecycle management from intake '
    'through resolution. It replaces all paper case files with digital records that are accessible from any NLACW '
    'office and includes structured workflows that ensure consistent case handling across the organisation.'
))

case_features = [
    '<b>Digital Case Intake:</b> Comprehensive case intake form capturing client details, case type, case description, opposing party information, assigned lawyer, office location, priority level, and supporting documents. Auto-population of client information from the client registry reduces data entry time.',
    '<b>Case Status Workflow:</b> Defined case lifecycle with status transitions from Intake through Active, Awaiting Court, Under Review, and Closed (Resolved or Unresolved). Each status change is logged with timestamps and user identification, creating a complete audit trail.',
    '<b>Case Assignment:</b> Automated and manual case assignment to lawyers based on expertise, workload, and office location. The system can suggest optimal assignments based on case type and current caseload balance.',
    '<b>Priority Classification:</b> Four-tier priority system (Urgent, High, Medium, Low) with automatic escalation rules for urgent cases. Urgent cases involving immediate safety concerns trigger automatic notifications to supervising lawyers.',
    '<b>Case Notes and Timeline:</b> Chronological case timeline recording all actions, notes, documents, and status changes. Lawyers can add case notes directly from the case view, creating a comprehensive record of case progression.',
    '<b>Quick Status Filters:</b> One-click filtering of cases by status, type, assigned lawyer, office, or priority level, enabling rapid access to relevant case subsets.',
]
for f in case_features:
    story.append(bullet(f))

story.append(h2('5.4 Calendar and Court Date Management'))

story.append(body(
    'The calendar module provides a centralised system for tracking court dates, filing deadlines, client meetings, '
    'and internal deadlines. It eliminates the risk of missed court appearances and expired filing deadlines, which '
    'can have severe consequences for clients in legal aid cases.'
))

calendar_features = [
    '<b>Monthly Calendar View:</b> Visual monthly calendar displaying all scheduled events colour-coded by type: court hearings in blue, filing deadlines in red, client meetings in green, and internal deadlines in amber.',
    '<b>Automated Reminders:</b> Configurable email and SMS reminders sent at predefined intervals before court dates and deadlines (7 days, 3 days, 1 day, and 1 hour before). Reminders include case reference and preparation checklist.',
    '<b>Cross-Office Visibility:</b> Unified calendar showing events across all three offices, enabling management to identify scheduling conflicts and balance court appearance loads.',
    '<b>Recurring Event Support:</b> Support for recurring court dates, periodic review hearings, and standing client meetings, with automatic scheduling and reminder generation.',
    '<b>Event Detail Cards:</b> Detailed event cards showing case reference, court location, hearing type, assigned lawyer, and required documents, accessible directly from calendar entries.',
]
for f in calendar_features:
    story.append(bullet(f))

story.append(h2('5.5 Document Management'))

story.append(body(
    'The document management module replaces paper filing systems with a secure digital repository for all legal '
    'documents, correspondence, and forms. It provides version control, full-text search, and organised categorisation '
    'that makes any document retrievable within seconds rather than the hours or days required for physical file searches.'
))

doc_features = [
    '<b>Digital Form Templates:</b> Pre-configured templates for all NLACW forms including client intake forms, case assessment forms, consent forms, and court application templates, eliminating the need for paper forms entirely.',
    '<b>Document Upload and Categorisation:</b> Drag-and-drop document upload with automatic categorisation by type (Affidavit, Court Order, Correspondence, Contract, Medical Report, Police Report) and association with the relevant case.',
    '<b>Version Control:</b> Automatic version tracking for all documents, ensuring that users always access the latest version while maintaining a complete history of revisions. Any previous version can be retrieved if needed.',
    '<b>Full-Text Search:</b> Elasticsearch-powered search across all document content, enabling staff to find specific documents using keywords, case references, or client names instantly.',
    '<b>Access Logging:</b> Every document access, download, and modification is logged in the audit trail, ensuring complete accountability for sensitive legal documents.',
]
for f in doc_features:
    story.append(bullet(f))

story.append(h2('5.6 Task Management'))

story.append(body(
    'The task management module provides structured tracking of all case-related tasks, ensuring that critical '
    'follow-ups are never missed and that workload is distributed efficiently across the team. It replaces informal '
    'verbal task assignments and physical notes with a transparent, accountable system.'
))

task_features = [
    '<b>Kanban Board View:</b> Visual Kanban board with three columns (To Do, In Progress, Done) providing an at-a-glance overview of all active tasks and their progress status.',
    '<b>Task Assignment and Delegation:</b> Direct task assignment to lawyers, paralegals, and interns with automatic notification. Tasks can be linked to specific cases and include due dates, priority levels, and detailed descriptions.',
    '<b>Overdue Indicators:</b> Automatic colour-coded overdue indicators (red for overdue, amber for due today, green for on schedule) ensuring that no task falls through the cracks.',
    '<b>Priority Management:</b> Four-tier priority classification with automatic sorting and filtering, ensuring that urgent tasks are always visible and addressed first.',
    '<b>Completion Tracking:</b> Task completion metrics per user, enabling supervisors to assess workload balance and individual productivity.',
]
for f in task_features:
    story.append(bullet(f))

story.append(h2('5.7 Reporting and Analytics'))

story.append(body(
    'The reporting module transforms NLACW\'s data into actionable insights, replacing quarterly manual report '
    'compilation with real-time, on-demand analytics. Reports can be generated for any time period and filtered '
    'by case type, office, lawyer, or outcome, supporting both internal management decisions and donor reporting '
    'requirements.'
))

report_features = [
    '<b>Case Outcome Analysis:</b> Detailed analysis of case outcomes by type, office, and lawyer, including success rates, average case duration, and resolution patterns. Supports NLACW\'s programme evaluation and impact measurement.',
    '<b>Office Performance Comparison:</b> Side-by-side comparison of key metrics across the three offices, enabling management to identify best practices and areas needing additional resources.',
    '<b>Monthly and Quarterly Reports:</b> Pre-formatted monthly and quarterly reports with charts and tables, ready for submission to the Law Association of Zambia, donors, and the NLACW Board. Reports can be exported as PDF or Excel.',
    '<b>Donor-Specific Reporting:</b> Customisable report templates for different donors and stakeholders, with the ability to configure metrics, time periods, and presentation formats to match specific reporting requirements.',
    '<b>Export Capabilities:</b> All data and reports can be exported in PDF, Excel, and CSV formats for external analysis, archival, or submission.',
]
for f in report_features:
    story.append(bullet(f))

story.append(h2('5.8 User Administration and Role Management'))

story.append(body(
    'The user administration module provides centralised management of system access, ensuring that each staff member '
    'has appropriate permissions based on their role while maintaining strict security and audit controls. The system '
    'supports four predefined roles with customisable permissions.'
))

role_data = [
    [Paragraph('<b>Role</b>', style_table_header),
     Paragraph('<b>Access Level</b>', style_table_header),
     Paragraph('<b>Key Permissions</b>', style_table_header)],
    [Paragraph('Administrator', style_table_cell),
     Paragraph('Full System', style_table_cell),
     Paragraph('User management, system configuration, all data access, reporting, audit logs', style_table_cell)],
    [Paragraph('Lawyer', style_table_cell),
     Paragraph('Case Management', style_table_cell),
     Paragraph('Case creation, client records, document management, court dates, case notes', style_table_cell)],
    [Paragraph('Paralegal', style_table_cell),
     Paragraph('Limited Case', style_table_cell),
     Paragraph('Client intake, case viewing, document upload, task management', style_table_cell)],
    [Paragraph('Intern', style_table_cell),
     Paragraph('Restricted', style_table_cell),
     Paragraph('Case viewing (assigned), document viewing, task completion', style_table_cell)],
]
story.extend(make_table(role_data, [CONTENT_W * 0.18, CONTENT_W * 0.20, CONTENT_W * 0.57],
                        'Table 4: User Role Permissions Matrix'))


# ══════════════════════════════════════════════════════════
# SECTION 6: TECHNICAL APPROACH AND METHODOLOGY
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('6. Technical Approach and Methodology'))

story.append(h2('6.1 Development Methodology'))

story.append(body(
    'We will employ an Agile development methodology with two-week sprint cycles, ensuring continuous delivery of '
    'functional increments and regular stakeholder feedback. This approach is particularly suited to the NLACW '
    'project because it allows for iterative refinement based on user testing and evolving requirements, while '
    'maintaining predictable delivery timelines and budget control.'
))

story.append(body(
    'Each sprint begins with a planning session where priorities are reviewed with NLACW stakeholders, and ends '
    'with a demonstration of completed features for validation and feedback. A dedicated project manager serves '
    'as the primary point of contact, ensuring clear communication and prompt resolution of any issues. We use '
    'Jira for sprint tracking and Confluence for documentation, both accessible to NLACW for full project visibility.'
))

story.append(h2('6.2 Quality Assurance'))

story.append(body(
    'Quality assurance is embedded throughout the development lifecycle, not treated as a final-phase activity. '
    'Our QA process includes automated unit testing with a minimum 85% code coverage target, integration testing '
    'of all API endpoints, end-to-end testing of critical user workflows, and security testing including OWASP '
    'Top 10 vulnerability scanning. Each release candidate undergoes a formal acceptance testing phase with '
    'NLACW representatives before deployment.'
))

story.append(h2('6.3 Data Migration Strategy'))

story.append(body(
    'We recognise that NLACW has accumulated significant case data in paper format over more than three decades of '
    'operation. Our data migration strategy addresses this challenge through a structured approach: initial assessment '
    'of existing records to determine migration priority and data quality; design of migration templates that map '
    'paper form fields to digital system fields; phased migration starting with active cases, then recent closed '
    'cases, and finally historical archives; and quality verification of migrated data with NLACW staff validation. '
    'We estimate that the migration of all active and recent cases (approximately 2,000 records) can be completed '
    'within the project timeline, with historical archive migration available as an optional extension.'
))

story.append(h2('6.4 Offline and Low-Bandwidth Capability'))

story.append(body(
    'Understanding that internet connectivity can be unreliable in some areas where NLACW operates, we will '
    'implement Progressive Web Application (PWA) technology that enables core functionality to work offline. '
    'Lawyers conducting field visits in areas with limited connectivity can access previously loaded case files, '
    'create new case notes, and complete intake forms offline. Data automatically synchronises with the central '
    'server when connectivity is restored, with conflict resolution handling for any overlapping changes. '
    'The application is also optimised for low-bandwidth environments, with lazy loading of images, compressed '
    'data transfers, and minimal page sizes to ensure acceptable performance even on slow connections.'
))


# ══════════════════════════════════════════════════════════
# SECTION 7: IMPLEMENTATION TIMELINE
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('7. Implementation Timeline'))

story.append(body(
    'The project will be executed over a 24-week period, divided into four phases with clear milestones and '
    'deliverables. This timeline allows for thorough development, comprehensive testing, and structured training '
    'while delivering usable functionality at each phase milestone.'
))

timeline_data = [
    [Paragraph('<b>Phase</b>', style_table_header),
     Paragraph('<b>Duration</b>', style_table_header),
     Paragraph('<b>Deliverables</b>', style_table_header),
     Paragraph('<b>Weeks</b>', style_table_header)],
    [Paragraph('<b>Phase 1:</b> Discovery and Design', style_table_cell),
     Paragraph('4 weeks', style_table_cell_center),
     Paragraph('Requirements specification, UI/UX design, system architecture, data migration plan', style_table_cell),
     Paragraph('1-4', style_table_cell_center)],
    [Paragraph('<b>Phase 2:</b> Core Development', style_table_cell_center),
     Paragraph('8 weeks', style_table_cell_center),
     Paragraph('Dashboard, client management, case management, user administration, database, API layer', style_table_cell),
     Paragraph('5-12', style_table_cell_center)],
    [Paragraph('<b>Phase 3:</b> Extended Features', style_table_cell_center),
     Paragraph('6 weeks', style_table_cell_center),
     Paragraph('Calendar, document management, task management, reporting, notifications, offline mode', style_table_cell),
     Paragraph('13-18', style_table_cell_center)],
    [Paragraph('<b>Phase 4:</b> Testing and Deployment', style_table_cell_center),
     Paragraph('6 weeks', style_table_cell_center),
     Paragraph('UAT, data migration, training, production deployment, post-launch support', style_table_cell),
     Paragraph('19-24', style_table_cell_center)],
]
story.extend(make_table(timeline_data, [CONTENT_W * 0.22, CONTENT_W * 0.14, CONTENT_W * 0.48, CONTENT_W * 0.12],
                        'Table 5: Project Implementation Timeline'))

story.append(body(
    'Key milestones include: Requirements Sign-Off (Week 4), Core System Demonstration (Week 12), Full System '
    'Demonstration (Week 18), User Acceptance Testing Complete (Week 21), and Production Go-Live (Week 24). '
    'Each milestone includes a formal review with NLACW stakeholders and a go/no-go decision point.'
))


# ══════════════════════════════════════════════════════════
# SECTION 8: PRICING
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('8. Financial Proposal'))

story.append(body(
    'The following pricing reflects our commitment to delivering a world-class Case Management System at a fair '
    'and competitive investment level. All prices are quoted in Zambian Kwacha (ZMW) and are inclusive of VAT '
    'where applicable. The total project investment covers all development, deployment, training, and one year '
    'of post-launch support and maintenance.'
))

story.append(h2('8.1 Development Investment'))

pricing_data = [
    [Paragraph('<b>Phase</b>', style_table_header),
     Paragraph('<b>Description</b>', style_table_header),
     Paragraph('<b>Amount (ZMW)</b>', style_table_header)],
    [Paragraph('Phase 1', style_table_cell),
     Paragraph('Discovery, Requirements, and Design', style_table_cell),
     Paragraph('K185,000', style_table_cell_right)],
    [Paragraph('Phase 2', style_table_cell),
     Paragraph('Core System Development (Dashboard, Client Management, Case Management, User Admin)', style_table_cell),
     Paragraph('K540,000', style_table_cell_right)],
    [Paragraph('Phase 3', style_table_cell),
     Paragraph('Extended Features (Calendar, Documents, Tasks, Reports, Notifications, Offline)', style_table_cell),
     Paragraph('K380,000', style_table_cell_right)],
    [Paragraph('Phase 4', style_table_cell),
     Paragraph('Testing, Data Migration, Training, and Deployment', style_table_cell),
     Paragraph('K220,000', style_table_cell_right)],
    [Paragraph('Infrastructure Setup', style_table_cell),
     Paragraph('AWS hosting setup, SSL certificates, domain configuration, CI/CD pipeline', style_table_cell),
     Paragraph('K60,000', style_table_cell_right)],
    [Paragraph('<b>Total Development</b>', style_table_cell),
     Paragraph('', style_table_cell),
     Paragraph('<b>K1,385,000</b>', style_table_cell_right)],
]
story.extend(make_table(pricing_data, [CONTENT_W * 0.18, CONTENT_W * 0.55, CONTENT_W * 0.22],
                        'Table 6: Development Investment Breakdown'))

story.append(h2('8.2 Annual Support and Maintenance'))

maint_data = [
    [Paragraph('<b>Service</b>', style_table_header),
     Paragraph('<b>Description</b>', style_table_header),
     Paragraph('<b>Annual Fee (ZMW)</b>', style_table_header)],
    [Paragraph('Standard Support', style_table_cell),
     Paragraph('Email and phone support during business hours (08:00-17:00 CAT), bug fixes, security patches, minor enhancements (up to 8 hours/month)', style_table_cell),
     Paragraph('K180,000', style_table_cell_right)],
    [Paragraph('Premium Support', style_table_cell),
     Paragraph('24/7 support, priority bug fixes, security patches, enhancements (up to 16 hours/month), dedicated support engineer', style_table_cell),
     Paragraph('K300,000', style_table_cell_right)],
    [Paragraph('AWS Hosting', style_table_cell),
     Paragraph('Cloud infrastructure, database hosting, file storage, CDN, automated backups, SSL certificates', style_table_cell),
     Paragraph('K120,000', style_table_cell_right)],
]
story.extend(make_table(maint_data, [CONTENT_W * 0.20, CONTENT_W * 0.53, CONTENT_W * 0.22],
                        'Table 7: Annual Support and Maintenance Options'))

story.append(h2('8.3 Total Project Investment'))

total_data = [
    [Paragraph('<b>Item</b>', style_table_header),
     Paragraph('<b>Amount (ZMW)</b>', style_table_header)],
    [Paragraph('System Development (Phases 1-4 + Infrastructure)', style_table_cell),
     Paragraph('K1,385,000', style_table_cell_right)],
    [Paragraph('Year 1 Support and Maintenance (Standard)', style_table_cell),
     Paragraph('K180,000', style_table_cell_right)],
    [Paragraph('Year 1 AWS Hosting', style_table_cell),
     Paragraph('K120,000', style_table_cell_right)],
    [Paragraph('<b>Total Project Investment</b>', style_table_cell),
     Paragraph('<b>K1,685,000</b>', style_table_cell_right)],
]
story.extend(make_table(total_data, [CONTENT_W * 0.65, CONTENT_W * 0.30],
                        'Table 8: Total Project Investment Summary'))

story.append(body(
    'The first year of standard support and AWS hosting is included in the total project investment of '
    '<b>K1,685,000</b>. Subsequent annual costs for support and hosting are K300,000 (Standard Support + Hosting) '
    'or K420,000 (Premium Support + Hosting). Payment terms: 30% upon contract signing, 25% at Phase 2 milestone, '
    '25% at Phase 4 milestone, and 20% upon production go-live acceptance.'
))


# ══════════════════════════════════════════════════════════
# SECTION 9: TEAM COMPOSITION
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('9. Team Composition'))

story.append(body(
    'Our project team has been carefully assembled to ensure that every aspect of the system, from technical '
    'architecture to user experience to legal domain understanding, is addressed by qualified professionals. '
    'The team will be dedicated to the NLACW project for the duration of the engagement.'
))

team_data = [
    [Paragraph('<b>Role</b>', style_table_header),
     Paragraph('<b>Name</b>', style_table_header),
     Paragraph('<b>Qualifications</b>', style_table_header),
     Paragraph('<b>Experience</b>', style_table_header)],
    [Paragraph('Project Manager', style_table_cell),
     Paragraph('Chanda Mwamba', style_table_cell),
     Paragraph('MSc Project Management, PMP Certified', style_table_cell),
     Paragraph('8 years in IT project management', style_table_cell)],
    [Paragraph('Lead Developer', style_table_cell),
     Paragraph('Mwape Mulenga', style_table_cell),
     Paragraph('MSc Computer Science, AWS Certified', style_table_cell),
     Paragraph('10 years full-stack development', style_table_cell)],
    [Paragraph('Frontend Developer', style_table_cell),
     Paragraph('Natasha Phiri', style_table_cell),
     Paragraph('BSc Computer Science, React Certified', style_table_cell),
     Paragraph('6 years frontend development', style_table_cell)],
    [Paragraph('Backend Developer', style_table_cell),
     Paragraph('Bwalya Kasonde', style_table_cell),
     Paragraph('BSc Software Engineering', style_table_cell),
     Paragraph('7 years backend development', style_table_cell)],
    [Paragraph('UX Designer', style_table_cell),
     Paragraph('Linda Sichone', style_table_cell),
     Paragraph('MA Interaction Design', style_table_cell),
     Paragraph('5 years UX design for NGOs', style_table_cell)],
    [Paragraph('QA Engineer', style_table_cell),
     Paragraph('Grace Tembo', style_table_cell),
     Paragraph('BSc Information Systems, ISTQB Certified', style_table_cell),
     Paragraph('6 years software QA', style_table_cell)],
    [Paragraph('Security Specialist', style_table_cell),
     Paragraph('Joseph Banda', style_table_cell),
     Paragraph('CISSP, CEH Certified', style_table_cell),
     Paragraph('9 years cybersecurity', style_table_cell)],
    [Paragraph('Legal Domain Advisor', style_table_cell),
     Paragraph('Adv. Mapenzi Chisenga', style_table_cell),
     Paragraph('LLB, LLM (Human Rights Law)', style_table_cell),
     Paragraph('12 years legal aid practice', style_table_cell)],
]
story.extend(make_table(team_data, [CONTENT_W * 0.18, CONTENT_W * 0.22, CONTENT_W * 0.30, CONTENT_W * 0.25],
                        'Table 9: Project Team Composition'))


# ══════════════════════════════════════════════════════════
# SECTION 10: TRAINING AND CHANGE MANAGEMENT
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('10. Training and Change Management'))

story.append(body(
    'We understand that the success of the Case Management System depends not just on the technology itself, but on '
    'the willingness and ability of NLACW staff to adopt and effectively use the new system. Our training and change '
    'management programme is designed to ensure a smooth transition from paper-based processes to digital case management, '
    'with particular attention to staff members who may have limited experience with technology.'
))

story.append(h2('10.1 Training Programme'))

training_data = [
    [Paragraph('<b>Training Session</b>', style_table_header),
     Paragraph('<b>Audience</b>', style_table_header),
     Paragraph('<b>Duration</b>', style_table_header),
     Paragraph('<b>Format</b>', style_table_header)],
    [Paragraph('System Overview and Navigation', style_table_cell),
     Paragraph('All staff', style_table_cell),
     Paragraph('2 hours', style_table_cell_center),
     Paragraph('In-person workshop', style_table_cell)],
    [Paragraph('Case Management Fundamentals', style_table_cell),
     Paragraph('Lawyers, Paralegals', style_table_cell),
     Paragraph('4 hours', style_table_cell_center),
     Paragraph('Hands-on lab', style_table_cell)],
    [Paragraph('Client Intake and Document Management', style_table_cell),
     Paragraph('Paralegals, Interns', style_table_cell),
     Paragraph('3 hours', style_table_cell_center),
     Paragraph('Hands-on lab', style_table_cell)],
    [Paragraph('Reporting and Analytics', style_table_cell),
     Paragraph('Management, Lawyers', style_table_cell),
     Paragraph('2 hours', style_table_cell_center),
     Paragraph('Workshop', style_table_cell)],
    [Paragraph('System Administration', style_table_cell),
     Paragraph('Administrators', style_table_cell),
     Paragraph('4 hours', style_table_cell_center),
     Paragraph('Technical workshop', style_table_cell)],
    [Paragraph('Field Operations (Offline Mode)', style_table_cell),
     Paragraph('Field workers', style_table_cell),
     Paragraph('2 hours', style_table_cell_center),
     Paragraph('Practical field exercise', style_table_cell)],
]
story.extend(make_table(training_data, [CONTENT_W * 0.30, CONTENT_W * 0.22, CONTENT_W * 0.15, CONTENT_W * 0.28],
                        'Table 10: Training Programme Schedule'))

story.append(body(
    'Training will be conducted at all three NLACW offices (Lusaka, Ndola, and Livingstone) during the deployment '
    'phase. All training materials, including user guides, video tutorials, and quick reference cards, will be '
    'provided in both digital and printed formats. We also provide 90 days of post-launch support with a dedicated '
    'helpdesk for user questions and issues.'
))

story.append(h2('10.2 Change Management'))

story.append(body(
    'Our change management approach recognises that transitioning from paper to digital systems represents a '
    'significant cultural shift for any organisation. We will work closely with NLACW leadership to identify and '
    'address potential resistance points, establish system champions within each office who can provide peer support, '
    'and implement a phased rollout that allows staff to gradually build confidence with the new system. We recommend '
    'a parallel run period of two weeks during which both the paper system and the digital system operate simultaneously, '
    'providing a safety net while staff become familiar with the new workflows.'
))


# ══════════════════════════════════════════════════════════
# SECTION 11: SUSTAINABILITY AND SUPPORT
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('11. Sustainability and Long-Term Support'))

story.append(body(
    'We are committed to ensuring that the Case Management System remains a sustainable, valuable asset for NLACW '
    'well beyond the initial development period. Our sustainability approach addresses three critical dimensions: '
    'technical sustainability through code quality and documentation, operational sustainability through training and '
    'knowledge transfer, and financial sustainability through transparent, predictable ongoing costs.'
))

story.append(h2('11.1 Knowledge Transfer'))

story.append(body(
    'Throughout the project, we will conduct structured knowledge transfer sessions to ensure that NLACW\'s own '
    'technical staff (or designated support personnel) understand the system architecture, configuration options, '
    'and common troubleshooting procedures. We will provide comprehensive technical documentation including system '
    'architecture diagrams, API documentation, database schemas, deployment procedures, and disaster recovery plans. '
    'This documentation enables NLACW to engage alternative support providers in the future if desired, ensuring '
    'vendor independence.'
))

story.append(h2('11.2 Service Level Agreement'))

story.append(body(
    'Our standard support SLA guarantees the following response times: Critical issues (system down, data breach) '
    'receive a response within 2 hours during business hours and 4 hours outside business hours; High-priority '
    'issues (feature broken for multiple users) receive a response within 4 business hours; Medium-priority issues '
    '(feature broken for single user) receive a response within 8 business hours; and Low-priority issues (cosmetic '
    'or enhancement requests) receive a response within 24 business hours.'
))

story.append(h2('11.3 System Updates and Enhancements'))

story.append(body(
    'The system is designed for extensibility, and we provide regular updates including security patches, bug fixes, '
    'and performance improvements as part of the standard support package. Major feature enhancements beyond the '
    'scope of the original specification can be quoted separately on a time-and-materials basis at a rate of '
    'K1,500 per developer hour. We also offer an optional annual enhancement budget of K200,000 that provides '
    'a dedicated allocation for new features and improvements based on NLACW\'s evolving needs.'
))


# ══════════════════════════════════════════════════════════
# SECTION 12: WHY CHOOSE LEXTECH
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('12. Why Choose LexTech Solutions'))

story.append(body(
    'Selecting the right technology partner for this critical project is a decision that will impact NLACW\'s '
    'operations for years to come. We believe that LexTech Solutions Zambia Ltd. is uniquely positioned to deliver '
    'exceptional value for the following reasons:'
))

reasons = [
    '<b>Zambian Legal Sector Expertise:</b> We have delivered case management and legal technology solutions for the Legal Aid Board of Zambia, FIDA-Zambia, and the Human Rights Commission. We understand the Zambian legal framework, court procedures, and the specific challenges of providing legal aid to marginalised communities in this context.',
    '<b>Proven Track Record:</b> Our portfolio includes five successfully deployed systems for legal and social services organisations in Zambia, with a 100% on-time delivery record and an average client satisfaction rating of 4.8 out of 5.0.',
    '<b>User-Centred Design Philosophy:</b> We design systems for real users, not just technical specifications. Our UX design process includes user research, persona development, and iterative testing with actual NLACW staff to ensure the system is intuitive and efficient for all users, regardless of their technical proficiency.',
    '<b>Data Protection Compliance:</b> Our security architecture is designed to comply with the Data Protection Act No. 3 of 2021, and our team includes a CISSP-certified security specialist who ensures that client data protection is built into every layer of the system.',
    '<b>Local Support and Presence:</b> As a Lusaka-based company, we provide on-the-ground support with rapid response times. Our team can visit NLACW offices in person for critical issues, training sessions, and system demonstrations, eliminating the communication barriers and time zone challenges of working with international vendors.',
    '<b>Sustainable and Transparent Pricing:</b> Our pricing is straightforward, with no hidden costs or surprise charges. We provide clear breakdowns of development, hosting, and support costs, enabling NLACW to budget accurately for both the initial investment and ongoing operational expenses.',
]
for r in reasons:
    story.append(bullet(r))


# ══════════════════════════════════════════════════════════
# SECTION 13: TERMS AND CONDITIONS
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('13. Terms and Conditions'))

story.append(h2('13.1 Validity'))

story.append(body(
    'This Expression of Interest is valid for a period of 90 days from the date of submission. Should NLACW '
    'require an extension of this validity period, we are open to discussing such extensions upon request.'
))

story.append(h2('13.2 Payment Terms'))

story.append(body(
    'Payment shall be made in Zambian Kwacha (ZMW) according to the following schedule: 30% upon contract signing '
    'and commencement of Phase 1; 25% upon completion of Phase 2 and acceptance of the core system demonstration; '
    '25% upon completion of Phase 3 and acceptance of the full system demonstration; and 20% upon successful '
    'completion of User Acceptance Testing and production go-live acceptance. Annual support and hosting fees '
    'are invoiced annually in advance.'
))

story.append(h2('13.3 Intellectual Property'))

story.append(body(
    'Upon full payment, all intellectual property rights in the custom-developed software, including source code, '
    'documentation, and design assets, shall be transferred to NLACW. LexTech retains the right to use generic, '
    'non-NLACW-specific components and frameworks as part of its standard toolkit for future projects. Third-party '
    'software and libraries used in the system are subject to their respective open-source or commercial licences.'
))

story.append(h2('13.4 Confidentiality'))

story.append(body(
    'LexTech Solutions acknowledges that all information provided by NLACW in connection with this project, '
    'including client data, case records, organisational processes, and financial information, is strictly '
    'confidential. All LexTech personnel involved in the project are bound by non-disclosure agreements, and '
    'all project data is stored in encrypted, access-controlled environments. We will comply fully with the Data '
    'Protection Act No. 3 of 2021 and any additional confidentiality requirements specified by NLACW.'
))

story.append(h2('13.5 Warranties'))

story.append(body(
    'LexTech warrants that the system will substantially conform to the agreed specifications for a period of '
    '12 months following production go-live. During this warranty period, any defects or non-conformities will '
    'be remedied at no additional cost. The warranty does not cover issues arising from modifications made by '
    'third parties, misuse of the system, or changes to the underlying technology platform beyond our control.'
))


# ══════════════════════════════════════════════════════════
# SECTION 14: CONTACT INFORMATION
# ══════════════════════════════════════════════════════════

story.extend(add_major_section('14. Contact Information'))

story.append(body(
    'For any inquiries, clarifications, or further discussions regarding this Expression of Interest, please '
    'contact the undersigned:'
))

story.append(Spacer(1, 12))

contact_info = [
    [Paragraph('<b>Contact</b>', style_table_header),
     Paragraph('<b>Details</b>', style_table_header)],
    [Paragraph('Company', style_table_cell),
     Paragraph('LexTech Solutions Zambia Ltd.', style_table_cell)],
    [Paragraph('Address', style_table_cell),
     Paragraph('Plot 23, Thabo Mbeki Road, Lusaka, Zambia', style_table_cell)],
    [Paragraph('Primary Contact', style_table_cell),
     Paragraph('Chanda Mwamba, Project Director', style_table_cell)],
    [Paragraph('Email', style_table_cell),
     Paragraph('chanda.mwamba@lextech.co.zm', style_table_cell)],
    [Paragraph('Phone', style_table_cell),
     Paragraph('+260 211 890 234', style_table_cell)],
    [Paragraph('Mobile', style_table_cell),
     Paragraph('+260 97 789 0456', style_table_cell)],
    [Paragraph('Website', style_table_cell),
     Paragraph('www.lextech.co.zm', style_table_cell)],
]
story.extend(make_table(contact_info, [CONTENT_W * 0.25, CONTENT_W * 0.65]))

story.append(Spacer(1, 40))
story.append(HRFlowable(width="40%", thickness=1, color=TEXT_MUTED, spaceAfter=10, spaceBefore=10, hAlign='LEFT'))
story.append(Paragraph('Chanda Mwamba', ParagraphStyle(
    name='Signature', fontName='LiberationSerif', fontSize=12, leading=16,
    textColor=TEXT_PRIMARY, alignment=TA_LEFT,
)))
story.append(Paragraph('Project Director, LexTech Solutions Zambia Ltd.', style_body))
story.append(Paragraph('Date: 5 June 2026', style_body))


# ══════════════════════════════════════════════════════════
# BUILD PDF
# ══════════════════════════════════════════════════════════

doc.multiBuild(story)

print(f"Body PDF generated: {BODY_PDF}")
