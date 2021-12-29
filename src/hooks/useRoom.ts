import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHightlighted: boolean;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>


export function useRoom(roomId: string) {
    const [questions, setQuestions] = useState<QuestionType[]>([]);
    const [title, setTitles] = useState('');

    useEffect(() => {

        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            // console.log(room.val());

            const databaseRoom = room.val();
            const FirebaseQuestions = databaseRoom.questions as  FirebaseQuestions ?? {};

            const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
                return  {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHightlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })

            setTitles(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    return { questions, title }
}