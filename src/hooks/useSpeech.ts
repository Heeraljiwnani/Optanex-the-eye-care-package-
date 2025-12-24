import { useCallback, useEffect, useState } from 'react';

export const useSpeech = () => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            setVoices(availableVoices);
        };

        // Initial load
        updateVoices();

        // Event listener for when voices are loaded (crucial for Chrome/some browsers)
        window.speechSynthesis.onvoiceschanged = updateVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const speak = useCallback((text: string, lang: 'en' | 'hi' = 'en') => {
        // Cancel any current speaking
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);

        // Map nice language codes
        const targetLang = lang === 'hi' ? 'hi-IN' : 'en-US';
        utterance.lang = targetLang;

        // Advanced Voice Selection Algorithm
        if (voices.length > 0) {
            let preferredVoice = null;

            if (lang === 'hi') {
                // Priority for Hindi
                preferredVoice =
                    voices.find(v => v.name.includes('Google') && v.lang.includes('hi')) ||
                    voices.find(v => v.lang.includes('hi')) ||
                    voices.find(v => v.name.includes('Lekha')); // Common Mac Hindi voice
            } else {
                // Priority for English (US)
                // 1. Google US English (Chrome)
                // 2. Samantha (Mac default, usually good)
                // 3. Microsoft Zira (Windows)
                // 4. Any English US voice
                preferredVoice =
                    voices.find(v => v.name === 'Google US English') ||
                    voices.find(v => v.name === 'Samantha') ||
                    voices.find(v => v.name.includes('English United States')) ||
                    voices.find(v => v.name.includes('Zira')) ||
                    voices.find(v => v.lang === 'en-US');
            }

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            // Slightly slower rate for better clarity and to fix "too fast" issues in Firefox
            utterance.rate = 0.9;
        }

        window.speechSynthesis.speak(utterance);
    }, [voices]);

    const stop = useCallback(() => {
        window.speechSynthesis.cancel();
    }, []);

    return { speak, stop };
};
