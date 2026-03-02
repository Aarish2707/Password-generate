import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Copy, RefreshCw, Check, Zap, Lock, Key } from "lucide-react";
import { generatePassword, analyzePassword, getStrengthScore, type Strength } from "@/utils/passwordGenerator";
import { toast } from "sonner";

const STRENGTHS: { value: Strength; label: string; icon: typeof Zap; desc: string }[] = [
  { value: "LOW", label: "Low", icon: Zap, desc: "Letters only" },
  { value: "MEDIUM", label: "Medium", icon: Lock, desc: "Letters + Numbers" },
  { value: "HIGH", label: "High", icon: Shield, desc: "All characters" },
];

const PasswordGenerator = () => {
  const [strength, setStrength] = useState<Strength>("HIGH");
  const [length, setLength] = useState(16);
  const [password, setPassword] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [revealedChars, setRevealedChars] = useState(0);

  const analysis = useMemo(() => password ? analyzePassword(password) : null, [password]);
  const score = useMemo(() => getStrengthScore(strength, length), [strength, length]);

  const handleGenerate = useCallback(async () => {
    setIsGenerating(true);
    setRevealedChars(0);

    try {
      const pw = await generatePassword(strength, length);
      setPassword(pw);

      // Animate reveal
      for (let i = 0; i <= pw.length; i++) {
        setTimeout(() => setRevealedChars(i), i * 15);
      }
    } catch (error) {
      toast.error("Failed to generate password. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  }, [strength, length]);

  const handleCopy = useCallback(async () => {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    setCopied(true);
    toast.success("Password copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleGenerate]);

  const strengthColor = strength === "LOW" ? "accent" : strength === "MEDIUM" ? "yellow-400" : "primary";
  const displayedPassword = password.slice(0, revealedChars) + "•".repeat(Math.max(0, password.length - revealedChars));

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Main Generator Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-strong rounded-2xl p-6 sm:p-8 relative overflow-hidden"
      >
        {/* Decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-secondary/10 blur-3xl animate-pulse-glow" />

        {/* Strength Selector */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-muted-foreground mb-3">Password Strength</label>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {STRENGTHS.map((s) => {
              const Icon = s.icon;
              const isActive = strength === s.value;
              return (
                <motion.button
                  key={s.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStrength(s.value)}
                  className={`glass rounded-xl p-3 sm:p-4 text-center transition-all duration-300 cursor-pointer ${
                    isActive ? "glow-primary border-primary/30" : "hover:border-muted-foreground/20"
                  }`}
                  style={isActive ? { borderColor: `hsl(var(--${s.value === "LOW" ? "accent" : s.value === "MEDIUM" ? "secondary" : "primary"}))` } : {}}
                  aria-label={`Set strength to ${s.label}`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-5 h-5 mx-auto mb-1 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`block text-sm font-semibold ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5 hidden sm:block">{s.desc}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Length Slider */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-medium text-muted-foreground">Length</label>
            <motion.span
              key={length}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-mono text-lg font-bold text-primary"
            >
              {length}
            </motion.span>
          </div>
          <div className="relative">
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full slider-gradient rounded-full"
                animate={{ width: `${((length - 4) / 124) * 100}%` }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
            <input
              type="range"
              min={4}
              max={128}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
              aria-label="Password length"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>4</span>
            <span>128</span>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Estimated Strength</span>
            <span className={`text-sm font-semibold ${
              score < 40 ? "strength-low" : score < 70 ? "strength-medium" : "strength-high"
            }`}>
              {score < 40 ? "Weak" : score < 70 ? "Fair" : score < 90 ? "Strong" : "Very Strong"}
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${score}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              style={{
                background: score < 40
                  ? "hsl(var(--accent))"
                  : score < 70
                  ? "hsl(45, 90%, 55%)"
                  : "hsl(var(--primary))",
              }}
            />
          </div>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full btn-generate font-semibold text-lg py-4 rounded-xl relative overflow-hidden disabled:opacity-70"
          aria-label="Generate password"
        >
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating...
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2"
              >
                <Key className="w-5 h-5" />
                Generate Password
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Password Display */}
      <AnimatePresence>
        {password && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6"
          >
            <div className="glass-strong rounded-2xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-muted-foreground">Your Password</span>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleGenerate}
                    className="glass rounded-lg p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Regenerate password"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCopy}
                    className="glass rounded-lg p-2 text-muted-foreground hover:text-primary transition-colors"
                    aria-label="Copy password"
                  >
                    {copied ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                  </motion.button>
                </div>
              </div>

              <div
                className="font-mono text-lg sm:text-xl break-all text-foreground leading-relaxed cursor-pointer select-all p-4 rounded-xl bg-muted/30"
                onClick={handleCopy}
                role="textbox"
                aria-label="Generated password"
                tabIndex={0}
              >
                {displayedPassword}
              </div>

              {/* Character breakdown */}
              {analysis && (
                <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary inline-block" />
                    {analysis.letters} letters
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary inline-block" />
                    {analysis.numbers} numbers
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                    {analysis.symbols} symbols
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-xs text-muted-foreground mt-6"
      >
        Press <kbd className="glass-subtle px-1.5 py-0.5 rounded text-foreground font-mono">Enter</kbd> to generate
      </motion.p>
    </div>
  );
};

export default PasswordGenerator;
