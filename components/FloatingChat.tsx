'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! Need help choosing the cheapest or fastest carrier for your parcel? 📦' },
  ])
  const [input, setInput] = useState('')

  async function send() {
    if (!input.trim()) return
    const userMsg = input
    setMsgs(m => [...m, { role: 'user', text: userMsg }])
    setInput('')
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: userMsg }] }),
      })
      const data = await res.json()
      setMsgs(m => [...m, { role: 'bot', text: data.text || 'Let me help you ship smarter!' }])
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: 'Use the comparison form above for instant quotes!' }])
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        style={{ position: 'fixed', bottom: 24, right: 24, width: 52, height: 52, borderRadius: '50%',
          background: 'linear-gradient(135deg,#059669,#047857)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(5,150,105,0.45)', zIndex: 1000, fontSize: 20 }}
        aria-label={open ? 'Close chat' : 'Open shipping assistant'}
      >
        {open ? '✕' : '📦'}
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'fixed', bottom: 88, right: 24, width: 320, height: 420,
              background: '#ffffff', border: '1px solid rgba(5,150,105,0.18)',
              borderRadius: 16, display: 'flex', flexDirection: 'column', zIndex: 1000,
              overflow: 'hidden', boxShadow: '0 8px 40px rgba(5,150,105,0.12)' }}
            role="dialog" aria-label="Shipping assistant"
          >
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(5,150,105,0.12)', fontSize: 13, fontWeight: 700, color: '#064e3b', background: 'rgba(5,150,105,0.04)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 16 }}>📦</span> ParcelIQ Assistant
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, background: '#fafffe' }}>
              {msgs.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? 'rgba(5,150,105,0.12)' : '#ffffff',
                  border: `1px solid ${m.role === 'user' ? 'rgba(5,150,105,0.22)' : 'rgba(5,150,105,0.10)'}`,
                  padding: '8px 12px', borderRadius: 10, fontSize: 12, color: '#064e3b', maxWidth: '85%',
                }}>{m.text}</div>
              ))}
            </div>
            <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(5,150,105,0.12)', display: 'flex', gap: 8, background: '#ffffff' }}>
              <input value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask about carriers, tracking, customs…"
                aria-label="Chat input"
                style={{ flex: 1, background: '#f8fffe', border: '1px solid rgba(5,150,105,0.18)',
                  borderRadius: 8, padding: '6px 10px', fontSize: 12, color: '#064e3b', outline: 'none' }} />
              <button onClick={send} aria-label="Send message"
                style={{ background: '#059669', border: 'none', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: '#fff', cursor: 'pointer', transition: 'background 0.15s, transform 0.1s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#047857')}
                onMouseLeave={e => (e.currentTarget.style.background = '#059669')}
              >→</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
