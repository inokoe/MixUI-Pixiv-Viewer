import { motion } from 'framer-motion';
import MyLink from './MyLink';
import SkeletonImage from '@/components/common/Image/SkeletonImage';

interface SideBarHeaderProps {
  open: boolean;
  label?: string;
  className?: string;
  to?: string;
  children?: React.ReactNode;
}

const SideBarHeader = ({ open }: SideBarHeaderProps) => {
  return (
    <MyLink
      to="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div className="h-6 w-6 rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0 overflow-hidden">
        <SkeletonImage src="data:SkeletonImage/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEUAlvoAk/oAkfoAkPoAlfput/uv1f3V6f7f7v7E4P2Sx/wsn/oAjvq/3f3////I4v6czPyLw/wlnfp7vPy32f1hsftNqvsAi/o+pPuBv/zs9v/k8f6izv0SmfpEpvuo0v31+v91cAv5AAAAzUlEQVR4AcTRRYIEMQgF0BAop3656/0vOU57r+fvyIvj/jnk+SskzyJMQRjFcZJmKo+U5UBRVmkCRDXdbShf1CgTEfsW6PzVuAeQDH+bDCEwipmfEJUo2Gqdsaidl2EZ1hukCujFds0rvUUZgdJbse18hwS010r8HTrD39xjB1T0BjUHNnmNvgcOdneYDCRfIe2AyMwQUdVvUgcFEKp7wKhc8J0zzPhGbFvleh+d+seGcolcnZOvPHc6W3D2Nv6IYxAEu+GTEtHngHL0AQCQbgvAuv+qdAAAAABJRU5ErkJggg==" />
      </div>

      {open && (
        <motion.span
          style={{
            transform: 'translateZ(0)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium text-black dark:text-white whitespace-pre"
        >
          Mui Pixiv Viewer
        </motion.span>
      )}
    </MyLink>
  );
};

export default SideBarHeader;
