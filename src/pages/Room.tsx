import logoImage from '../assets/images/logo.svg';
import { Button } from '../components/Button';

import '../styles/room.scss';

export function Room() {
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImage} alt="Letmeask" />
                    <div>codigo</div>
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