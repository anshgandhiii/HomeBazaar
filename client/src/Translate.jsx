import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mic, MicOff } from 'lucide-react';

const Translate = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ta', name: 'Tamil' },
    { code: 'ur', name: 'Urdu' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'zh', name: 'Chinese (Simplified)' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
  ];

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = sourceLang;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInputText(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    } else {
      console.log('Speech recognition not supported');
    }
  }, [sourceLang]);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const handleTranslate = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setOutputText('');

    try {
      const response = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(inputText)}&langpair=${sourceLang}|${targetLang}`
      );
      
      if (response.data.responseStatus === 200) {
        setOutputText(response.data.responseData.translatedText);
      } else {
        throw new Error(response.data.responseDetails || 'Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setErrorMessage('Translation failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-base-content font-bold mb-6">Translation Page</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium border-base-content text-base-content-700 mb-2">
        <h6 className="text-sm text-base-content font-bold mb-6">Source language</h6>

        </label>
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base-content border-base-content-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-base-content-700 mb-2">
          <h6 className="text-sm text-base-content font-bold mb-6">Target language</h6>
        </label>
        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base-content border-base-content focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-base-content-700 mb-2">
          Enter text to translate
        </label>
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mt-1 block w-full sm:text-sm border border-base-content-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500 pr-10"
            rows="4"
          ></textarea>
          <button
            onClick={toggleListening}
            className="absolute right-2 bottom-2 p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          >
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
        </div>
      </div>
      <button
        onClick={handleTranslate}
        disabled={isLoading}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </button>
      {errorMessage && (
        <div className="mt-4 text-red-600">
          {errorMessage}
        </div>
      )}
      {outputText && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Translation Result:</h2>
          <p className="border border-base-content-300 rounded-md p-2">{outputText}</p>
        </div>
      )}
    </div>
  );
};

export default Translate;