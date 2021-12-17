import { Link } from 'react-router-dom';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';


import '../styles/auth.scss';

export function NewRoom() {
    return (
        <div id="page-auth">
            <aside>
                <img src={IllustrationImg} alt="Illustration symbolizing questions and answers" />
                <strong>Create Q&amp; Live</strong>
                <p>Ask your audience's questions in real-time</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Letmeask" />
                    <h2>Create a new room</h2>
                    <form>
                        <input 
                            type="text"
                            placeholder='Room name'
                        />
                        <Button type="submit">
                            Create room
                        </Button>
                    </form>
                    <p>Want to join an existing room? <Link to="/">click here</Link></p>
                </div>
            </main>
        </div>
    )
}