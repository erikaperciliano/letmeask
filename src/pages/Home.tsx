import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../components/Button';

import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';



import '../styles/auth.scss';
import { AuthContext } from '../App';

export function Home() {
    const history = useNavigate();
    const { user, signInWithGoogle } = useContext(AuthContext);

    async function navigateToNewRoom () {
        if(!user) {
            await signInWithGoogle();
        }

        history('/rooms/new');
    }

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
                    <button onClick={navigateToNewRoom} className='create-room'>
                        <img src={googleIconImg} alt="google´s logo" />
                        Create your room on google
                    </button>
                    <div className='separator'>or enter a room</div>
                    <form>
                        <input 
                            type="text"
                            placeholder='Enter a room code'
                        />
                        <Button type="submit">
                            Enter a room
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}