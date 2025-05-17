import { useState, useEffect, useRef } from 'react';

const clientId = "f0f83ba3-0198-4b95-a929-11cc6ef0e9ff";

export default function Bot() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(false);
  const [isBotpressReady, setIsBotpressReady] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoadedRef.current) return;
    
    // Check if script is already loaded
    if (window.botpressWebChat) {
      scriptLoadedRef.current = true;
      initializeBotpress();
      return;
    }

    // Load Botpress webchat script
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v2.4/inject.js";
    script.async = true;
    
    script.onload = () => {
      scriptLoadedRef.current = true;
      initializeBotpress();
    };
    
    document.body.appendChild(script);

    // Cleanup function to remove the script if component unmounts
    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const initializeBotpress = () => {
    if (!window.botpressWebChat) {
      console.error("Botpress webchat script loaded but window.botpressWebChat is not defined");
      return;
    }

    window.botpressWebChat.init({
      botId: clientId,
      clientId: clientId,
      hostUrl: "https://cdn.botpress.cloud/webchat/v2.4",
      messagingUrl: "https://messaging.botpress.cloud",
      enableConversationDeletion: true,
      stylesheet: "https://cdn.botpress.cloud/webchat/v2.4/themes/default.css",
      showPoweredBy: false,
      themeName: "default",
      containerWidth: "400px",
      layoutWidth: "100%",
    });

    // Add event listener for when webchat is fully loaded
    window.botpressWebChat.onEvent(
      'LIFECYCLE.LOADED', 
      () => {
        console.log('Botpress webchat loaded successfully');
        setIsBotpressReady(true);
      }
    );
  };

  // Toggle the webchat visibility
  const toggleWebchat = () => {
    if (!window.botpressWebChat) {
      console.error("Botpress webchat is not initialized yet");
      return;
    }

    setIsWebchatOpen(prevState => {
      const newState = !prevState;
      
      try {
        if (newState) {
          window.botpressWebChat.open();
        } else {
          window.botpressWebChat.close();
        }
      } catch (error) {
        console.error("Error toggling webchat:", error);
      }
      
      return newState;
    });
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button 
        onClick={toggleWebchat}
        className="bg-black text-white rounded-full p-4 shadow-lg hover:bg-gray-800 transition-all"
        aria-label="Toggle chat"
        disabled={!isBotpressReady}
      >
        {isWebchatOpen ? (
          <i className="ri-close-line text-xl"></i>
        ) : (
          <i className="ri-message-3-line text-xl"></i>
        )}
      </button>
      {!isBotpressReady && (
        <div className="absolute bottom-16 right-0 bg-white p-2 rounded shadow-md text-sm">
          Loading chat...
        </div>
      )}
    </div>
  );
}