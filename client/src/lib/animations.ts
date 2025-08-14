export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleOnHover = {
  whileHover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  },
  whileTap: { scale: 0.95 }
};

export const glowEffect = {
  initial: { boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" },
  animate: { boxShadow: "0 0 40px rgba(59, 130, 246, 0.8)" },
  transition: { 
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse" as const
  }
};

export const float = {
  animate: {
    y: [-10, 10, -10],
    rotateY: [0, 5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const slideInFromLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};

export const slideInFromRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8 }
};
