import React from 'react';
import Freq from './Freq';
import Categories from './Categories';
import Chatbot from './Chatbot';

export default function Home() {
  return (
    <div>
      {/* Frequently Bought Items Section */}
      <Freq />
      
      {/* Categories Section */}
      <div className="flex justify-center my-8">
        <Categories />
      </div>
    </div>
  );
  <Chatbot></Chatbot>
}
