import { Audio } from 'react-loader-spinner';

function Loading() {
    return (
        <Audio
            height="30"
            width="30"
            color="#fff"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible={true}
        />
    );
}

export default Loading;
