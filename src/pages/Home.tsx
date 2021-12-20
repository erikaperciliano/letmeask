import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';

import { auth, firebase } from '../services/firebase';

import '../styles/auth.scss';

export function Home() {
    // const history = useNavigate();

    function navigateToNewRoom () {
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).then(result => {
            console.log('result: ', result);
        })

        // history('/rooms/new');
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