import { Award, FileText, Shield } from 'lucide-react';

interface CertificateIconProps {
  type: 'certificate' | 'license' | 'award';
  issuer?: string; // optional for AWS logo check
  size?: number;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'certificate':
      return FileText;
    case 'license':
      return Shield;
    case 'award':
      return Award;
    default:
      return FileText;
  }
};

const CertificateIcon = ({ type, issuer, size = 24 }: CertificateIconProps) => {
  if (issuer === 'Amazon Web Services') {
    return (
      <img
        src="/amazon-logo.png" // make sure this file exists in public folder
        alt="Amazon Logo"
        width={size}
        height={size}
        className="rounded-full object-contain"
      />
    );
  }

  const IconComponent = getIcon(type);
  return <IconComponent size={size} />;
};

export default CertificateIcon;
