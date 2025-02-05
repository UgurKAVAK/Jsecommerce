import { createContext, PropsWithChildren, useContext, useState } from "react";
import { Card } from "../Model/ICard";

interface CardContextValue{
    card: Card | null;
    setCard: (cart : Card) => void;
}

export const CardContext = createContext<CardContextValue | undefined>(undefined);

export function useCardContext() {
    const context = useContext(CardContext);
    if(context === undefined){
        throw new Error("No Provider");
    }
    return context;
}

export function CardContextProvider({children}: PropsWithChildren<any>) {
    const [card, setCard] = useState<Card | null>(null);
    return (
        <CardContext.Provider value={{card, setCard}}>
            {children}
        </CardContext.Provider>
    );
    
}
