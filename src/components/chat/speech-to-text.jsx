'use client'

import { useState, useEffect, useRef } from 'react'
import { Mic, MicOff } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SpeechToText({ onTranscript }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex
        const transcriptResult = event.results[current][0].transcript
        setTranscript(transcriptResult)
        if (event.results[current].isFinal) {
          onTranscript(transcriptResult)
          setTranscript('')
        }
        // Reset the timeout on new speech input
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        timeoutRef.current = setTimeout(stopListening, 4000)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event)
        if (event.error === 'network') {
          setError('Network error. Please check your connection and try again.');
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
        stopListening()
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [onTranscript])

  const toggleListening = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const startListening = () => {
    if (recognitionRef.current) {
      setError(null);
      try {
        recognitionRef.current.start()
        setIsListening(true)
        timeoutRef.current = setTimeout(stopListening, 4000)
      } catch (err) {
        console.error('Failed to start speech recognition:', err);
        setError('Failed to start speech recognition. Please try again.');
        setIsListening(false);
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleListening}
        className={`relative ${isListening ? 'text-primary' : ''}`}
      >
        {isListening ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        {isListening && (
          <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-75"></span>
        )}
      </Button>
      {transcript && (
        <div className="absolute left-0 top-full mt-2 rounded-md bg-secondary p-2 text-sm text-secondary-foreground">
          {transcript}
        </div>
      )}
      {error && (
        <div className="absolute left-0 top-full mt-2 rounded-md bg-red-100 p-2 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  )
}

