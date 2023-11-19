import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

var thing = '/nero_forte.webm';


const transcode = async () => {
    const ffmpeg = ffmpegRef.current;
    await ffmpeg.writeFile(thing, await fetchFile(thing));
    await ffmpeg.exec(['-i', 'input.webm', 'output.mp3']);
    const data = await ffmpeg.read// import { FFmpeg } from '@ffmpeg/ffmpeg';
// import { fetchFile, toBlobURL } from '@ffmpeg/util';
        URL.createObjectURL(new Blob([data.buffer], {type: 'audio/mp3'}));
}

// function balls() {
//     const [loaded, setLoaded] = useState(false);
//     const ffmpegRef = useRef(new FFmpeg());
//     const videoRef = useRef(null);
//     const messageRef = useRef(null);

//     const load = async () => {
//         const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.2/dist/umd'
//         const ffmpeg = ffmpegRef.current;
//         ffmpeg.on('log', ({ message }) => {
//             messageRef.current.innerHTML = message;
//             console.log(message);
//         });
//         // toBlobURL is used to bypass CORS issue, urls with the same
//         // domain can be used directly.
//         await ffmpeg.load({
//             coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
//             wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
//             workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
//         });
//         setLoaded(true);
//     }

//     const transcode = async () => {
//         const ffmpeg = ffmpegRef.current;
//         await ffmpeg.writeFile('input.webm', await fetchFile('https://raw.githubusercontent.com/ffmpegwasm/testdata/master/Big_Buck_Bunny_180_10s.webm'));
//         await ffmpeg.exec(['-i', 'input.webm', 'output.mp4']);
//         const data = await ffmpeg.readFile('output.mp4');
//         videoRef.current.src =
//             URL.createObjectURL(new Blob([data.buffer], {type: 'video/mp4'}));
//     }
                <button onClick={transcode}>Transcode webm to mp4</button>