import { useParams } from 'react-router-dom';

import logoImage from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';

import '../styles/room.scss';

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>();

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImage} alt="Letmeask" />
                    <RoomCode code={params.id!}/>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala React</h1>
                    <span>4 perguntas</span>
                </div>

                <form>
                    <textarea
                        placeholder='What do you want to ask?'
                    />

                    <div className="form-footer">
                        <span>To submit a question, <button>please login</button>.</span>
                        <Button type='submit'>Send question</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}