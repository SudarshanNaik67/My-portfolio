import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { profile } from "../data/profile";
import Section from "./Section";

const preview = `${process.env.PUBLIC_URL}/resume-page.jpg`;
const fileName = "Sudarshan_Naik_Resume.pdf";

export default function Resume() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <Section id="resume" kicker="RESUME" title="Preview, view, or download">
      <div className="resume-grid">
        <button type="button" className="rpreview" onClick={() => setOpen(true)} aria-label="Open resume">
          <img src={preview} alt="First page of the resume" />
          <span className="fade" />
          <span className="chip">PDF, 1 page. Tap to open</span>
        </button>
        <div className="rtext">
          <p>One page covering education, projects, certifications and experience. Open it here or save a copy.</p>
          <div className="btnrow">
            <button type="button" className="btn" onClick={() => setOpen(true)}>View Resume</button>
            <a className="btn" href={profile.resume} download={fileName}>Download PDF</a>
          </div>
        </div>
      </div>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="modal open"
              role="dialog"
              aria-modal="true"
              aria-label="Resume"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget || (e.target as HTMLElement).className === "mscroll") setOpen(false);
              }}
            >
              <div className="mbar">
                <div className="mono">RESUME</div>
                <div>
                  <a className="btn sm" href={profile.resume} download={fileName}>Download PDF</a>
                  <button type="button" className="btn sm" onClick={() => setOpen(false)}>Close</button>
                </div>
              </div>
              <div className="mscroll">
                <img src={preview} alt="Full resume" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Section>
  );
}
