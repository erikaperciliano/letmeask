import IllustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';


export function Home() {
    return (
        <div>
            <aside>
                <img src={IllustrationImg} alt="Illustration symbolizing questions and answers" />
                <strong>Create Q&amp; Live</strong>
                <p>Ask your audience's questions in real-time</p>
            </aside>
            <main>
                <div>
                    <img src={logoImg} alt="Letmeask" />
                </div>
                <button>
                    <img src={googleIconImg} alt="google´s logo" />
                    Create your room on google
                </button>
                <div>or enter a room</div>
                <form>
                    <input 
                        type="text"
                        placeholder='Enter a room code'
                    />
                    <button type="submit">
                        Enter a room
                    </button>
                </form>
            </main>
        </div>
    )
}