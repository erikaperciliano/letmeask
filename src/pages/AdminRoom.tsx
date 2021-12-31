import { useNavigate, useParams } from 'react-router-dom';

import logoImage from '../assets/images/logo.svg';
import deleteImage from '../assets/images/delete.svg';
import checkImage from '../assets/images/check.svg';
import answerImage from '../assets/images/answer.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const history = useNavigate();

    const params = useParams<RoomParams>();
    const roomId = params.id;

    const { title, questions} = useRoom(roomId!);

    async function handleEndRoom() {

        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date()
        });

        history('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if(window.confirm('Are you sure you want to delete this question?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handlCheckQuestionAnswered(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighlighted: true
        });
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImage} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId!}/>
                        <Button isOutlined onClick={handleEndRoom}>Close room</Button>
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
                            isAnswered={question.isAnswered}
                            isHighlighted={question.isHightlighted}
                        >
                            { !question.isAnswered &&
                                (
                                    <>
                                        <button
                                            type='button'
                                            onClick={() => handlCheckQuestionAnswered(question.id)}
                                        >
                                            <img src={checkImage} alt="Mark question as answered" />
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleHighlightQuestion(question.id)}
                                        >
                                            <img src={answerImage} alt="Highlight the question" />
                                        </button>
                                    </>
                                )}
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