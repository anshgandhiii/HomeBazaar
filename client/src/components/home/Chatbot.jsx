import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js";
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = "https://files.bpcontent.cloud/2024/10/05/11/20241005111018-A3LIQ0XZ.js";
    script2.async = true;

    script1.onload = () => {
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          hostUrl: "https://cdn.botpress.cloud/webchat/v2",
          botId: "05f2ea0c-2355-40d6-9e06-6e0dec81925b", // Your Bot ID
          messagingUrl: "https://cdn.botpress.cloud"
        });
      } else {
        console.error('Botpress WebChat is not loaded.');
      }
    };

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // No visible UI for this component
};

export default Chatbot;
