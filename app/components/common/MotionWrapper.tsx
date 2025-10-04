"use client"
import dynamic from 'next/dynamic';
import React from 'react';



export const MotionH2 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h2 })), {
  ssr: false,
  loading: ({ className, children, ...props }: any) => <h2 className={className} {...props}>{children}</h2>
});

export const MotionH3 = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.h3 })), {
  ssr: false,
  loading: ({ className, children, ...props }: any) => <h3 className={className} {...props}>{children}</h3>
});

export const MotionP = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.p })), {
  ssr: false,
  loading: ({ className, children, ...props }: any) => <p className={className} {...props}>{children}</p>
});

export const MotionA = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.a })), {
  ssr: false,
  loading: ({ className, children, ...props }: any) => <a className={className} {...props}>{children}</a>
});

export const MotionButton = dynamic(
  () => import('framer-motion').then(mod => ({ default: mod.motion.button })),
  {
    ssr: false,
    loading: ({ className, children, onClick, ...props }: any) => {
      const { 
        isLoading, 
        whileHover, 
        whileTap, 
        initial, 
        animate,
        transition,
        variants,
        ...domProps 
      } = props;
      
      return (
        <button 
          className={className} 
          onClick={onClick}
          {...domProps}
        >
          {children}
        </button>
      );
    }
  }
);

export const MotionSpan = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.span })), {
  ssr: false,
  loading: ({ className, children, ...props }: any) => <span className={className} {...props}>{children}</span>
});

export const MotionImg = dynamic(() => import('framer-motion').then(mod => ({ default: mod.motion.img })), {
  ssr: false,
  loading: ({ className, src, alt, ...props }: any) => <img className={className} src={src} alt={alt} {...props} />
});

export const AnimatePresence = dynamic(() => import('framer-motion').then(mod => ({ default: mod.AnimatePresence })), {
  ssr: false,
  loading: ({ children }: any) => <>{children}</>
}); 




export const MotionDiv = dynamic(
  () => import("framer-motion").then(mod => ({ default: mod.motion.div })),
  {
    ssr: false,
    loading: ({ className, children, ...props }: any) => (
      <div className={className} {...filterMotionProps(props)}>
        {children}
      </div>
    )
  }
);


function filterDOMProps(props: Record<string, any>) {
  const invalidProps = ["isLoading", "pastDelay", "delay", "ssr"];
  const rest: Record<string, any> = {};
  for (const key in props) {
    if (!invalidProps.includes(key)) {
      rest[key] = props[key];
    }
  }
  return rest;
}


// helper lọc prop không hợp lệ cho motion
function filterMotionProps(props: Record<string, any>) {
  const motionProps = [
    "initial", "animate", "exit", "whileHover", "whileTap",
    "transition", "variants", "drag",
    "isLoading", "pastDelay", "delay", "ssr"
  ];
  const safeProps: Record<string, any> = {};
  for (const key in props) {
    if (!motionProps.includes(key)) {
      safeProps[key] = props[key];
    }
  }
  return safeProps;
}

