import { createContext, useContext, useState, type ReactNode } from "react";

interface AppContextType {
  chatOpen: boolean;
  setChatOpen: (open: boolean) => void;
  toggleChat: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [chatOpen, setChatOpen] = useState(false);

  const toggleChat = () => {
    setChatOpen((prev) => !prev);
  };

  return (
    <AppContext.Provider value={{ chatOpen, setChatOpen, toggleChat }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
