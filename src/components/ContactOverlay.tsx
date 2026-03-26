import { motion } from 'framer-motion';
import { useState } from 'react';

const ContactOverlay = () => {
  const [focused, setFocused] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const canSend = !sent && name.trim() && email.trim() && message.trim();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;

    // Client-side only: open mail client with prefilled message.
    const to = 'akanksha.k@adypu.edu.in';
    const subject = `Portfolio message from ${name.trim()}`;
    const body = `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}\n`;
    const href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setSent(true);
    window.location.href = href;
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
      <motion.div
        className="glass-panel p-8 md:p-10 max-w-md w-full mx-4 pointer-events-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="scene-title text-2xl md:text-3xl text-gradient-cyber mb-2 text-center">
          TRANSMIT SIGNAL
        </h2>
        <p className="font-body text-muted-foreground text-sm text-center mb-8">
          Let's build something extraordinary together
        </p>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {[
            { name: 'name', placeholder: 'YOUR NAME', type: 'text' },
            { name: 'email', placeholder: 'YOUR EMAIL', type: 'email' },
          ].map((field) => (
            <div key={field.name} className="relative">
              <input
                type={field.type}
                placeholder={field.placeholder}
                className={`w-full bg-transparent border-b font-ui text-sm tracking-wider text-foreground py-2 px-1 outline-none transition-all duration-500 placeholder:text-muted-foreground/40 ${
                  focused === field.name
                    ? 'border-neon-purple shadow-[0_2px_10px_hsl(270_80%_55%/0.3)]'
                    : 'border-border'
                }`}
                value={field.name === 'name' ? name : email}
                onChange={(e) => {
                  const v = e.target.value;
                  if (field.name === 'name') setName(v);
                  else setEmail(v);
                }}
                onFocus={() => setFocused(field.name)}
                onBlur={() => setFocused(null)}
              />
            </div>
          ))}

          <textarea
            placeholder="YOUR MESSAGE"
            rows={3}
            className={`w-full bg-transparent border-b font-ui text-sm tracking-wider text-foreground py-2 px-1 outline-none resize-none transition-all duration-500 placeholder:text-muted-foreground/40 ${
              focused === 'message'
                ? 'border-neon-purple shadow-[0_2px_10px_hsl(270_80%_55%/0.3)]'
                : 'border-border'
            }`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused(null)}
          />

          <motion.button
            type="submit"
            disabled={!canSend}
            className={`mt-2 glass-panel px-6 py-3 font-display text-xs tracking-[0.2em] uppercase neon-border-purple text-foreground transition-all duration-500 ${
              canSend
                ? 'hover:shadow-[0_0_30px_hsl(270_80%_55%/0.5)]'
                : 'opacity-50 cursor-not-allowed'
            }`}
            whileHover={canSend ? { scale: 1.03 } : undefined}
            whileTap={canSend ? { scale: 0.97 } : undefined}
          >
            {sent ? 'SENT' : 'SEND SIGNAL'}
          </motion.button>
        </form>

        <div className="mt-8 flex justify-center gap-6">
          <motion.a
            href="https://github.com/Maxiemad"
            target="_blank"
            rel="noreferrer"
            className="ui-label text-xs text-muted-foreground hover:text-neon-purple transition-colors duration-300"
            whileHover={{ y: -2 }}
          >
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/akanksha-sharma-741283317/?skipRedirect=true"
            target="_blank"
            rel="noreferrer"
            className="ui-label text-xs text-muted-foreground hover:text-neon-purple transition-colors duration-300"
            whileHover={{ y: -2 }}
          >
            LinkedIn
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactOverlay;
