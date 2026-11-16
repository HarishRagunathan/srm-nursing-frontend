import {
  FaHeartbeat,
  FaUserMd,
  FaUsers,
  FaBaby,
  FaBrain,
  FaFemale,
  FaFlask,
  FaStethoscope,
  FaHospital,
  FaHandHoldingHeart,
  FaSchool,
  FaAmbulance,
  FaSyringe,
  FaChild,
  FaSmile,
  FaAppleAlt,
  FaCommentMedical,
  FaHeadSideVirus,
  FaCalendarAlt,
  FaBabyCarriage,
  FaShieldAlt,
  FaArrowRight,
  FaUniversity,
  FaCheckCircle,
} from 'react-icons/fa';

export const ICON_MAP = {
  FaHeartbeat,
  FaUserMd,
  FaUsers,
  FaBaby,
  FaBrain,
  FaFemale,
  FaFlask,
  FaStethoscope,
  FaHospital,
  FaHandHoldingHeart,
  FaSchool,
  FaAmbulance,
  FaSyringe,
  FaChild,
  FaSmile,
  FaAppleAlt,
  FaCommentMedical,
  FaHeadSideVirus,
  FaCalendarAlt,
  FaBabyCarriage,
  FaShieldAlt,
  FaArrowRight,
  FaUniversity,
  FaCheckCircle,
};

export const getDepartmentIcon = (iconName, fallback = FaUniversity) => {
  if (!iconName) return fallback;
  if (typeof iconName !== 'string') return iconName;
  return ICON_MAP[iconName] || fallback;
};

