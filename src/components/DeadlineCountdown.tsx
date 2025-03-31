import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Ivy League application deadlines for the upcoming cycle
// These are typical deadlines but should be updated with the actual dates each year
const applicationDeadlines = [
  {
    university: 'Harvard University',
    regularDecision: '2026-01-01', // January 1, 2026
    earlyAction: '2025-11-01',     // November 1, 2025
    type: 'Restrictive Early Action'
  },
  {
    university: 'Yale University',
    regularDecision: '2026-01-02', // January 2, 2026
    earlyAction: '2025-11-01',     // November 1, 2025
    type: 'Single-Choice Early Action'
  },
  {
    university: 'Princeton University',
    regularDecision: '2026-01-01', // January 1, 2026
    earlyAction: '2025-11-01',     // November 1, 2025
    type: 'Single-Choice Early Action'
  },
  {
    university: 'Columbia University',
    regularDecision: '2026-01-01', // January 1, 2026
    earlyDecision: '2025-11-01',   // November 1, 2025
    type: 'Early Decision'
  },
  {
    university: 'Brown University',
    regularDecision: '2026-01-05', // January 5, 2026
    earlyDecision: '2025-11-01',   // November 1, 2025
    type: 'Early Decision'
  },
  {
    university: 'Dartmouth College',
    regularDecision: '2026-01-03', // January 3, 2026
    earlyDecision: '2025-11-01',   // November 1, 2025
    type: 'Early Decision'
  },
  {
    university: 'University of Pennsylvania',
    regularDecision: '2026-01-05', // January 5, 2026
    earlyDecision: '2025-11-01',   // November 1, 2025
    type: 'Early Decision'
  },
  {
    university: 'Cornell University',
    regularDecision: '2026-01-02', // January 2, 2026
    earlyDecision: '2025-11-01',   // November 1, 2025
    type: 'Early Decision'
  }
];

// Find the next upcoming deadline
const getNextDeadline = () => {
  const today = new Date();
  
  // Sort all deadlines (both early and regular) by date
  const allDeadlines = applicationDeadlines.flatMap(school => {
    const deadlines = [];
    
    if (school.earlyAction) {
      deadlines.push({
        university: school.university,
        date: new Date(school.earlyAction),
        type: school.type,
        isEarly: true
      });
    }
    
    if (school.earlyDecision) {
      deadlines.push({
        university: school.university,
        date: new Date(school.earlyDecision),
        type: 'Early Decision',
        isEarly: true
      });
    }
    
    deadlines.push({
      university: school.university,
      date: new Date(school.regularDecision),
      type: 'Regular Decision',
      isEarly: false
    });
    
    return deadlines;
  });
  
  // Find the next upcoming deadline
  const futureDeadlines = allDeadlines
    .filter(deadline => deadline.date > today)
    .sort((a, b) => a.date.getTime() - b.date.getTime());
  
  return futureDeadlines[0] || null;
};

// Calculate time remaining until a deadline
const calculateTimeRemaining = (deadlineDate: Date) => {
  const now = new Date();
  const difference = deadlineDate.getTime() - now.getTime();
  
  // Calculate time units
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  
  return { days, hours, minutes, seconds, total: difference };
};

interface TimeUnit {
  value: number;
  label: string;
}

const DeadlineCountdown: React.FC = () => {
  const [nextDeadline, setNextDeadline] = useState(getNextDeadline());
  const [timeRemaining, setTimeRemaining] = useState<{ days: number; hours: number; minutes: number; seconds: number; total: number }>({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
  const [isUrgent, setIsUrgent] = useState(false);
  
  useEffect(() => {
    // Set initial next deadline
    const deadline = getNextDeadline();
    setNextDeadline(deadline);
    
    if (deadline) {
      const remaining = calculateTimeRemaining(deadline.date);
      setTimeRemaining(remaining);
      
      // Set urgent flag if less than 7 days remaining
      setIsUrgent(remaining.days < 7);
    }
    
    // Update countdown every second
    const timer = setInterval(() => {
      if (deadline) {
        const remaining = calculateTimeRemaining(deadline.date);
        setTimeRemaining(remaining);
        
        // Set urgent flag if less than 7 days remaining
        setIsUrgent(remaining.days < 7);
        
        // If deadline has passed, find the next one
        if (remaining.total <= 0) {
          const newDeadline = getNextDeadline();
          setNextDeadline(newDeadline);
        }
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (!nextDeadline) {
    return null;
  }
  
  const timeUnits: TimeUnit[] = [
    { value: timeRemaining.days, label: 'Days' },
    { value: timeRemaining.hours, label: 'Hours' },
    { value: timeRemaining.minutes, label: 'Minutes' },
    { value: timeRemaining.seconds, label: 'Seconds' }
  ];
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <motion.div 
      className={`w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden ${isUrgent ? 'bg-red-900/90' : 'bg-ivy-navy/90'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="p-6 md:p-8"
        animate={{ 
          backgroundColor: isUrgent 
            ? ['rgba(127, 29, 29, 0.9)', 'rgba(153, 27, 27, 0.9)', 'rgba(127, 29, 29, 0.9)'] 
            : undefined 
        }}
        transition={{ duration: 2, repeat: isUrgent ? Infinity : 0 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div>
            <motion.h3 
              className="text-ivy-gold text-xl md:text-2xl font-serif font-bold mb-2"
              animate={{ scale: isUrgent ? [1, 1.03, 1] : 1 }}
              transition={{ duration: 1.5, repeat: isUrgent ? Infinity : 0 }}
            >
              {nextDeadline.university} - {nextDeadline.type}
            </motion.h3>
            <p className="text-white/90 text-sm md:text-base">
              Application Deadline: <span className="font-semibold">{formatDate(nextDeadline.date)}</span>
            </p>
          </div>
          
          <motion.div 
            className={`mt-4 md:mt-0 px-4 py-2 rounded-full ${isUrgent ? 'bg-red-700' : 'bg-ivy-gold/20'} text-white text-sm font-medium`}
            animate={{ 
              scale: isUrgent ? [1, 1.05, 1] : 1,
              opacity: isUrgent ? [0.8, 1, 0.8] : 1
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {isUrgent ? 'DEADLINE APPROACHING' : 'UPCOMING DEADLINE'}
          </motion.div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {timeUnits.map((unit, index) => (
            <motion.div 
              key={unit.label}
              className={`flex flex-col items-center justify-center p-3 md:p-4 rounded-lg ${isUrgent ? 'bg-red-800/80' : 'bg-ivy-navy/80'} border ${isUrgent ? 'border-red-500/30' : 'border-ivy-gold/30'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: isUrgent && unit.label === 'Days' ? [0, -4, 0] : 0
              }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.4,
                y: { repeat: isUrgent ? Infinity : 0, duration: 1.5 }
              }}
            >
              <motion.span 
                className={`text-2xl md:text-4xl font-bold ${isUrgent ? 'text-red-200' : 'text-ivy-gold'}`}
                key={unit.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {unit.value.toString().padStart(2, '0')}
              </motion.span>
              <span className="text-xs md:text-sm text-white/70 mt-1">{unit.label}</span>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-6 w-full bg-white/10 h-1.5 rounded-full overflow-hidden"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className={`h-full ${isUrgent ? 'bg-red-500' : 'bg-ivy-gold'} rounded-full`}
            animate={{ 
              width: isUrgent ? ['60%', '100%', '60%'] : '60%',
              x: isUrgent ? [0, 10, 0] : 0
            }}
            transition={{ 
              duration: 2, 
              repeat: isUrgent ? Infinity : 0,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white/80 text-sm mb-4 sm:mb-0">
            {isUrgent 
              ? "Don't miss this critical deadline! Contact us now for last-minute application assistance."
              : "Prepare your application with expert guidance from our admission consultants."}
          </p>
          
          <motion.button 
            className={`px-6 py-2 rounded-full ${isUrgent ? 'bg-red-600 hover:bg-red-500' : 'bg-ivy-gold hover:bg-ivy-gold/90'} text-white font-medium transition-colors`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
            transition={isUrgent ? { duration: 1.5, repeat: Infinity } : {}}
          >
            {isUrgent ? 'Get Emergency Help' : 'Schedule a Consultation'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeadlineCountdown;
