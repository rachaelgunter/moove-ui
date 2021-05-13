import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const businessVerticalValues = [
  'Automotive',
  'Insurance',
  'Govt/DOT',
  'Transport Logistics',
  'Academia',
];

const jobFunctionValues = [
  'Administration',
  'Advertising',
  'Chairman (Managing Board)',
  'Chairman (Supervisory or Board of Directors)',
  'Chief Executive Officer',
  'Chief Financial Officer',
  'Chief Operating Officer',
  'Chief Technology/Information Officer',
  'C-Level Management',
  'Company Secretary',
  'Corporate Communications',
  'Customer Service',
  'Engineering/Technical/Scientific',
  'Executive Vice President',
  'Facilities',
  'Finance',
  'General Manager',
  'Government and Public Affairs',
  'Healthcare and Medical Specialty',
  'Highest Level Management',
  'Human Resources',
  'Information Systems/Data Processing',
  'Insurance and Risk Management',
  'Legal',
  'Managing Director',
  'Manufacturing and Production',
  'Marketing',
  'Media',
  'Member of the Board (Supervisory or Directors)',
  'Member of the Management Board',
  'Operations',
  'Other',
  'Other Chief Officers',
  'Other Executive',
  'Owner',
  'President',
  'Purchasing and Procurement',
  'Quality',
  'Real Estate',
  'Regional / Division / Sector / Branch President',
  'Research & Development',
  'Sales',
  'Strategic Planning/Business Development',
  'Training and Education',
  'Transport and Logistics',
  'Treasurer / Controller / Comptroller',
];

const main = async () => {
  await prisma.businessVertical.createMany({
    data: businessVerticalValues.map((name) => ({ name })),
    skipDuplicates: true,
  });
  await prisma.jobFunction.createMany({
    data: jobFunctionValues.map((name) => ({ name })),
    skipDuplicates: true,
  });
  console.log('Seeding was successful');
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
