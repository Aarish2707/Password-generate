import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import AnimatedBackground from "@/components/AnimatedBackground";
import PasswordGenerator from "@/components/PasswordGenerator";

const GeneratorPage = () => {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AnimatedBackground />

      <header className="relative z-10 py-6 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
          <Shield className="w-6 h-6 text-primary" />
          <span className="font-display font-bold text-lg text-foreground">SecureGen</span>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-start pt-8 sm:pt-16 pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14 px-4"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-4 text-gradient leading-tight">
            Password Generator
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto">
            Generate cryptographically secure passwords with a single click
          </p>
        </motion.div>

        <PasswordGenerator />
      </main>

      <footer className="relative z-10 py-6 text-center text-xs text-muted-foreground">
        <p>Built with security in mind · Uses Web Crypto API</p>
      </footer>
    </div>
  );
};

export default GeneratorPage;
