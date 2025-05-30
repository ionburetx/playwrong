import { FC } from 'react';

interface SectionHeaderProps {
  text: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ text }) => {
  return (
    <h2 className="text-3xl font-bold mb-6 font-tilt-neon">
      {text}
    </h2>
  );
};

export default SectionHeader; 