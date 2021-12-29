import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';

import toast from 'react-hot-toast';
import logoImage from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';

import '../styles/room.scss';
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';


type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id;

    const { title, questions} = useRoom(roomId!);



    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        console.log('user: ', user)
        if(newQuestion.trim() === '') {
            return;
        }

        if(!user) {
            toast.error('You must be logged in!');
        }

        const question = {
            content: newQuestion,
            author: {
                name: user?.name,
                avatar: user?.avatar
            },
            isHighlighted: false,
            isAnswered: false
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        toast.success('Your message was sent with sucess!')

        setNewQuestion('');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImage} alt="Letmeask" />
                    <RoomCode code={roomId!}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder='What do you want to ask?'
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}
                    />

                    <div className="form-footer">
                        { user ? 
                        (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : 
                        (
                            <span>To submit a question, <button>please login</button>.</span>
                        )}
                        <Button type='submit' disabled={!user}>Send question</Button>
                    </div>
                </form>
                {questions.map(question => {
                    return (
                        <Question 
                            key={question.id}
                            content={question.content}
                            author={question.author}
                        />
                    );
                })}
            </main>
        </div>
    );
}