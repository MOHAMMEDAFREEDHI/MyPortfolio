import { CertificateItem } from '@/components/CertificateCard';

export const certificates: CertificateItem[] = [
  {
    id: 1,
    title: "Devops On Aws: Code, Build, And Test",
    issuer: "Amazon Web Services (AWS)",
    date: "March 2025",
    credentialId: "AWS-DEVOPS-UFBECZ",
    verificationUrl: "https://www.coursera.org/account/accomplishments/records/UFBECBZWQ6A7",
    type: "certificate",
    description: "Completed an AWS Coursera specialization focusing on DevOps best practices including CI/CD pipelines, infrastructure automation, and testing on AWS services.",
    iconType: "aws"
  },
{
  id: 2,
  title: "The Complete Full-Stack Web Development Bootcamp",
  issuer: "Udemy",
  date: "2024",
  credentialId: "UDEMY-FSWD-4676D3",
  verificationUrl: "https://www.udemy.com/certificate/UC-4676d363-b467-44ba-ac84-258b686ba87f/",
  type: "certificate",
  description: "Completed a comprehensive Udemy bootcamp covering HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, and REST APIs for full-stack web development."
},

{
  id: 3,
  title: "Crash Course on Python",
  issuer: "Google",
  date: "2025",
  credentialId: "GOOG-CCP-8ZVO9MPHGCZ5H", 
  verificationUrl: "https://www.coursera.org/account/accomplishments/verify/ZVO9MPHGCZ5H",
  type: "license", 
  description: "Fundamentals of Python programming including data structures, algorithms, and OOPS concepts with hands-on training from Google on Coursera."
},

{
  id: 4,
  title: "Postman API Fundamentals Student Expert",
  issuer: "Postman",
  date: "March 2025",
  credentialId: "POSTMAN-AFSE-67DFD4A6A0C651403CAD5629",
  verificationUrl: "https://badgr.com/backpack/badges/67dfd4a6a0c651403cad5629",
  type: "certificate",
  description: "Hands-on certification covering API testing, automation, and managing collections with Postman."
},


  {
    id: 5,
    title: "Best Innovation Award",
    issuer: "Tech Innovators Conference",
    date: "2023",
    type: "award",
    description: "Recognition for outstanding innovation in 3D web applications"
  },
  {
    id: 6,
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "2022",
    verificationUrl: "#",
    type: "certificate",
    description: "Comprehensive certification covering advanced JavaScript concepts and algorithms"
  }
];
