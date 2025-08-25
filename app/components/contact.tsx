'use client'

import type React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

// Enhanced form schema with security validations
const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(50, {
      message: 'Name cannot exceed 50 characters.',
    })
    .refine((val) => !/[<>]/.test(val), {
      message: 'Name contains invalid characters.',
    }),
  email: z
    .string()
    .email({
      message: 'Please enter a valid email address.',
    })
    .max(100, {
      message: 'Email cannot exceed 100 characters.',
    })
    .refine((val) => !/[<>]/.test(val), {
      message: 'Email contains invalid characters.',
    }),
  message: z
    .string()
    .min(10, {
      message: 'Message must be at least 10 characters.',
    })
    .max(1000, {
      message: 'Message cannot exceed 1000 characters.',
    })
    .refine((val) => !/(<script|javascript:|onerror=|onload=)/i.test(val), {
      message: 'Message contains invalid content.',
    }),
  // Add a honeypot field to catch bots
  _honeypot: z.string().max(0).optional(),
})

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [showDebug, setShowDebug] = useState(false)
  const [debugLogs, setDebugLogs] = useState<string[]>([])
  const [backgroundElements, setBackgroundElements] = useState<
    React.ReactNode[]
  >([])

  // Generate background elements only on client-side
  useEffect(() => {
    const leftElements = Array.from({ length: 20 }).map((_, i) => (
      <div
        key={`left-${i}`}
        className="text-xs text-white opacity-30"
        style={{
          position: 'absolute',
          top: `${i * 5}%`,
          left: `${Math.random() * 100}%`,
        }}
      >
        {`{code: ${Math.random().toString(36).substring(2, 8)}}`}
      </div>
    ))

    const rightElements = Array.from({ length: 20 }).map((_, i) => (
      <div
        key={`right-${i + 20}`}
        className="text-xs text-white opacity-30"
        style={{
          position: 'absolute',
          top: `${i * 5}%`,
          right: `${Math.random() * 100}%`,
        }}
      >
        {`function() { return ${Math.random().toString(36).substring(2, 8)} }`}
      </div>
    ))

    setBackgroundElements([...leftElements, ...rightElements])
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
      _honeypot: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Check honeypot field - if it's filled, it's likely a bot
    if (values._honeypot) {
      console.log('Bot detected')
      // Pretend submission was successful but don't actually submit
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 2000)
      return
    }

    // Sanitize inputs (additional layer of protection)
    const sanitizedValues = {
      name: values.name.replace(/[<>]/g, ''),
      email: values.email.replace(/[<>]/g, ''),
      message: values.message.replace(
        /<script|javascript:|onerror=|onload=/gi,
        ''
      ),
    }

    // Add debug logs
    const newLogs = [
      `[${new Date().toISOString()}] POST /api/contact`,
      `[${new Date().toISOString()}] Request payload: ${JSON.stringify(
        sanitizedValues
      )}`,
      `[${new Date().toISOString()}] Validating input...`,
      `[${new Date().toISOString()}] Input validation successful`,
      `[${new Date().toISOString()}] Sending email to recipient: lfurlanettosousa@gmail.com`,
      `[${new Date().toISOString()}] Email queued for delivery`,
      `[${new Date().toISOString()}] Response: 200 OK`,
    ]
    setDebugLogs(newLogs)

    // Prepare email content
    const subject = `Portfolio Contact: ${sanitizedValues.name}`
    const body = `Name: ${sanitizedValues.name}%0D%0AEmail: ${sanitizedValues.email}%0D%0A%0D%0AMessage:%0D%0A${sanitizedValues.message}`

    // Open mail client with pre-filled fields in a new tab - safely check for window
    if (typeof window !== 'undefined') {
      const mailtoLink = `mailto:lfurlanettosousa@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${body}`
      window.open(mailtoLink, '_blank')
    }

    console.log(sanitizedValues)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowDebug(true)
      setTimeout(() => setShowDebug(false), 5000)
    }, 1000)
  }

  return (
    <section
      id="contact-section"
      className="relative overflow-hidden bg-black py-20 font-mono"
    >
      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-8 inline-block rounded bg-zinc-900 px-4 py-1 text-[#569cd6]">
            <span className="text-[#c586c0]">import</span>{' '}
            <span className="text-[#9cdcfe]">Contact</span>{' '}
            <span className="text-[#c586c0]">from</span>{' '}
            <span className="text-[#ce9178]">
              &apos;./components/Contact&apos;
            </span>
            ;
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tighter text-[#dcdcaa] sm:text-4xl">
            <span className="text-[#4ec9b0]">function</span>{' '}
            <span className="text-[#dcdcaa]">GetInTouch</span>()
            <span className="text-white"> {`{`}</span>
          </h2>
          <p className="mb-8 text-[#6a9955]">
            {`// Interessado em colaborar em um projeto?`}
            <br />
            {`// Vamos criar algo incrível juntos.`}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <div className="rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg">
            {/* Code editor header */}
            <div className="flex items-center justify-between border-b border-zinc-700 bg-black px-4 py-2">
              <div className="text-sm text-[#cccccc]">ContactForm.tsx</div>
              <div className="flex space-x-2">
                <div className="text-xs text-[#cccccc]">JavaScript</div>
                <div className="text-xs text-[#cccccc]">UTF-8</div>
                <button
                  onClick={() => setShowDebug((prev) => !prev)}
                  className="text-xs text-[#cccccc] hover:text-white ml-4"
                  title="Toggle debug mode"
                >
                  {showDebug ? 'Hide Debug' : 'Debug'}
                </button>
              </div>
            </div>

            {/* Line numbers and form */}
            <div className="flex">
              {/* Line numbers */}
              <div className="hidden w-12 bg-black py-4 text-right text-sm text-[#858585] sm:block">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="pr-3">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Form */}
              <div className="w-full p-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="text-[#9cdcfe]">
                      <span className="text-[#c586c0]">const</span> formData ={' '}
                      {`{`}
                    </div>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex">
                            <span className="w-20 text-[#9cdcfe]">name:</span>
                            <FormControl>
                              <Input
                                placeholder="'Your name'"
                                {...field}
                                className="border-zinc-700 bg-black text-[#ce9178]"
                                maxLength={50}
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="ml-20 text-[#f14c4c]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex">
                            <span className="w-20 text-[#9cdcfe]">email:</span>
                            <FormControl>
                              <Input
                                placeholder="'your@email.com'"
                                {...field}
                                className="border-zinc-700 bg-black text-[#ce9178]"
                                maxLength={100}
                                type="email"
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="ml-20 text-[#f14c4c]" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex">
                            <span className="w-20 text-[#9cdcfe]">
                              message:
                            </span>
                            <FormControl>
                              <Textarea
                                placeholder="'Tell me about your project...'"
                                className="min-h-[120px] border-zinc-700 bg-black text-[#ce9178]"
                                {...field}
                                maxLength={1000}
                              />
                            </FormControl>
                          </div>
                          <FormMessage className="ml-20 text-[#f14c4c]" />
                        </FormItem>
                      )}
                    />

                    {/* Honeypot field - hidden from users but bots will fill it */}
                    <div className="hidden" aria-hidden="true">
                      <FormField
                        control={form.control}
                        name="_honeypot"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                {...field}
                                tabIndex={-1}
                                autoComplete="off"
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="text-[#9cdcfe]">{`}`};</div>

                    <div className="pt-2 text-[#6a9955]">
                      {`// Submit the form data`}
                      <br />
                      {`// POST /api/contact`}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-[#007acc] text-white hover:bg-[#0062a3]"
                    >
                      {submitted ? (
                        <span className="text-[#4ec9b0]">
                          sendMessage(formData) // Success!
                        </span>
                      ) : (
                        <span className="text-[#dcdcaa]">
                          sendMessage(formData)
                        </span>
                      )}
                    </Button>
                  </form>
                </Form>

                {/* Debug console */}
                {showDebug && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-6 border-t border-zinc-700 pt-4"
                  >
                    <div className="text-[#569cd6] mb-2">
                      <span className="text-[#c586c0]">console</span>.
                      <span className="text-[#dcdcaa]">log</span>(
                      <span className="text-[#ce9178]">"Debug output:"</span>);
                    </div>
                    <div className="bg-black p-3 rounded text-xs font-mono h-32 overflow-y-auto">
                      {debugLogs.length > 0 ? (
                        debugLogs.map((log, i) => (
                          <div key={i} className="text-green-500">
                            {log}
                          </div>
                        ))
                      ) : (
                        <div className="text-gray-500">
                          // No logs available yet. Submit the form to see debug
                          output.
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-[#dcdcaa]">
          <span className="text-white">{`}`}</span>
        </div>
      </div>

      {/* Background pattern - Now client-side only */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="h-full w-full overflow-hidden">
          {backgroundElements}
        </div>
      </div>
    </section>
  )
}
