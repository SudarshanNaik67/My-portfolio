import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  id?: string;
  className?: string;
  kicker: string;
  title: string;
  children: ReactNode;
}

/** A page section with a small label and title that fades in when scrolled into view. */
export default function Section({ id, className, kicker, title, children }: Props) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="kicker">{kicker}</div>
      <h2 className="title">{title}</h2>
      {children}
    </motion.section>
  );
}
