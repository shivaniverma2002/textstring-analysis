import React, { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState('');
  const [searchString, setSearchString] = useState('');
  const [replaceString, setReplaceString] = useState('');
  const [uniqueWordsCount, setUniqueWordsCount] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    // Function to count unique words case-insensitively
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words);
    setUniqueWordsCount(uniqueWords.size);

    // Function to count characters 
    const characters = text.replace(/[^a-zA-Z0-9]/g, '').length;
    setCharacterCount(characters);
  }, [text]);

  // Handle string replacement 
  const handleReplaceAll = () => {
    const newText = text.split(searchString).join(replaceString);
    setText(newText);
  };

  // Highlight search string in the text
  const getHighlightedText = () => {
    if (!searchString) return { __html: text }; // Return plain text if no search string

    const regex = new RegExp(`(${searchString})`, 'gi');
    const highlighted = text.replace(regex, '<mark>$1</mark>');
    
    return { __html: highlighted }; // Return in the correct format
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-2xl bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Real-Time Text Analysis</h1>
        
        {/* Overlay div for displaying the highlighted text */}
        <div className="relative">
          <div 
            className="absolute inset-0 p-4 overflow-auto whitespace-pre-wrap bg-transparent z-0"
            dangerouslySetInnerHTML={getHighlightedText()} 
            style={{ color: 'transparent', pointerEvents: 'none' }}
          />
          
          {/* Textarea for Input */}
          <textarea
            className="w-full h-48 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none relative z-10 bg-transparent"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ caretColor: 'black' }} 
          />
        </div>

        {/* Real-Time Statistics */}
        <div className="mt-4">
          <p className="text-lg">Unique Words: <span className="font-bold">{uniqueWordsCount}</span></p>
          <p className="text-lg">Character Count (Excluding Spaces and Punctuation): <span className="font-bold">{characterCount}</span></p>
        </div>

        {/* String Replacement Section */}
        <div className="mt-6 space-y-4">
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Enter the word to search for"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
            placeholder="Enter the word to replace it with"
            value={replaceString}
            onChange={(e) => setReplaceString(e.target.value)}
          />
          <button
            className="w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={handleReplaceAll}
          >
            Replace All
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
