import { useState } from 'react';
import { useParams } from 'react-router-dom';

import logoImage from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';

import '../styles/room.scss';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions} = useRoom(roomId!);

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Are you sure you want to delete this question?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImage} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId!}/>
                        <Button isOutlined>Close room</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                {questions.map(question => {
                    return (
                        <Question 
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        >
                            <button
                                type='button'
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deleteImage} alt="Delete ask" />
                            </button>
                        </Question>
                    );
                })}
            </main>
        </div>
    );
}