import { motion } from "framer-motion";
import { Shield, ArrowRight, Lock, Zap, Eye, Fingerprint, Sparkles, KeyRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "@/components/AnimatedBackground";

const features = [
{
  icon: Lock,
  title: "Military-Grade Security",
  desc: "Powered by the Web Crypto API for true randomness."
},
{
  icon: Zap,
  title: "Instant Generation",
  desc: "Create strong passwords in milliseconds."
},
{
  icon: Eye,
  title: "Strength Analysis",
  desc: "Visual breakdown of your password composition."
},
{
  icon: Fingerprint,
  title: "Fully Customizable",
  desc: "Control length, complexity, and character types."
}];


const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <AnimatedBackground />

      {/* Nav */}
      <header className="relative z-10 py-5 px-4">
        <nav className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-primary" />
            <span className="font-display font-bold text-xl text-foreground tracking-tight">SecureGen</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/generate")}
            className="glass rounded-xl px-5 py-2.5 text-sm font-semibold text-primary hover:text-foreground transition-colors">

            Open App
          </motion.button>
        </nav>
      </header>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-12">

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 glass-subtle rounded-full px-4 py-1.5 mb-8">

            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Cryptographically Secure</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-[1.05] mb-6">
            <span className="text-foreground">Generate</span>
            <br />
            <span className="text-gradient">Unbreakable</span>
            <br />
            <span className="text-foreground">Passwords</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-muted-foreground text-lg sm:text-xl max-w-lg mx-auto mb-10 leading-relaxed">

            Protect your digital life with passwords that even supercomputers can't crack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/generate")}
              className="btn-generate font-semibold text-lg px-8 py-4 rounded-2xl flex items-center gap-3 w-full sm:w-auto justify-center">

              <KeyRound className="w-5 h-5" />
              Start Generating
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Floating password preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="glass-strong rounded-2xl p-5 max-w-md w-full mb-16 animate-float">

          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">Preview</span>
            <span className="text-xs text-primary font-semibold">HIGH · 24 chars</span>
          </div>
          <p className="font-mono text-foreground text-lg tracking-wide break-all">
            k#9Xm!pQ2w&Lz@7NvR$4jHs
          </p>
          <div className="flex gap-3 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />12 letters</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block" />6 numbers</span>
            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />6 symbols</span>
          </div>
        </motion.div>

        {/* Feature cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl w-full px-4 mb-20">

          {features.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={item}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl p-6 group cursor-default shadow-md">

                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-primary transition-shadow">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>);

          })}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-xs text-muted-foreground border-t border-border/20">
        <p>SecureGen · Built with security in mind · Uses Web Crypto API</p>
      </footer>
    </div>);

};

export default Index;