import { createContext, PropsWithChildren, useState } from "react";
import { Card } from "../Model/ICard";

interface CardContextValue{
    card: Card | null;
    setCard: (cart : Card) => void;
    deleteItem: (productId: number, quantity: number) => void;
}

export const CardContext = createContext<CardContextValue | undefined>(undefined);

export function CardContextProvider({children}: PropsWithChildren<any>) {
    const [card, setCard] = useState<Card | null>(null);
    
    function deleteItem(productId: number, quantity: number){

    }

    
}
